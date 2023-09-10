from flask import Flask,request,render_template
from flask_cors import CORS
from code_analyzer.analyzer import analyze_code_line

app = Flask(__name__)

# Configure CORS to allow requests from 'http://localhost:3000'
cors = CORS(app, resources={r"/members": {"origins": "http://localhost:3000"}})

@app.route("/members")
def members():
    return {"members" :["Member 1", "Member 2", "Member 3","Member 4", "Member 5"] }

@app.route('/analyze', methods=['POST'])
def analyze():
    code = request.form['code']
    lines = code.split('\n')
    results=[]


    for line in lines:
        analysis_results = analyze_code_line(line)
        results.append(analysis_results)

# find some way to return this to the frontend
    


if __name__ == "__main__":
    app.run(debug=True)
