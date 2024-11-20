from app.models import db, Journal, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_journals():
    # Fetch all users to associate journals with a user
    users = User.query.all()

    # Create journal entries
    journal1 = Journal(
        title="Reflecting on My Morning Routine",
        content=(
            "This morning, I finally tried incorporating meditation into my routine. "
            "It was calming and helped me focus better throughout the day. I also made a healthy breakfast, "
            "which boosted my energy levels. I want to build on this habit and see how consistent I can be."
        ),
        user_id=users[0].id,  # Assuming there is at least one user
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    journal2 = Journal(
        title="Overcoming Challenges at Work",
        content=(
            "Work has been challenging lately, especially with tight deadlines and demanding projects. "
            "Today, I took a step back and prioritized tasks based on urgency and importance. "
            "I also communicated with my team, and we devised a better workflow. I feel more in control now."
        ),
        user_id=users[1].id if len(users) > 1 else users[0].id,  # Use second user if available
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    journal3 = Journal(
        title="Gratitude Journal: Things I am Thankful For",
        content=(
            "I am grateful for the support of my friends and family, especially during stressful times. "
            "I also appreciate the opportunity to work on projects I am passionate about and the lessons "
            "I have learned from my experiences. Practicing gratitude really shifts my perspective."
        ),
        user_id=users[0].id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    journal4 = Journal(
        title="Fitness Journey: Small Wins Matter",
        content=(
            "Today, I completed my first 5K run without stopping. I remember how hard it was to jog for even "
            "five minutes when I started a few months ago. This achievement reminds me that small, consistent steps "
            "lead to significant progress over time."
        ),
        user_id=users[1].id if len(users) > 1 else users[0].id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    journal5 = Journal(
        title="Learning to Embrace Change",
        content=(
            "Change has always been uncomfortable for me, but I am starting to see it as an opportunity for growth. "
            "This week, I took on a new project that is outside my comfort zone. It is been intimidating, but I know "
            "it is helping me develop new skills and perspectives."
        ),
        user_id=users[0].id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    journal6 = Journal(
        title="Reflections on a Peaceful Weekend",
        content=(
            "This weekend, I spent time reconnecting with nature during a long hike. The serenity of the forest "
            "and the sound of birds helped me feel more grounded. I also spent some time journaling about my goals, "
            "and I feel more motivated to work toward them."
        ),
        user_id=users[1].id if len(users) > 1 else users[0].id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

    # Add journals to session
    db.session.add(journal1)
    db.session.add(journal2)
    db.session.add(journal3)
    db.session.add(journal4)
    db.session.add(journal5)
    db.session.add(journal6)

    # Commit the session
    db.session.commit()


def undo_journals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()
