from flask import Blueprint, request, jsonify, abort
from flask_login import login_required, current_user
from ..models import db, Journal

journal_routes = Blueprint('journals', __name__)

# GET: Fetch all journals for the current user
@journal_routes.route('', methods=['GET'])
@login_required
def get_journals():
    journals = Journal.query.filter_by(user_id=current_user.id).all()
    return jsonify([journal.to_dict() for journal in journals])

# POST: Create a new journal
@journal_routes.route('', methods=['POST'])
@login_required
def create_journal():
    data = request.get_json()
    
    if not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Title and content are required'}), 400
    
    new_journal = Journal(
        user_id=current_user.id,
        title=data['title'],
        content=data['content']
    )
    
    db.session.add(new_journal)
    db.session.commit()

    return jsonify(new_journal.to_dict()), 201

# GET, PUT, DELETE: Handle specific journal entry by ID
@journal_routes.route('/<int:journal_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def handle_journal(journal_id):
    journal = Journal.query.get(journal_id)
    
    if not journal or journal.user_id != current_user.id:
        abort(404, description="Journal not found or not owned by the current user")

    if request.method == 'GET':
        return jsonify(journal.to_dict())

    elif request.method == 'PUT':
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Update fields
        title = data.get('title')
        content = data.get('content')

        if title:
            journal.title = title
        if content:
            journal.content = content

        db.session.commit()
        return jsonify(journal.to_dict())

    elif request.method == 'DELETE':
        db.session.delete(journal)
        db.session.commit()
        return jsonify({'message': 'Journal deleted successfully'}), 200
