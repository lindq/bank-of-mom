import os

import jinja2
import webapp2


_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class Main(webapp2.RequestHandler):

    def get(self):
        version = os.environ.get('CURRENT_VERSION_ID', '')
        template = _jinja_env.get_template('index.html')
        self.response.write(template.render({'version': version}))


application = webapp2.WSGIApplication([('/', Main)], debug=True)
