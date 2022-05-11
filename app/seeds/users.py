from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='demo', firstName='Demo', lastName='User', email='demo@nonogram.com', password='password', bio='Thank you for trying out Nonogram! 🐶', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652238615/Nonogram/FullSizeR_2__1_f0u0y6.jpg', privateStatus=False)
    james = User(username='james', firstName='James', lastName='Chen', email='james@nonogram.com', password='password', bio='Literally the coolest person in the world. No cap. 😎', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652238728/Nonogram/73676915_yzrlfq.jpg', privateStatus=False)
    dayton = User(username='dayton', firstName='Dayton', lastName='Chen', email='dayton@nonogram.com', password='password', bio='Searching far and wide for a killer whale of my own... 🐋', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652238731/Nonogram/94093737_ffe07t.jpg', privateStatus=False)
    grant = User(username='grant', firstName='Grant', lastName='Walton', email='grant@nonogram.com', password='password', bio='Live, breath, code, and maybe some League of Legends in-between.', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652239160/Nonogram/65691441_rztota.jpg', privateStatus=False)
    huyen = User(username='huyen', firstName='Huyen', lastName='Nguyen', email='huyen@nonogram.com', password='password', bio='Is it nap time yet? 😴', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652238737/Nonogram/92718001_dbhz5u.jpg', privateStatus=False)
    khoi = User(username='khoi', firstName='Khoi', lastName='Duong', email='khoi@nonogram.com', password='password', bio='Invest in KHOIN. To the moon!! 🚀🚀🚀', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652238735/Nonogram/92695890_h2lduf.jpg', privateStatus=False)
    brad = User(username='brad', firstName='Brad', lastName='Simpson', email='brad@nonogram.com', password='password', bio='Only the greatest cohort lead of all time.', profilePictureUrl='https://res.cloudinary.com/jameschenn/image/upload/v1652238742/Nonogram/59807764_nnsnau.jpg', privateStatus=False)

    db.session.add(demo)
    db.session.add(james)
    db.session.add(dayton)
    db.session.add(grant)
    db.session.add(huyen)
    db.session.add(khoi)
    db.session.add(brad)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
