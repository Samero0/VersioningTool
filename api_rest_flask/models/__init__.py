from app import db

class PortalUpdate(db.Model):
    __tablename__ = 'portal_updates'

    id = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.String(50), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    next_scheduled_update = db.Column(db.DateTime, nullable=True)
    enabled = db.Column(db.Boolean, default=False)

class ReleaseNote(db.Model):
    __tablename__ = 'release_notes'

    id = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    content = db.Column(db.Text, nullable=False)
