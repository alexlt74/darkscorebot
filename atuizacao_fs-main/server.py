from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 8000

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        super().end_headers()

httpd = HTTPServer(('localhost', PORT), CustomHandler)
print(f"Server started at http://localhost:{PORT}")
httpd.serve_forever()
