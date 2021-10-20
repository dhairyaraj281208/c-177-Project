from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)


answer_dict={
    "1": "Chess",
    "2": "France"
}

templates = [
    {
        "id": 1,
        "inputs": 5,
        "category": "Sports",
        "word": "Chess"
    },
    {
        "id": 2,
        "inputs": 6,
        "category": "European Country Name",
        "word": "France"
    }
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get-word")
def get_story():
    return jsonify({
        "status": "success",
        "story": random.choice(templates)
    })


@app.route("/post-answers", methods=["POST"])
def post_answers():
    story_id = request.json.get("id")
    values = request.json.get("values")
    answers = answer_dict.get(story_id)
    index, score = 0, 0
    while index < len(values):
        if values[index].lower() == answers[index].lower():
            score += 1
        index += 1
    return jsonify({
        "status": "success",
        "result": f"{score} / {len(values)}"
    })