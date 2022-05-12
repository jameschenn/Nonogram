from flask import Blueprint, session, request
from app.models import db, User, Image
from app.forms import UploadImageForm, EditCaptionForm
from flask_login import login_required, current_user
from app.s3_helper import (upload_file_to_s3, allowed_file, get_unique_filename)

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

@image_routes.route('/image/<int:id>')
def get_individual_image(id):
  image = Image.query.get(id)
  return { 'image': image.to_dict() }

@image_routes.route('/upload', methods=['GET', 'POST'])
@login_required
def upload_image():
  print('BACKEND ROUTE HIT-----------------------------------------')
  form = UploadImageForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    if "image" not in request.files:
      return {"errors": "image required"}, 400

    image = request.files["image"]
    print('image', image)
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print('upload', upload)
    if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(userId=current_user.id, imageUrl=url, caption=form.data['caption'])
    db.session.add(new_image)
    db.session.commit()
    print('TEST', new_image.to_dict())
    return {"image": new_image.to_dict()}

  return form.errors

  #   data = form.data
  #   image = Image(
  #     userId = data['userId'],
  #     imageUrl = data['imageUrl'],
  #     caption = data['caption'],
  #     )
  #   db.session.add(image)
  #   db.session.commit()
  #   return { 'image': image.to_dict() }

  # return form.errors

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

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):

  image = Image.query.get(id)
  deleted = image.to_dict()
  db.session.delete(image)
  db.session.commit()
  return deleted
