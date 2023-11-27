from flask import Blueprint, jsonify
import requests
from base64 import b64encode

spotify_routes = Blueprint('spotify_routes', __name__)

@spotify_routes.route('/', methods=['GET'])
def get_spotify_token():
    client_id = 'd12ad47c4ea44635a071aad0e636f54e'
    client_secret = '54998045b4c0478ea9d42a7b8b732dca'
    auth_header = b64encode(f'{client_id}:{client_secret}'.encode('utf-8')).decode('utf-8')

    response = requests.post(
        'https://accounts.spotify.com/api/token',
        headers={'Authorization': f'Basic {auth_header}'},
        data={'grant_type': 'client_credentials'}
    )

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to retrieve token'}), response.status_code
