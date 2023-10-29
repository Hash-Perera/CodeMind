from flask import Flask, jsonify, request
from flask_cors import CORS
from code_analyzer.analyzer import analyze_code,analyze_code_line
from optimizer import optimize_code
from code_analyzer import analyzer
from validation import is_valid_java_code

app = Flask(__name__)

# Configure CORS to allow requests from 'http://localhost:3000'
cors = CORS(app, resources={
    r"/members": {"origins": "http://localhost:3000"},
    r"/code": {"origins": "http://localhost:3000"},
    r"/analyze": {"origins": "http://localhost:3000"},
    r"/analyzenew": {"origins": "http://localhost:3000"},
    r"/optimize": {"origins": "http://localhost:3000"}
})

@app.route("/members")
def members():
    return {"members" :["Member 1", "Member 2", "Member 3","Member 4", "Member 5"] }

@app.route('/analyzenew', methods=['POST'])
def analyzenew():
    data = request.get_json()
    code = data['code'];
    print(code)
    if is_valid_java_code(code):
        complexity=analyzer.analyze_code(code);
        return complexity
    else:
        return "false"
   
   
@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.get_json()
    code = data['code'];
    optimized_code =  optimize_code(code)
    return optimized_code;

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    code = data['code'];
    lines = code.split('\n')
    results=[]

    for line in lines:
        analysis_results = analyze_code_line(line)
        results.append(analysis_results)
    
     # Convert sets to lists before jsonify
    results = [list(result) if isinstance(result, set) else result for result in results]
    lines = [list(result) if isinstance(result, set) else result for result in lines]

    return jsonify({"result": results, "lines": lines})

# find some way to return this to the frontend
    


@app.route("/code",methods=['POST'])
def receive_data():
    data = request.get_json()
    print("Received data from frontend:", data)
    return jsonify({"message": "Data received successfully"})

if __name__ == "__main__":
    app.run(debug=True)
