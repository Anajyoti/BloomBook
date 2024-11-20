from flask import Blueprint, request, jsonify, abort
from flask_login import login_required, current_user
from ..models import db, GrowthTracker

growth_tracker_routes = Blueprint('growth_tracker', __name__)

# GET: Fetch all growth tracker entries for the current user
@growth_tracker_routes.route('', methods=['GET'])
@login_required
def get_all_growth_trackers():
    growth_trackers = GrowthTracker.query.filter_by(user_id=current_user.id).all()
    return jsonify([tracker.to_dict() for tracker in growth_trackers])

# POST: Add a new growth metric to track progress
@growth_tracker_routes.route('', methods=['POST'])
@login_required
def add_growth_tracker():
    data = request.get_json()
    
    # Validate input
    required_fields = ['metric', 'progress', 'target']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400
    
    try:
        # Create new growth tracker entry
        new_tracker = GrowthTracker(
            user_id=current_user.id,
            metric=data['metric'],
            progress=float(data['progress']),
            target=float(data['target']),
            date_logged=data.get('date_logged')  # Optional, defaults to today's date
        )
        db.session.add(new_tracker)
        db.session.commit()
        return jsonify(new_tracker.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# GET: Fetch detailed information about a specific growth tracker entry
@growth_tracker_routes.route('/<int:tracker_id>', methods=['GET'])
@login_required
def get_growth_tracker(tracker_id):
    tracker = GrowthTracker.query.get(tracker_id)
    
    # Check if the tracker exists and belongs to the current user
    if not tracker or tracker.user_id != current_user.id:
        abort(404, description="Growth tracker entry not found or not owned by the current user")

    return jsonify(tracker.to_dict())

# PUT: Update an existing growth tracker entry
@growth_tracker_routes.route('/<int:tracker_id>', methods=['PUT'])
@login_required
def update_growth_tracker(tracker_id):
    tracker = GrowthTracker.query.get(tracker_id)
    
    if not tracker or tracker.user_id != current_user.id:
        abort(404, description="Growth tracker entry not found or not owned by the current user")

    data = request.get_json()

    # Update fields if provided
    metric = data.get('metric')
    progress = data.get('progress')
    target = data.get('target')
    date_logged = data.get('date_logged')

    if metric:
        tracker.metric = metric
    if progress:
        tracker.progress = float(progress)
    if target:
        tracker.target = float(target)
    if date_logged:
        tracker.date_logged = date_logged

    db.session.commit()
    return jsonify(tracker.to_dict())

# DELETE: Delete a specific growth tracker entry
@growth_tracker_routes.route('/<int:tracker_id>', methods=['DELETE'])
@login_required
def delete_growth_tracker(tracker_id):
    tracker = GrowthTracker.query.get(tracker_id)

    if not tracker or tracker.user_id != current_user.id:
        abort(404, description="Growth tracker entry not found or not owned by the current user")

    db.session.delete(tracker)
    db.session.commit()
    return jsonify({'message': 'Growth tracker entry deleted successfully'}), 200
