from .db import db
from sqlalchemy.sql import func

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  imageId = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  user = db.relationship('User', back_populates='likes')
  image = db.relationship('Image', back_populates='likes')

  def to_dict(self):
    return {
      'id':self.id,
      'imageId': self.imageId,
      'userId': self.userId,
      'user': self.user.to_dict(),
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }
