from app.models import db, Image

def seed_images():
  post1 = Image(userId=1, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254531/Nonogram/nono1_ptga38.png', caption='Practicing my Puss in Boots look to make the humans submit to me.')
  post2 = Image(userId=1, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254536/Nonogram/nono2_hbtlak.png', caption='I\'m a lion, hear me roar!!')
  post3 = Image(userId=1, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254533/Nonogram/nono3_i6km3t.png', caption='TBT to when I was a young pupper')
  post4 = Image(userId=1, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254534/Nonogram/nono4_lma9ht.png', caption='Besides eating, I also love to sleep. 😴')
  post5 = Image(userId=1, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254538/Nonogram/nono5_ninlvi.png', caption='Blue Steel')
  post6 = Image(userId=3, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254246/Nonogram/Dayton1_vlzljp.jpg', caption='I\'m the secret 8th member of BTS.')
  post7 = Image(userId=4, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254273/Nonogram/Grant1_zb4ufz.jpg', caption='Felt cute, might delete later')
  post8 = Image(userId=7, imageUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652254289/Nonogram/bradschair_r8br4o.png', caption='I just really love my chair! 💖')

  db.session.add(post1)
  db.session.add(post2)
  db.session.add(post3)
  db.session.add(post4)
  db.session.add(post5)
  db.session.add(post6)
  db.session.add(post7)
  db.session.add(post8)

  db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
