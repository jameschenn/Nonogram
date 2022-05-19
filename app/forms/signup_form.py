from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please provide a valid username"), username_exists])
    firstName = StringField('firstName', validators=[DataRequired(message='Please provide a valid first name')])
    lastName = StringField('lastName', validators=[DataRequired(message='Please provide a valid last name')])
    email = StringField('email', validators=[DataRequired(message='Please provide a valid e-mail'), user_exists, Email(message='Please provide a valid e-mail')])
    password = StringField('password', validators=[DataRequired(message='Please provide a valid password')])
    bio = StringField('bio')
    image = StringField('image', validators=[DataRequired(message='Please provide a valid image for your profile picture')])
