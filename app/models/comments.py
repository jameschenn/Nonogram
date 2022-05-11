from .db import db
from sqlalchemy.sql import func

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  imageId = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
  comment = db.Column(db.String(255), nullable=True)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  user = db.relationship('User', back_populates='comments')
  image = db.relationship('Post', back_populates='comments')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'imageId': self.imageId,
      'comment': self.comment,
      'user': self.user.to_dict(),
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }
