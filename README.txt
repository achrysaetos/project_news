News aggregator.
Using html, css, node, and express.
Do not forget to remove your database url and api keys.

TO LAUNCH THE SITE:
1. We crawl for headlines every hour -- run spiders in project_news_scraper
2. We publish the headlines -- copy and push json files to project_news_file_hosting
3. Users can access the headlines -- run "DEBUG=project_news:* npm run devstart" and go to http://localhost:3000
**Eventually, we will be able to automate scraping and securely publish, and users will be able to filter by keywords.**

IMPORTANT: run "npm install" in terminal
npm install consolidate and swig to avoid using pug as the templating engine
npm install mongoose to connect to a database for users and features
npm install bcryptjs, body-parser, and express-validator in order to securely authenticate users
npm install express-session in order to track user sessions
npm install xmlhttprequest in order to get json from http url
npm install compression and helmet to get ready for deployment
npm install newsapi to use news api