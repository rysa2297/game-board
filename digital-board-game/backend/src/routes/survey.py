from flask import Blueprint, request, jsonify
from flask_socketio import emit
from src.models.user import db, Survey, User
from openpyxl import Workbook
from io import BytesIO
from flask import send_file

survey_bp = Blueprint('survey', __name__)

@survey_bp.route('/survey', methods=['POST'])
def submit_survey():
    data = request.get_json()
    user_id = data.get('user_id')
    rating = data.get('rating')
    feedback = data.get('feedback', '')
    
    if not user_id or not rating or rating < 1 or rating > 5:
        return jsonify({'success': False, 'message': 'Data tidak valid'}), 400
    
    # Check if user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': 'User tidak ditemukan'}), 404
    
    # Create survey entry
    survey = Survey(
        user_id=user_id,
        rating=rating,
        feedback=feedback
    )
    
    db.session.add(survey)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Kuesioner berhasil dikirim'})

@survey_bp.route('/surveys', methods=['GET'])
def get_surveys():
    surveys = Survey.query.join(User).all()
    
    survey_data = []
    for survey in surveys:
        survey_data.append({
            'id': survey.id,
            'rating': survey.rating,
            'feedback': survey.feedback,
            'created_at': survey.created_at.isoformat(),
            'user': {
                'id': survey.user.id,
                'name': survey.user.name,
                'class': survey.user.class_name
            }
        })
    
    return jsonify({'surveys': survey_data})

@survey_bp.route('/export-surveys', methods=['GET'])
def export_surveys():
    surveys = Survey.query.join(User).all()
    
    # Create Excel workbook
    wb = Workbook()
    ws = wb.active
    ws.title = "Survey Results"
    
    # Headers
    headers = ['ID', 'Nama', 'Kelas', 'Rating', 'Feedback', 'Tanggal']
    ws.append(headers)
    
    # Data
    for survey in surveys:
        row = [
            survey.id,
            survey.user.name,
            survey.user.class_name or '',
            survey.rating,
            survey.feedback or '',
            survey.created_at.strftime('%Y-%m-%d %H:%M:%S')
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
        download_name=f'survey_results.xlsx'
    )

