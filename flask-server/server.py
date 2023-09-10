from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS to allow requests from 'http://localhost:3000'
cors = CORS(app, resources={
    r"/members": {"origins": "http://localhost:3000"},
    r"/code": {"origins": "http://localhost:3000"}
})

@app.route("/members")
def members():
    return {"members" :["Member 1", "Member 2", "Member 3","Member 4", "Member 5"] }


@app.route("/code",methods=['POST'])
def receive_data():
    data = request.get_json()
    print("Received data from frontend:", data)
    return jsonify({"message": "Data received successfully"})

if __name__ == "__main__":
    app.run(debug=True)
