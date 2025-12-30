"""
Backend API manager for Seal Movies
"""
from flask import Blueprint, jsonify, request
from .movie_data import (
    get_all_movies,
    get_movie_by_id,
    get_movies_by_category,
    get_categories,
    search_movies,
    get_recommendations,
    increment_views
)
import random

api = Blueprint('api', __name__)

@api.route('/api/movies', methods=['GET'])
def get_movies():
    """Get all movies with optional filtering"""
    category = request.args.get('category')
    
    if category:
        movies = get_movies_by_category(category)
    else:
        movies = get_all_movies()
    
    return jsonify({
        "success": True,
        "count": len(movies),
        "movies": movies
    })

@api.route('/api/movies/featured', methods=['GET'])
def get_featured_movies():
    """Get featured movies"""
    featured = get_movies_by_category("featured")
    return jsonify({
        "success": True,
        "movies": featured
    })

@api.route('/api/movies/<movie_id>', methods=['GET'])
def get_movie(movie_id):
    """Get specific movie by ID"""
    movie = get_movie_by_id(movie_id)
    if movie:
        return jsonify({
            "success": True,
            "movie": movie
        })
    return jsonify({
        "success": False,
        "error": "Movie not found"
    }), 404

@api.route('/api/movies/<movie_id>/watch', methods=['POST'])
def watch_movie(movie_id):
    """Increment view count when movie is watched"""
    if increment_views(movie_id):
        return jsonify({
            "success": True,
            "message": "View count updated"
        })
    return jsonify({
        "success": False,
        "error": "Movie not found"
    }), 404

@api.route('/api/movies/<movie_id>/recommendations', methods=['GET'])
def get_movie_recommendations(movie_id):
    """Get recommendations for a movie"""
    limit = request.args.get('limit', 4, type=int)
    recommendations = get_recommendations(movie_id, limit)
    return jsonify({
        "success": True,
        "recommendations": recommendations
    })

@api.route('/api/categories', methods=['GET'])
def get_all_categories():
    """Get all movie categories"""
    categories = get_categories()
    return jsonify({
        "success": True,
        "categories": categories
    })

@api.route('/api/search', methods=['GET'])
def search():
    """Search movies"""
    query = request.args.get('q', '')
    if not query:
        return jsonify({
            "success": False,
            "error": "Query parameter required"
        }), 400
    
    results = search_movies(query)
    return jsonify({
        "success": True,
        "query": query,
        "count": len(results),
        "results": results
    })

@api.route('/api/trending', methods=['GET'])
def get_trending():
    """Get trending movies (based on views)"""
    all_movies = get_all_movies()
    trending = sorted(all_movies, key=lambda x: x['views'], reverse=True)[:6]
    return jsonify({
        "success": True,
        "movies": trending
    })

@api.route('/api/random', methods=['GET'])
def get_random_movie():
    """Get a random movie"""
    all_movies = get_all_movies()
    if all_movies:
        random_movie = random.choice(all_movies)
        return jsonify({
            "success": True,
            "movie": random_movie
        })
    return jsonify({
        "success": False,
        "error": "No movies available"
    }), 404
