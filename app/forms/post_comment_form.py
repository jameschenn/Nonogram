from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class PostCommentForm(FlaskForm):
  userId = IntegerField('userId', validators=[DataRequired()])
  imageId = IntegerField('imageId', validators=[DataRequired()])
  comment = StringField('comment')

class EditCommentForm(FlaskForm):
  comment = StringField('comment')
