from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os
import base64
from bson import ObjectId

app = Flask(__name__)

# Setup CORS to allow requests from your frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['CEODATABASE']
posts_collection = db['Posts']
alumnies_collection = db['alumnies']

# Folder to store profile photos
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def home():
    return "Welcome"

# Post creation route
@app.route('/api/posts', methods=['POST'])
def create_post():
    text = request.form['text']
    media_file = request.files.get('media')

    post_data = {'text': text}

    if media_file:
        media_content = media_file.read()
        media_base64 = base64.b64encode(media_content).decode('utf-8')
        post_data['media_file_base64'] = media_base64
        post_data['mediaType'] = media_file.content_type.split('/')[0]

    inserted_post = posts_collection.insert_one(post_data)
    post_data['_id'] = str(inserted_post.inserted_id)

    return jsonify(post_data), 201

# Get all posts
@app.route('/api/posts/get', methods=['GET'])
def get_posts():
    posts = posts_collection.find()
    result = []
    for post in posts:
        post['_id'] = str(post['_id'])
        result.append(post)
    return jsonify(result), 200

# Delete post by ID
@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    result = posts_collection.delete_one({"_id": ObjectId(post_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Post deleted"}), 200
    else:
        return jsonify({"message": "Post not found"}), 404

# Alumni registration route
@app.route('/signup', methods=['POST'])
def register_alumni():
    try:
        data = request.form
        photo = request.files.get('profilephoto')

        if not photo:
            return jsonify({"error": "No profile photo uploaded"}), 400

        # Save the uploaded photo
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Insert alumni data into MongoDB (including the photo)
        alumni_data = {
            "name": data.get('name'),
            "email": data.get('email'),
            "degree": data.get('degree'),
            "yearofpassout": data.get('yearofpassout'),
            "currentlyworkingin": data.get('currentlyworkingin'),
            "experiencedCompanies": data.get('experiencedCompanies'),
            "github": data.get('github'),
            "message": data.get('message'),
            "profilephoto": filename
        }

        alumnies_collection.insert_one(alumni_data)
        return jsonify({"message": "Alumni registered successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Alumni search route
@app.route('/search', methods=['GET'])
def search_alumni():
    try:
        query = request.args.get('query')

        if not query:
            return jsonify({"error": "Query parameter is required"}), 400

        # Search for alumni by name or company (case-insensitive)
        alumni_list = alumnies_collection.find({
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"currentlyworkingin": {"$regex": query, "$options": "i"}}
            ]
        })

        result = []
        for alumni in alumni_list:
            result.append({
                "name": alumni.get('name'),
                "email": alumni.get('email'),
                "degree": alumni.get('degree'),
                "yearofpassout": alumni.get('yearofpassout'),
                "currentlyworkingin": alumni.get('currentlyworkingin'),
                "experiencedCompanies": alumni.get('experiencedCompanies', 'N/A'),
                "github": alumni.get('github', 'N/A'),
                "message": alumni.get('message', 'N/A'),
                "profilephoto": alumni.get('profilephoto')
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve profile images
@app.route('/uploads/<filename>', methods=['GET'])
def serve_profile_photo(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
