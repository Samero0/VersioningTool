from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

db = SQLAlchemy()
def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    
    from .routes import portal_updates, release_notes
    app.register_blueprint(portal_updates.bp)
    app.register_blueprint(release_notes.bp)

    return app
