from .db import db

users_join = db.Table(
    "users_threads",
    db.Column("userId", db.Integer, db.ForeignKey("users.id")),
    db.Column("chatroomId", db.Integer, db.ForeignKey("chatrooms.id"))
)
