from .db import db
from sqlalchemy.sql import func

class Dm(db.Model):
  __tablename__ = 'dms'

  id = db.Column(db.Integer, primary_key=True)
  chatroomId = db.Column(db.Integer, db.ForeignKey('chatrooms.id'), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  message = db.Column(db.String, nullable=False)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  chatroom = db.relationship('Chatroom', back_populates='dms')
  user = db.relationship('User', back_populates='dms')

    def to_dict(self):
      return {
        'id': self.id,
        'chatroomId': self.chatroomId,
        'userId': self.userId,
        'message': self.message,
        'user': self.user.to_dict(),
        'createdAt': self.createdAt,
        'updatedAt': self.updatedAt
      }
