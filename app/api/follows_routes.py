from flask import Blueprint, session, request
from app.models import db, User
from flask_login import login_required, current_user

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/')
def get_follows():
  user = User.query.get(current_user.id)
  follow = {
    'followers': [ user.to_dict() for user in user.followers ],
    'following': [ user.to_dict() for user in user.following ]
  }
  return jsonify(follow)


@follow_routes.route('/', methods=['POST'])
@login_required
def follow():

  sessionUser = User.query.get(current_user.id)
  follow_id = request.json['userId']
  follow = User.query.get(follow_id)

  sessionUser.followedId.append(follow_id)
  db.session.commit()
  return {'following': follow.to_dict()}

@follow_routes.route('/', methods=['DELETE'])
def unfollow():

  sessionUser = User.query.get(current_user.id)
  followed_id = request.json['userId']
  followed = User.query.get(follow_id)

  sessionUser.followedId.remove(followed_id)
  db.session.commit()

  return {'Unfollowed': follow.to_dict()}
