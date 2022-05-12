from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class UploadImageForm(FlaskForm):
  imageUrl = StringField('ImageUrl', validators=[DataRequired()])
  caption = StringField('Caption')

class EditCaptionForm(FlaskForm):
  caption = StringField('Caption')
