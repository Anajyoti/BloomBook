from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date
from .user import User

# Journal Model
class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, index=True)
    title = db.Column(db.String(255), nullable=False)  # Adjust max length as needed
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='journals')

    def __repr__(self):
        return f"<Journal(id={self.id}, title={self.title}, user_id={self.user_id})>"

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None,
        }


# GrowthTracker Model
class GrowthTracker(db.Model):
    __tablename__ = 'growth_trackers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Fields
    id = db.Column(db.Integer, primary_key=True)  # Renamed to `id` for consistency
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, index=True)
    metric = db.Column(db.String(255), nullable=False)  # Metric type, e.g., "mindfulness", "fitness"
    progress = db.Column(db.Float, nullable=False)  # Progress value, e.g., percentage or score
    target = db.Column(db.Float, nullable=False)  # Target value for the metric
    date_logged = db.Column(db.Date, default=date.today, nullable=False)  # Date when progress is logged
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='growth_trackers')

    def __repr__(self):
        return f"<GrowthTracker(id={self.id}, metric={self.metric}, user_id={self.user_id})>"

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'metric': self.metric,
            'progress': self.progress,
            'target': self.target,
            'date_logged': self.date_logged.isoformat() if self.date_logged else None,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None,
        }
