from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    class_name = db.Column(db.String(50), nullable=True)
    subject = db.Column(db.String(50), nullable=True)
    user_type = db.Column(db.String(20), nullable=False)  # student, teacher, admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'class_name': self.class_name,
            'subject': self.subject,
            'user_type': self.user_type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class GameResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.String(50), nullable=False)
    position = db.Column(db.Integer, nullable=True)
    correct_answers = db.Column(db.Integer, default=0)
    total_answers = db.Column(db.Integer, default=0)
    game_duration = db.Column(db.Integer, nullable=True)  # in seconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('game_results', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'room_id': self.room_id,
            'position': self.position,
            'correct_answers': self.correct_answers,
            'total_answers': self.total_answers,
            'game_duration': self.game_duration,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    feedback = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('surveys', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'rating': self.rating,
            'feedback': self.feedback,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
