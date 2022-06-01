from flask import Blueprint, session, request, jsonify
from app.models import db, User
from flask_login import login_required, current_user

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/<int:id>')
def get_follows(id):
  user = User.query.get(id)
  follow = {
    'followers': [ user.to_dict() for user in user.followers ],
    'following': [ user.to_dict() for user in user.following ]
  }
  return jsonify(follow)


@follow_routes.route('/', methods=['POST'])
@login_required
def follow():



  follow_id = request.json['userId']

  follow = User.query.get(follow_id)

  if follow not in current_user.following:
    current_user.following.append(follow)
    db.session.commit()


  # return {'following': follow.to_dict()}
  return {'following': current_user.to_dict() }

@follow_routes.route('/', methods=['DELETE'])
def unfollow():

  followed_id = request.json['userId']
  followed = User.query.get(followed_id)

  current_user.following.remove(followed)
  db.session.commit()

  return {'unfollowed': current_user.to_dict()}
