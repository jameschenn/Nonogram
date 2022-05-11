from .db import db
from .users_join import users_join
from sqlalchemy.sql import func

class Chatroom(db.Model):
  __tablename__ = 'chatrooms'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=True)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  dms = db.relationship('Dm', back_populates='chatroom')
  users = db.relationship('User', secondary=users_join, back_populates='chatrooms')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'dms': [dm.to_dict() for dm in self.dms],
      'users': [user.to_dict() for user in self.users],
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }
