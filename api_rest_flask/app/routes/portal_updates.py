# app/routes/portal_updates.py
from flask import Blueprint, request, jsonify
from models import PortalUpdate
from app import db
from datetime import datetime

bp = Blueprint("portal_updates", __name__, url_prefix="/portal-updates")

@bp.route("/", methods=["POST"])
def create_portal_update():
    data = request.get_json()

    # Parseamos la fecha correctamente (solo tomamos la parte YYYY-MM-DD)
    date_str = data.get("next_scheduled_update")
    next_update_parsed = datetime.strptime(date_str[:10], "%Y-%m-%d") if date_str else None

    new_entry = PortalUpdate(
        version=data.get("version"),
        updated_at=datetime.utcnow(),
        next_scheduled_update=next_update_parsed,
        enabled=data.get("enabled", False)
    )

    db.session.add(new_entry)
    db.session.commit()

    return jsonify({"message": "Portal update created"}), 201

@bp.route("/latest", methods=["GET"])
def get_latest_portal_update():
    latest = PortalUpdate.query.order_by(PortalUpdate.updated_at.desc()).first()
    if not latest:
        return jsonify({"message": "No updates found"}), 404
    return jsonify({
        "id": latest.id,
        "version": latest.version,
        "updated_at": latest.updated_at.isoformat(),
        "next_scheduled_update": latest.next_scheduled_update.isoformat() if latest.next_scheduled_update else None,
        "enabled": latest.enabled
    })

@bp.route("/", methods=["PUT"])
def update_latest_portal_update():
    data = request.get_json()

    # Buscar el último registro por fecha de actualización
    latest_entry = PortalUpdate.query.order_by(PortalUpdate.updated_at.desc()).first()
    if not latest_entry:
        return jsonify({"error": "No portal update found"}), 404

    # Actualizar solo los campos presentes en el payload
    if "version" in data:
        latest_entry.version = data["version"]
    if "enabled" in data:
        latest_entry.enabled = data["enabled"]
    if "next_scheduled_update" in data:
        date_str = data["next_scheduled_update"]
        latest_entry.next_scheduled_update = datetime.strptime(date_str[:10], "%Y-%m-%d")

    # Actualizar campo de timestamp
    latest_entry.updated_at = datetime.utcnow()

    db.session.commit()
    return jsonify({"message": "Portal update updated"}), 200


