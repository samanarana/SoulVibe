from flask import Blueprint, jsonify

resource_routes = Blueprint('resource', __name__)

# Sample data
resources = [
    {'id': 1, 'name': 'Resource 1', 'description': 'Description for resource 1', 'link': 'http://link1.com'},
    {'id': 2, 'name': 'Resource 2', 'description': 'Description for resource 2', 'link': 'http://link2.com'},
]

# Fetch all resources available in the hub
@resource_routes.route('/', methods=['GET'])
def get_resources():
    return jsonify(resources)

# Fetch a specific resource from the hub
@resource_routes.route('/<int:id>', methods=['GET'])
def get_resource(id):
    resource = next((res for res in resources if res['id'] == id), None)
    if resource:
        return jsonify(resource)
    else:
        return ('Resource not found', 404)
