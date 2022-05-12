from flask import Blueprint, session, request
from app.models import db, User, Image
from app.forms import UploadImageForm, EditCaptionForm
from flask_login import login_required, current_user
# from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint('images', __name__)

@image_routes.route('/')
def get_all_images():
  images = Image.query.all()
  return { 'images': [ image.to_dict() for image in images ] }

@image_routes.route('/<int:id>')
def get_user_images(id):
  user = User.query.get(id)
  user_images = user.images
  return { 'images': [ image.to_dict() for image in user_images ]  }

# @image_routes.route('/upload', methods=['GET', 'POST'])
# @login_required
# def upload_image():

#   form = UploadImageForm()

#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     data = form.data
#     image = Image(
#       userId = data['userId'],
#       imageUrl = data['imageUrl'],
#       caption = data['caption'],
#       )
#     db.session.add(image)
#     db.session.commit()
#     return { 'group': group.to_dict() }

#   return form.errors

@image_routes.route('/<int:id>/edit', methods=['POST'])
@login_required
def edit_caption(id):

  form = EditCaptionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  image = Image.query.get(id)

  if form.validate_on_submit():
    image.caption = data['caption']

    db.session.commit()
    return image.to_dict()

  return form.errors
