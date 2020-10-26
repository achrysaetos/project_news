
News aggregator.
Using html, css, node, and express.
Do not forget to remove your database url and api keys.

---------------------------------------------------------------------------------------------------

TO GET HEADLINES:
source scrapy-env/bin/activate
scrapy crawl ap -o ap.json

TO LAUNCH THE SITE:
run "DEBUG=project_news:* npm run devstart"
and go to http://localhost:3000

---------------------------------------------------------------------------------------------------

IMPORTANT: run "npm install" in terminal
npm install consolidate and swig to avoid using pug as the templating engine
npm install mongoose to connect to a database for users and features
npm install bcryptjs, body-parser, and express-validator in order to securely authenticate users
npm install express-session in order to track user sessions
npm install xmlhttprequest in order to get json from http url
npm install compression and helmet to get ready for deployment

NEXT: install virtual environment for scrapy
python3 -m venv scrapy-env
source scrapy-env/bin/activate
pip3 install scrapy