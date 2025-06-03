# app/routes/release_notes.py
from flask import Blueprint, request, jsonify
from models import ReleaseNote
from app import db
from datetime import datetime

bp = Blueprint("release_notes", __name__, url_prefix="/release-notes")


@bp.route("/", methods=["POST"])
def create_release_note():
    data = request.get_json()

    date_str = data.get("date")
    date_parsed = datetime.strptime(date_str[:10], "%Y-%m-%d")  # ← esta es la clave

    new_note = ReleaseNote(
        version=data.get("version"),
        date=date_parsed,
        content=data.get("content")
    )

    db.session.add(new_note)
    db.session.commit()

    return jsonify({"message": "Release note created"}), 201

@bp.route("/latest", methods=["GET"])
def get_latest_release_note():
    latest = ReleaseNote.query.order_by(ReleaseNote.date.desc()).first()
    if not latest:
        return jsonify({"message": "No release notes found"}), 404
    return jsonify({
        "id": latest.id,
        "version": latest.version,
        "date": latest.date.isoformat(),
        "content": latest.content
    })

@bp.route("/", methods=["PUT"])
def update_latest_release_note():
    try:
        data = request.get_json()
        print("[PUT /release-notes/] Payload recibido:", data)

        latest_note = ReleaseNote.query.order_by(ReleaseNote.date.desc()).first()
        if not latest_note:
            print("❌ No se encontró ningún release note.")
            return jsonify({"error": "No release note found"}), 404

        if "version" in data:
            print("🔧 Actualizando versión:", data["version"])
            latest_note.version = data["version"]
        if "date" in data:
            try:
                date_str = data["date"]
                print("📅 Parseando fecha:", date_str)
                latest_note.date = datetime.strptime(date_str[:10], "%Y-%m-%d")
            except Exception as date_err:
                print("❌ Error al parsear fecha:", date_str, "→", date_err)
                return jsonify({"error": "Invalid date format"}), 400
        if "content" in data:
            print("📝 Actualizando contenido")
            latest_note.content = data["content"]

        db.session.commit()
        print("✅ Release note actualizado correctamente.")
        return jsonify({"message": "Release note updated"}), 200
    except Exception as e:
        import traceback
        print("🔥 Excepción en PUT /release-notes/:")
        print(traceback.format_exc())
        return jsonify({"error": "Internal Server Error"}), 500

