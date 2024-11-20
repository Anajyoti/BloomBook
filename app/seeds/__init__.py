from flask.cli import AppGroup
from .users import seed_users, undo_users
from .growthtracker import seed_growth_trackers, undo_growth_trackers
from .journals import seed_journals, undo_journals

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_growth_trackers()
        undo_journals()
    seed_users()
    seed_growth_trackers()
    seed_journals()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_growth_trackers()
    undo_journals()
    # Add other undo functions here
