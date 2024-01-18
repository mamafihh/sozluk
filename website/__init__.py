from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["SECRET_KEY"] = "saldaksk ajsdjklaslkjk"
    
    from .views import views
    from .wordPages import wordPage
    
    app.register_blueprint(views, urlprefix='/')
    app.register_blueprint(wordPage, urlprefix='/')
    
    return app

