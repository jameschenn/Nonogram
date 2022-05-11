from flask import Blueprint
from app.models import db, User, Image
from flask_login import login_required, current_user

image_routes = Blueprint('images', __name__)

@image_routes.route('/')
def get_all_images():
  images = Image.query.all()
  return { 'images': [ image.to_dict() for image in images ] }

@image_routes.route('/<int:id>')
def get_user_images(id):
  print('ROUTE HITSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS--------------------')
  user = User.query.get(id)
  user_images = user.images
  return { 'images': [ image.to_dict() for image in user_images ]  }
