# QuizSpark

QuizSpark is a static, mobile-friendly learning and games website published with GitHub Pages. The site combines stories, university-style learning content, quizzes and games, player progress, points, leaderboards and reviews.

## Live website

https://michael20046.github.io/QuizSpark-Game/

## Project structure

- `index.html` — main application, including the browser-side Firebase integration and learning/game experience.
- `about.html`, `privacy.html`, `terms.html` — public information and policy pages.
- `admin.html`, `admin-latest.html` — existing administration pages; access and authorization must be verified in the deployed Firebase configuration.
- `assets/` — images and other static assets.
- `manifest.webmanifest`, `service-worker.js` — installable web-app metadata and offline/update behavior.
- `.github/workflows/static.yml` — validates the main JavaScript module and deploys the static site to GitHub Pages.

## Deployment

Changes pushed to the `main` branch trigger the GitHub Actions workflow in `.github/workflows/static.yml`. The workflow checks the inline JavaScript module with Node.js, uploads the site files and publishes them to GitHub Pages. A successful workflow means the deployment job completed; it does not replace checking the public website in a browser.

## Firebase

The browser application uses Firebase Authentication and Cloud Firestore in project `quizspark-65dbd`. Firebase web-app configuration is included in the client application. Firebase web configuration is not an Admin SDK credential; actual data protection depends on correctly configured Firebase Authentication and Firestore Security Rules.

The repository currently contains no Firebase CLI configuration, Firestore rules file or Cloud Functions backend. Therefore, server-trusted operations such as fully deleting an account and its associated records must not be implemented as client-only UI actions. Before introducing those operations, inspect the rules and data model in the Firebase project, then add and test a trusted backend and deploy it through an authorized Firebase environment.

## Development notes

- Preserve the existing application content and purple/gold visual identity when making changes.
- Test the main page and supporting pages after deployment, including sign-in, stories, learning progress, games, points, reviews and mobile layout.
- Do not treat local browser storage deletion as deletion of Firebase account data.
