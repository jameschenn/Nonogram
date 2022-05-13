from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class PostCommentForm(FlaskForm):
  comment = String('Comment')

class EditCommentForm(FlaskForm):
  comment = String('Comment')
