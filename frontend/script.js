const AppState = {
    currentUser: null,
    favorites: [],
    watchHistory: [],
    theme: 'dark'
};

// DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize
function initializeApp() {
    const savedTheme = localStorage.getItem('seal-theme');
    if (savedTheme) {
        AppState.theme = savedTheme;
        document.body.classList.toggle('light-theme', savedTheme === 'light');
    }
    
    loadUserData();
}

function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
    
    const quickSearch = document.querySelectorAll('.quick-search');
    quickSearch.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performQuickSearch(this.value);
            }
        });
    });
}

// Theme 
function toggleTheme() {
    AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme');
    localStorage.setItem('seal-theme', AppState.theme);
}

// User 
function loadUserData() {
    const savedData = localStorage.getItem('seal-user');
    if (savedData) {
        try {
            AppState.currentUser = JSON.parse(savedData);
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    }
}

function saveUserData() {
    if (AppState.currentUser) {
        localStorage.setItem('seal-user', JSON.stringify(AppState.currentUser));
    }
}

// Search 
function performQuickSearch(query) {
    if (query && query.trim()) {
        window.location.href = `/categories?search=${encodeURIComponent(query.trim())}`;
    }
}

// Movie 
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

// Notification 
function showNotifications() {
    const notifications = [
        { id: 1, title: 'New Movie Added', message: 'Quantum Heist is now available', time: '2 hours ago' },
        { id: 2, title: 'Weekly Digest', message: 'Check out new releases this week', time: '1 day ago' },
        { id: 3, title: 'Welcome to Seal', message: 'Start watching free movies now', time: '2 days ago' }
    ];
    
    alert(`You have ${notifications.length} notifications\n\n` + 
          notifications.map(n => `• ${n.title}: ${n.message}`).join('\n'));
}

function addToFavorites(movieId) {
    if (!AppState.favorites.includes(movieId)) {
        AppState.favorites.push(movieId);
        localStorage.setItem('seal-favorites', JSON.stringify(AppState.favorites));
        showToast('Added to favorites');
    }
}

function removeFromFavorites(movieId) {
    const index = AppState.favorites.indexOf(movieId);
    if (index > -1) {
        AppState.favorites.splice(index, 1);
        localStorage.setItem('seal-favorites', JSON.stringify(AppState.favorites));
        showToast('Removed from favorites');
    }
}

function addToWatchHistory(movieId) {
    const history = AppState.watchHistory.filter(id => id !== movieId);
    history.unshift(movieId);
    AppState.watchHistory = history.slice(0, 50); // Keep last 50 items
    localStorage.setItem('seal-history', JSON.stringify(AppState.watchHistory));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'global-loading';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    loading.innerHTML = `
        <div class="spinner">
            <i class="fas fa-spinner fa-spin fa-3x" style="color: #fd5c63;"></i>
        </div>
    `;
    
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('global-loading');
    if (loading) {
        loading.remove();
    }
}

// API Helper 
async function fetchWithLoading(url, options = {}) {
    showLoading();
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        showToast('An error occurred. Please try again.', 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

// Shortcuts
document.addEventListener('keydown', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        switch(e.key) {
            case '/':
                e.preventDefault();
                const searchInput = document.querySelector('.nav-search input, #searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
                break;
            case ' ':
                const videoPlayer = document.querySelector('video');
                if (videoPlayer && document.activeElement !== videoPlayer) {
                    e.preventDefault();
                    if (videoPlayer.paused) {
                        videoPlayer.play();
                    } else {
                        videoPlayer.pause();
                    }
                }
                break;
            case 'f':
                const fullscreenElem = document.fullscreenElement || 
                                     document.webkitFullscreenElement ||
                                     document.mozFullScreenElement;
                if (!fullscreenElem) {
                    const video = document.querySelector('video');
                    if (video) {
                        if (video.requestFullscreen) {
                            video.requestFullscreen();
                        } else if (video.webkitRequestFullscreen) {
                            video.webkitRequestFullscreen();
                        } else if (video.mozRequestFullScreen) {
                            video.mozRequestFullScreen();
                        }
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    }
                }
                break;
        }
    }
});

// CSS toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .light-theme {
        background: #f5f5f5;
        color: #333;
    }
    
    .light-theme .movie-card,
    .light-theme .category-card,
    .light-theme .recommendation-card {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .light-theme .nav-search input {
        background: #fff;
        color: #333;
    }
`;
document.head.appendChild(style);
