from .db import db
from sqlalchemy.sql import func

class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  imageUrl = db.Column(db.String(500), nullable=False)
  caption = db.Column(db.String(500), nullable=True)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  user = db.relationship('User', back_populates='images')
  comments = db.relationship('Comment', back_populates='image', cascade='all, delete')
  likes = db.relationship('Like', back_populates='image', cascade='all, delete')


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'imageUrl': self.imageUrl,
      'caption': self.caption,
      'user': self.user.to_dict(),
      'likes': [like.to_dict() for like in self.likes],
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }
