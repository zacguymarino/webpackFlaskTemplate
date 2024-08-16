import json, os

from flask import current_app


class Asset:
    def __init__(self, app=None):
        self.app = app
        self.assets = {}
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        self.manifest_path = os.path.join(app.static_folder, "dist", "manifest.json")
        self._get_webpack_assets(app)

        if app.config.get("DEBUG"):
            app.before_request(self.reload_webpack_assets)

        app.context_processor(lambda: {"asset": self})

    def url_for(self, file):
        return self.assets.get(file)

    def reload_webpack_assets(self):
        self._get_webpack_assets(current_app)

    def _get_webpack_assets(self, app):
        with app.open_resource(self.manifest_path) as manifest:
            self.assets = json.load(manifest)