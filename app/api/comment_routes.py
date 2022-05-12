from flask import Blueprint
from app.models import db, User, Comment, Image

comment_routes = Blueprint('comments',__name__)

@comment_routes.route('/<int:id>/comments')
def get_comments(id):
  image = Image.query.get(id)
  comments = image.comments
  return { 'comments': [ comment.to_dict() for comment in comments ] }
