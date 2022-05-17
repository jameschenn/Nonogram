from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, User, Like
from flask_login import login_required, current_user

like_routes = Blueprint('likes', __name__)



#This gets session user's likes. Not what I need tho.

@like_routes.route('/', methods=['GET'])
# @login_required
def get_likes():
  user_id = current_user.id
  user = User.query.get(user_id)
  user_likes = user.likes
  return { 'likes': [ like.to_dict() for like in user_likes] }

@like_routes.route('/', methods=['POST'])
@login_required
def post_likes():

  imageId = request.json['imageId']

  new_like = Like(
    userId = current_user.id,
    imageId = imageId,
  )

  db.session.add(new_like)
  db.session.commit()

  return new_like.to_dict()

@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_likes(id):
  like = Like.query.get(id)
  deleted = like.to_dict()
  db.session.delete(like)
  db.session.commit()
  return deleted
