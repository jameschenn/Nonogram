from app.models import db, Comment

def seed_comments():
  comment1 = Comment(userId=2, imageId=1, comment='First!')
  comment2 = Comment(userId=2, imageId=3, comment='You didn\'t age a day! You still look like this!')
  comment3 = Comment(userId=1, imageId=1, comment='No one cares James')
  comment4 = Comment(userId=5, imageId=4, comment='LOOOOOOOOL, those are my favorite hobbies too!! 😂')
  comment5 = Comment(userId=6, imageId=5, comment='Looking good stud')
  comment6 = Comment(userId=3, imageId=5, comment='I\'m cuter than you. Why am I comparing myself to a dog?')
  comment7 = Comment(userId=7, imageId=6, comment='I miss you Dayton, why did you leave us for the January cohort?')
  comment8 = Comment(userId=5, imageId=6, comment='I don\'t want to be a shark, I want to be a whale!!')
  comment9 = Comment(userId=4, imageId=6, comment='You think you\'re more handsome than me? Checkout my page.')
  comment10 = Comment(userId=2, imageId=7, comment='🥵🥵🥵')
  comment11 = Comment(userId=3, imageId=7, comment='I admit defeat')
  comment12 = Comment(userId=5, imageId=7, comment='LOOOOOOOL GRANT YOU ARE SO PHOTOGENIC!!')
  comment13 = Comment(userId=6, imageId=7, comment='SHEEEESH, how do I compete?')
  comment14 = Comment(userId=4, imageId=8, comment='I also really like your chair')


  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)
  db.session.add(comment12)
  db.session.add(comment13)
  db.session.add(comment14)


  db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
