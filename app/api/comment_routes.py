from flask import Blueprint
from app.models import db, User, Comment, Image
from flask_login import login_required, current_user

comment_routes = Blueprint('comments',__name__)

@comment_routes.route('/<int:id>/comments')
def get_comments(id):
  image = Image.query.get(id)
  comments = image.comments
  return { 'comments': [ comment.to_dict() for comment in comments ] }

@comment_routes.route('/<int:id>/comments')
@login_required
def post_comment(id): #ID for postId
  form = PostCommentForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data
    comment = Comment(
      userId=current_user.id,
      postId=id,
      comment=data["comment"],
    )
    db.session.add(comment)
    db.session.commit()
    return { 'comment': comment.to_dict() }

  return form.errors

@comment_routes.route('/<int:id>/edit', methods=['POST'])
@login_required
def edit_comment(id):

  form = PostCommentform()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  comment = Comment.query.get(id)

  if form.validate_on_submit():
    comment.comment = data['comment']
    db.session.commit()
    return comment.to_dict()

  return form.errors


@comment_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
  comment = Comment.query.get(id)
  deleted = comment.to_dict()
  db.session.delete(comment)
  db.session.commit()
  return deleted
