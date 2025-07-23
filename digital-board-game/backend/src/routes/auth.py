from flask import Blueprint, request, jsonify
from src.models.user import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_type = data.get('type')
    
    if user_type == 'student':
        name = data.get('name')
        class_name = data.get('class')
        subject = data.get('subject', 'SPLDV')
        
        if not name or not class_name:
            return jsonify({'success': False, 'message': 'Nama dan kelas harus diisi'}), 400
        
        # Create or get student user
        user = User.query.filter_by(name=name, user_type='student').first()
        if not user:
            user = User(name=name, class_name=class_name, subject=subject, user_type='student')
            db.session.add(user)
            db.session.commit()
        
        return jsonify({
            'success': True,
            'user': {
                'id': user.id,
                'name': user.name,
                'class': user.class_name,
                'subject': user.subject,
                'type': user.user_type
            }
        })
    
    elif user_type == 'teacher':
        password = data.get('password')
        
        if password != 'guru123':
            return jsonify({'success': False, 'message': 'Password guru salah'}), 401
        
        return jsonify({
            'success': True,
            'user': {
                'type': 'teacher',
                'name': 'Guru'
            }
        })
    
    elif user_type == 'admin':
        password = data.get('password')
        
        if password != 'admin123':
            return jsonify({'success': False, 'message': 'Password admin salah'}), 401
        
        return jsonify({
            'success': True,
            'user': {
                'type': 'admin',
                'name': 'Admin'
            }
        })
    
    return jsonify({'success': False, 'message': 'Tipe user tidak valid'}), 400

