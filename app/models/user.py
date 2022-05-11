from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follows import follows
from .users_join import users_join
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(500), nullable=True)
    profilePictureUrl = db.Column(db.String(500), nullable=True)
    privateStatus = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

    images = db.relationship('Image', back_populates='user', cascade="all, delete")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete")
    likes = db.relationship('Like', back_populates='user', cascade="all, delete")
    followers = db.relationship(
        'User',
        secondary=follows,
        primaryjoin=(follows.c.followedId == id),
        secondaryjoin=(follows.c.followerId == id),
        backref=db.backref('following', lazy='dynamic'),
        lazy='dynamic'
    )

    dms = db.relationship('Dm', back_populates='user')
    chatrooms = db.relationship(
        'Chatroom',
        secondary=users_join,
        back_populates='users'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def followers_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'profilePictureUrl': self.profilePictureUrl,
            'privateStatus': self.privateStatus,
        }

    def to_dict(self):
        followers = [follower.followers_to_dict() for follower in self.followers]
        following = [following.followers_to_dict() for following in self.following]

        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'bio': self.bio,
            'profilePictureUrl': self.profilePictureUrl,
            'privateStatus': self.privateStatus,
            'followers': followers,
            'following': following,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
