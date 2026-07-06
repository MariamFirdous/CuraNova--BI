# CuraNova--BI

CuraNova is a patient-friendly web app that helps people understand medical report language in simple, everyday words. It turns confusing clinical terms into clear explanations so users can better understand their health information.

## Overview

CuraNova focuses on making medical reports easier to read by:
- translating technical report terms into plain language
- providing a simple and approachable user experience
- keeping the experience focused on clarity and privacy

## Features

- A homepage demo that shows how a report term is translated
- Dedicated pages for:
  - simplifying a report
  - understanding how the tool works
  - reviewing privacy information
- A clean, modern interface designed for non-technical users

## Project Structure

```text
CuraNova--BI/
├── index.html          # homepage layout
├── simplify.html       # page for simplifying a report
├── how.html            # explanation of how the tool works
├── privacy.html        # privacy information page
├── index.css           # styling for the website
├── index.js            # interactive homepage demo logic
├── server.js           # simple Express server to run the app locally
├── package.json        # project scripts and dependencies
└── README.md           # project documentation
```

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the application

```bash
npm start
```

Then open your browser and go to:

```text
http://localhost:3000
```

## Development Notes

- This project is a lightweight web app and does not require a database.
- It is designed for local use and simple demonstrations.
- The app is served using Express from the project root.

## License

ISC