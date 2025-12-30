"""
Movie data storage and management
No database - using in-memory storage
"""

# Sample movie data
movies = {
    "movies": [
        {
            "id": "1",
            "title": "The Midnight Ocean",
            "description": "A thrilling adventure about deep-sea explorers discovering ancient secrets.",
            "year": "2023",
            "genre": ["Adventure", "Sci-Fi", "Thriller"],
            "duration": "2h 18m",
            "rating": "8.2/10",
            "poster": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "views": 1254300,
            "upload_date": "2023-10-15",
            "director": "Alex Rivera",
            "cast": ["Emma Stone", "Michael B. Jordan", "Zendaya"],
            "category": "featured"
        },
        {
            "id": "2",
            "title": "Echoes of Silence",
            "description": "A psychological drama about a musician losing her hearing.",
            "year": "2022",
            "genre": ["Drama", "Music"],
            "duration": "1h 45m",
            "rating": "7.8/10",
            "poster": "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "views": 892100,
            "upload_date": "2022-08-22",
            "director": "Sophia Chen",
            "cast": ["Anya Taylor-Joy", "Riz Ahmed"],
            "category": "drama"
        },
        {
            "id": "3",
            "title": "Quantum Heist",
            "description": "A team of physicists plan the ultimate bank robbery using quantum physics.",
            "year": "2024",
            "genre": ["Action", "Sci-Fi", "Crime"],
            "duration": "2h 5m",
            "rating": "8.5/10",
            "poster": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "views": 2105600,
            "upload_date": "2024-01-10",
            "director": "James Cameron",
            "cast": ["John David Washington", "Robert Pattinson", "Elizabeth Debicki"],
            "category": "action"
        },
        {
            "id": "4",
            "title": "Whispers in the Fog",
            "description": "Mystery thriller set in a remote Scottish island.",
            "year": "2023",
            "genre": ["Mystery", "Thriller"],
            "duration": "1h 52m",
            "rating": "7.9/10",
            "poster": "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "views": 956700,
            "upload_date": "2023-11-05",
            "director": "Jane Smith",
            "cast": ["Florence Pugh", "Benedict Cumberbatch"],
            "category": "thriller"
        },
        {
            "id": "5",
            "title": "Solar Flare",
            "description": "A race against time to save Earth from a massive solar storm.",
            "year": "2023",
            "genre": ["Sci-Fi", "Disaster"],
            "duration": "2h 10m",
            "rating": "7.5/10",
            "poster": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "views": 1543200,
            "upload_date": "2023-09-18",
            "director": "Michael Bay",
            "cast": ["Chris Pratt", "Jennifer Lawrence", "Idris Elba"],
            "category": "sci-fi"
        },
        {
            "id": "6",
            "title": "The Last Laugh",
            "description": "A stand-up comedian's journey through failure and redemption.",
            "year": "2022",
            "genre": ["Comedy", "Drama"],
            "duration": "1h 48m",
            "rating": "8.0/10",
            "poster": "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            "views": 743200,
            "upload_date": "2022-12-03",
            "director": "Taika Waititi",
            "cast": ["Kumail Nanjiani", "Issa Rae"],
            "category": "comedy"
        },
        {
            "id": "7",
            "title": "Arctic Dreams",
            "description": "Documentary about wildlife in the Arctic circle.",
            "year": "2023",
            "genre": ["Documentary", "Nature"],
            "duration": "1h 35m",
            "rating": "8.7/10",
            "poster": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "views": 521300,
            "upload_date": "2023-06-20",
            "director": "David Attenborough",
            "cast": [],
            "category": "documentary"
        },
        {
            "id": "8",
            "title": "Neon Nights",
            "description": "Cyberpunk thriller in a futuristic Tokyo.",
            "year": "2024",
            "genre": ["Action", "Sci-Fi", "Cyberpunk"],
            "duration": "2h 2m",
            "rating": "8.3/10",
            "poster": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "stream_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            "views": 1890400,
            "upload_date": "2024-02-14",
            "director": "Denis Villeneuve",
            "cast": ["Ryan Gosling", "Ana de Armas", "Steven Yeun"],
            "category": "featured"
        }
    ],
    "categories": [
        {"id": "featured", "name": "Featured", "color": "#fd5c63"},
        {"id": "action", "name": "Action", "color": "#ACE1AF"},
        {"id": "drama", "name": "Drama", "color": "#4D5D53"},
        {"id": "comedy", "name": "Comedy", "color": "#fd5c63"},
        {"id": "sci-fi", "name": "Sci-Fi", "color": "#ACE1AF"},
        {"id": "thriller", "name": "Thriller", "color": "#4D5D53"},
        {"id": "documentary", "name": "Documentary", "color": "#fd5c63"}
    ]
}

def get_all_movies():
    """Return all movies"""
    return movies["movies"]

def get_movie_by_id(movie_id):
    """Get movie by ID"""
    for movie in movies["movies"]:
        if movie["id"] == movie_id:
            return movie
    return None

def get_movies_by_category(category):
    """Get movies by category"""
    return [movie for movie in movies["movies"] if category in movie["category"]]

def get_categories():
    """Get all categories"""
    return movies["categories"]

def search_movies(query):
    """Search movies by title, genre, or cast"""
    query = query.lower()
    results = []
    
    for movie in movies["movies"]:
        if (query in movie["title"].lower() or
            any(query in genre.lower() for genre in movie["genre"]) or
            any(query in actor.lower() for actor in movie["cast"])):
            results.append(movie)
    
    return results

def get_recommendations(movie_id, limit=4):
    """Get movie recommendations based on genre"""
    target_movie = get_movie_by_id(movie_id)
    if not target_movie:
        return []
    
    recommendations = []
    for movie in movies["movies"]:
        if movie["id"] != movie_id:
            # Find movies with similar genres
            common_genres = set(movie["genre"]) & set(target_movie["genre"])
            if common_genres:
                recommendations.append(movie)
    
    return recommendations[:limit]

def increment_views(movie_id):
    """Increment movie views"""
    for movie in movies["movies"]:
        if movie["id"] == movie_id:
            movie["views"] += 1
            return True
    return False
