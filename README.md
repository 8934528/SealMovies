# Seal Movies - Free Streaming Platform

![Seal Movies Logo](https://img.shields.io/badge/Seal-Movies-red)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-2.0+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

Seal Movies is a unique, free movie streaming platform inspired by YouTube's simplicity, Netflix's design, and Goojara's content accessibility. No subscriptions, no credit cards required.

---

## Features

**Free Streaming**: Watch thousands of movies completely free
**Modern UI**: Clean, dark-themed interface with unique color scheme
**Smart Search**: Search by title, genre, cast, or director
**Responsive Design**: Works on all devices
**Instant Play**: No buffering, start watching immediately
**No Database**: Simple in-memory storage system
**Demo Authentication**: User system for demo purposes

---

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd SealMovies

2. Install backend dependencies:

    ```bash
    pip install -r requirements.txt

3. Run the application:

    ```bash
    python app.py

4. Open browser and navigate to:

    ```bash
    http://localhost:5000

---

## Project Structure

    SealMovies/
    │
    ├── backend/
    │   ├── __init__.py
    │   ├── manager.py
    │   └── movie_data.py
    │
    ├── frontend/
    │   ├── assets/
    │   │   ├── images/
    │   │   │   ├── seal-logo.png
    │   │   │   ├── placeholder-poster.jpg
    │   │   │   └── user-avatar.png
    │   │   └── fonts/
    │   │
    │   ├── index.html
    │   ├── home.html
    │   ├── player.html
    │   ├── categories.html
    │   ├── style.css
    │   ├── script.js
    │   └── auth.js
    │
    ├── app.py
    ├── requirements.txt
    └── README.md

---

## API Endpoints

| Method | Endpoint                                   | Description                     |
|--------|--------------------------------------------|---------------------------------|
| GET    | /api/movies                                | Get all movies                  |
| GET    | /api/movies/featured                       | Get featured movies             |
| GET    | /api/movies/{id}                           | Get specific movie              |
| GET    | /api/movies/{id}/recommendations           | Get movie recommendations       |
| GET    | /api/categories                            | Get all categories              |
| GET    | /api/search?q={query}                      | Search movies                   |
| GET    | /api/trending                              | Get trending movies             |
| GET    | /api/random                                | Get random movie                |
| POST   | /api/movies/{id}/watch                     | Increment view count            |

---

## Pages

- Landing Page **(/)**: Welcome screen with features showcase
- Home Page **(/home)**: Main browsing interface
- Player Page **(/player/{id})**: Movie player with controls
- Categories Page **(/categories)**: Browse by category

## Keyboard Shortcuts

- **/** - Focus search
- **Space** - Play/pause video
- **F** - Toggle fullscreen
- **Enter** - Submit search/form

---

## Backend

- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing
- Python 3.8+ - Programming language

## Frontend

- HTML5 - Markup
- CSS3 - Styling with custom properties
- JavaScript (ES6+) - Client-side scripting
- Font Awesome - Icons
- Google Fonts - Typography

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## Disclaimer

This is a demonstration project for educational purposes. The movie data and streaming URLs are for demonstration only. Please respect copyright laws and only stream content you have the rights to.

---
