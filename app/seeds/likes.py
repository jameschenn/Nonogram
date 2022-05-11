from app.models import db, Like

def seed_likes():
  like1 = Like(imageId=6, userId=1)
  like2 = Like(imageId=7, userId=1)
  like3 = Like(imageId=2, userId=1)
  like4 = Like(imageId=4, userId=2)
  like5 = Like(imageId=5, userId=2)
  like6 = Like(imageId=6, userId=2)
  like7 = Like(imageId=7, userId=2)
  like8 = Like(imageId=6, userId=4)
  like9 = Like(imageId=6, userId=5)
  like10 = Like(imageId=6, userId=6)
  like11 = Like(imageId=6, userId=7)
  like12 = Like(imageId=7, userId=3)
  like13 = Like(imageId=7, userId=5)
  like14 = Like(imageId=7, userId=6)
  like15 = Like(imageId=7, userId=7)
  like16 = Like(imageId=8, userId=4)


  db.session.add(like1)
  db.session.add(like2)
  db.session.add(like3)
  db.session.add(like4)
  db.session.add(like5)
  db.session.add(like6)
  db.session.add(like7)
  db.session.add(like8)
  db.session.add(like9)
  db.session.add(like10)
  db.session.add(like11)
  db.session.add(like12)
  db.session.add(like13)
  db.session.add(like14)
  db.session.add(like15)
  db.session.add(like16)

  db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
