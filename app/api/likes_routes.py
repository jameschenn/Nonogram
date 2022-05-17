from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, User, Like

like_routes = Blueprint('likes', __name__)

# @like_routes.route('/<int:imageId>/likes/', methods=['GET'])
# def get_likes(imageId):
#   print('FROM THE BACKEND --------------------------------------------------------------------------------------------------')
#   likes = Like.query.filter(Like.imageId == imageId).all()
#   return { 'likes': [ like.to_dict() for like in likes ]}

# @like_routes.route('/<int:imageId>/likes', method=['PUT'])
# def toggle_likes(imageId):

#   sessionUser_id = current_user.id
#   like = Like.query.filter(Like.userId == sessionUser_id, Like.imageId == imageId).first()
