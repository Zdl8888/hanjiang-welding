import http.server
import os

PORT = 3000
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = self.path.split("?")[0].split("#")[0]
        if not os.path.splitext(path)[1]:
            html = path.rstrip("/") + ".html"
            if path.endswith("/") and os.path.isfile(ROOT + path + "index.html"):
                self.path = path + "index.html"
            elif os.path.isfile(ROOT + html):
                self.path = html
        super().do_GET()

print(f"[HJ] Welding machine site: http://localhost:{PORT}")
print("   Close this window to stop the server.")
http.server.HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
