from flask import Blueprint, request, jsonify
from flask_socketio import emit, join_room, leave_room
import random
import json
from datetime import datetime
from openpyxl import Workbook
from io import BytesIO
from flask import send_file

game_bp = Blueprint('game', __name__)

# Game state storage (in production, use Redis or database)
game_rooms = {}
game_questions = [
    {
        "id": 1,
        "question": "Sebuah toko menjual pensil dan penghapus. Harga 2 pensil dan 3 penghapus adalah Rp 7.000. Harga 1 pensil dan 2 penghapus adalah Rp 4.000. Tentukan harga 1 pensil dan 1 penghapus!",
        "answer": {"x": 2000, "y": 1000},
        "context": "Harga 1 pensil = Rp 2.000, Harga 1 penghapus = Rp 1.000"
    },
    {
        "id": 2,
        "question": "Keliling sebuah persegi panjang adalah 28 cm. Jika panjangnya 2 cm lebih dari lebarnya, tentukan panjang dan lebar persegi panjang tersebut!",
        "answer": {"x": 8, "y": 6},
        "context": "Panjang = 8 cm, Lebar = 6 cm"
    },
    # Add more questions here...
]

@game_bp.route('/questions', methods=['GET'])
def get_questions():
    return jsonify({'questions': game_questions})

@game_bp.route('/export-results/<room_id>', methods=['GET'])
def export_results(room_id):
    if room_id not in game_rooms:
        return jsonify({'error': 'Room not found'}), 404
    
    room = game_rooms[room_id]
    
    # Create Excel workbook
    wb = Workbook()
    ws = wb.active
    ws.title = "Game Results"
    
    # Headers
    headers = ['Nama', 'Kelas', 'Posisi', 'Jawaban Benar', 'Total Jawaban', 'Persentase']
    ws.append(headers)
    
    # Data
    for player in room['players']:
        correct_answers = player.get('correct_answers', 0)
        total_answers = player.get('total_answers', 0)
        percentage = (correct_answers / total_answers * 100) if total_answers > 0 else 0
        
        row = [
            player['name'],
            player.get('class', ''),
            player.get('position', 0),
            correct_answers,
            total_answers,
            f"{percentage:.1f}%"
        ]
        ws.append(row)
    
    # Save to BytesIO
    output = BytesIO()
    wb.save(output)
    output.seek(0)
    
    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name=f'game_results_{room_id}.xlsx'
    )

# Socket.IO events will be added in the next phase

