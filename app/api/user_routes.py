from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import UpdateProfileForm
from app.s3_helper import (upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_profile(id):
    form = UpdateProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if not len(request.files):
            user = User.query.filter(User.id == current_user.id).first()

            user.firstName=form.data['firstName'],
            user.lastName=form.data['lastName'],
            user.bio=form.data['bio'],
            db.session.add(user)
            db.session.commit()
            return user.to_dict()
        else:

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
            user = User.query.filter(User.id == current_user.id).first()

            user.firstName=form.data['firstName'],
            user.lastName=form.data['lastName'],
            # user.hashed_password=form.data['password'],
            user.bio=form.data['bio'],
            user.profilePictureUrl=url,

            db.session.commit()
            return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
