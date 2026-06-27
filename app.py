from __future__ import annotations
import json
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "replace-this-with-a-secure-key"

PROJECTS_PATH = "data/projects.json"
CONTACT_LOG_PATH = "messages.txt"


@app.context_processor
def inject_current_year():
    return {"current_year": datetime.utcnow().year}


def load_projects():
    with open(PROJECTS_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    projects = load_projects()
    return render_template("projects.html", projects=projects)


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()

        if not name or not email or not message:
            flash("Please complete all fields before sending your message.", "error")
            return redirect(url_for("contact"))

        contact_entry = {
            "name": name,
            "email": email,
            "message": message,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }

        with open(CONTACT_LOG_PATH, "a", encoding="utf-8") as file:
            file.write(json.dumps(contact_entry, ensure_ascii=False) + "\n")

        print("New contact message:", contact_entry)
        flash("Thank you! Your message has been sent successfully.", "success")
        return redirect(url_for("contact"))

    return render_template("contact.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
