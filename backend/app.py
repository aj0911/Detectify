from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from Detect import detect_objects

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload():
    data = request.json['img']
    img_data = base64.b64decode(data.split(',')[1])
    res = detect_objects(img_data)

    processed_data = {'message': 'Data received', 'img': res[0], 'data':res[1]}
    return jsonify(processed_data)

