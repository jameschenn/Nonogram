from flask import Blueprint, jsonify
from app.models import db, User, Image

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET'])
def search():

  images = Image.query.all()
  # users = User.query.all()
  imagesDict = [image.to_dict() for image in images]
  # usersDict = [user.to_dict() for user in users]

  return jsonify(imagesDict)
