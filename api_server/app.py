from flask import Flask, Blueprint, request
from flask_cors import CORS, cross_origin
from api_server.dataset_manager import DatasetManager
from bson.json_util import dumps

BLUE_PRINT = Blueprint('easy-label', __name__)
CORS(BLUE_PRINT)
DATASET_MANAGER = DatasetManager()


@BLUE_PRINT.route('/metadata', methods=['GET'])
def get_metadata():
    return dumps(DATASET_MANAGER.getMetadata())


@BLUE_PRINT.route('/data/<index>', methods=['GET'])
def get_data(index):
    return dumps(DATASET_MANAGER.findByIndex(int(index)))


@BLUE_PRINT.route('/data/<index>', methods=['PUT'])
def put_data(index):
    document = request.get_json()
    print(document)
    return dumps(DATASET_MANAGER.updateByIndex(int(index), document))


def create_app():
    app = Flask(__name__)
    app.register_blueprint(BLUE_PRINT)

    return app
