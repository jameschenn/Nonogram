from .db import db
from sqlalchemy.sql import func

class Chatroom(db.Model):
  __tablename__ = 'chatrooms'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=True)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  dms = db.relationship('Dm', back_populates='chatroom')
  users = db.relationship('User', secondary=users_join, back_populates='chatrooms')
