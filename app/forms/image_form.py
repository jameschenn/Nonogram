from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class UploadImageForm(FlaskForm):
  userId = IntegerField('userId', validators=[DataRequired()])
  image = StringField('image', validators=[DataRequired()])
  caption = StringField('Caption')

class EditCaptionForm(FlaskForm):
  caption = StringField('Caption')
