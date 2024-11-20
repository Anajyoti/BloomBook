from app.models import db, GrowthTracker, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, datetime

def seed_growth_trackers():
    # Fetch all users
    users = User.query.all()

    # Example growth tracker entries
    tracker1 = GrowthTracker(
        user_id=users[0].id,  # Assuming at least one user exists
        metric='Mindfulness',
        progress=60.0,
        target=100.0,
        date_logged=date(2024, 1, 15),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    tracker2 = GrowthTracker(
        user_id=users[1].id,  # Second user
        metric='Fitness Level',
        progress=40.0,
        target=80.0,
        date_logged=date(2024, 1, 16),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    tracker3 = GrowthTracker(
        user_id=users[0].id,
        metric='Productivity',
        progress=75.0,
        target=90.0,
        date_logged=date(2024, 1, 20),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    tracker4 = GrowthTracker(
        user_id=users[2].id if len(users) > 2 else users[0].id,  # Fallback to first user
        metric='Reading Progress',
        progress=45.0,
        target=60.0,
        date_logged=date(2024, 2, 1),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    tracker5 = GrowthTracker(
        user_id=users[1].id,
        metric='Healthy Eating',
        progress=80.0,
        target=100.0,
        date_logged=date(2024, 2, 5),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    tracker6 = GrowthTracker(
        user_id=users[0].id,
        metric='Meditation Hours',
        progress=10.0,
        target=20.0,
        date_logged=date(2024, 2, 10),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Add the growth tracker entries to the session
    db.session.add(tracker1)
    db.session.add(tracker2)
    db.session.add(tracker3)
    db.session.add(tracker4)
    db.session.add(tracker5)
    db.session.add(tracker6)

    # Commit the transaction to save entries to the database
    db.session.commit()

def undo_growth_trackers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.growth_trackers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM growth_trackers"))

    db.session.commit()
