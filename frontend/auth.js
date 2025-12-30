const Auth = {
    currentUser: null,
    isAuthenticated: false,
    
    init() {
        this.loadSession();
        this.setupAuthUI();
    },
    
    loadSession() {
        const userData = localStorage.getItem('seal-auth');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
            } catch (e) {
                console.error('Error loading auth session:', e);
                this.clearSession();
            }
        }
    },
    
    saveSession(user) {
        this.currentUser = user;
        this.isAuthenticated = true;
        localStorage.setItem('seal-auth', JSON.stringify(user));
        this.updateAuthUI();
    },
    
    clearSession() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('seal-auth');
        this.updateAuthUI();
    },
    
    setupAuthUI() {
        this.createAuthModal();        
        this.addAuthButton();
        this.updateAuthUI();
    },
    
    createAuthModal() {
        const modalHTML = `
            <div id="authModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Welcome to Seal Movies</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="auth-tabs">
                            <button class="tab active" data-tab="login">Login</button>
                            <button class="tab" data-tab="register">Register</button>
                        </div>
                        
                        <div id="loginForm" class="auth-form active">
                            <div class="form-group">
                                <input type="text" id="loginUsername" placeholder="Username or Email">
                            </div>
                            <div class="form-group">
                                <input type="password" id="loginPassword" placeholder="Password">
                            </div>
                            <button id="loginBtn" class="auth-btn">Login</button>
                            <p class="auth-note">Demo: Use any credentials</p>
                        </div>
                        
                        <div id="registerForm" class="auth-form">
                            <div class="form-group">
                                <input type="text" id="registerUsername" placeholder="Choose Username">
                            </div>
                            <div class="form-group">
                                <input type="email" id="registerEmail" placeholder="Email Address">
                            </div>
                            <div class="form-group">
                                <input type="password" id="registerPassword" placeholder="Create Password">
                            </div>
                            <button id="registerBtn" class="auth-btn">Create Account</button>
                            <p class="auth-note">No real registration required for demo</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('authModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.setupModalEvents();
        }
    },
    
    setupModalEvents() {
        const modal = document.getElementById('authModal');
        const closeBtn = modal.querySelector('.close-modal');
        const tabs = modal.querySelectorAll('.tab');
        const forms = modal.querySelectorAll('.auth-form');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        
        closeBtn.addEventListener('click', () => this.hideModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.hideModal();
        });
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                forms.forEach(form => form.classList.remove('active'));
                document.getElementById(`${tabName}Form`).classList.add('active');
            });
        });
        
        // Login
        loginBtn.addEventListener('click', () => {
            const username = document.getElementById('loginUsername').value || 'Demo User';
            this.login({ username, isDemo: true });
        });
        
        // Register
        registerBtn.addEventListener('click', () => {
            const username = document.getElementById('registerUsername').value || 'New User';
            const email = document.getElementById('registerEmail').value || 'user@example.com';
            this.register({ username, email, isDemo: true });
        });
        
        document.getElementById('loginUsername').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') loginBtn.click();
        });
        
        document.getElementById('loginPassword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') loginBtn.click();
        });
        
        document.getElementById('registerUsername').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') registerBtn.click();
        });
        
        document.getElementById('registerPassword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') registerBtn.click();
        });
    },
    
    addAuthButton() {
        if (document.getElementById('authButton')) return;
        
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            const authButton = document.createElement('div');
            authButton.id = 'authButton';
            authButton.innerHTML = `
                <button class="auth-action-btn">
                    <i class="fas fa-user-circle"></i>
                    <span>Login</span>
                </button>
            `;
            userMenu.parentNode.replaceChild(authButton, userMenu);
            
            authButton.addEventListener('click', () => {
                if (this.isAuthenticated) {
                    this.showProfileMenu();
                } else {
                    this.showModal();
                }
            });
        }
    },
    
    updateAuthUI() {
        const authButton = document.getElementById('authButton');
        if (authButton) {
            if (this.isAuthenticated) {
                authButton.querySelector('span').textContent = this.currentUser.username;
                authButton.querySelector('i').className = 'fas fa-user-check';
            } else {
                authButton.querySelector('span').textContent = 'Login';
                authButton.querySelector('i').className = 'fas fa-user-circle';
            }
        }
    },
    
    showModal() {
        const modal = document.getElementById('authModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },
    
    hideModal() {
        const modal = document.getElementById('authModal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        modal.querySelectorAll('input').forEach(input => input.value = '');
    },
    
    login(userData) {
        this.saveSession({
            id: 'demo-' + Date.now(),
            username: userData.username,
            email: userData.email || 'demo@example.com',
            joined: new Date().toISOString(),
            isDemo: true
        });
        
        this.hideModal();
        this.showToast(`Welcome back, ${userData.username}!`);
    },
    
    register(userData) {
        this.saveSession({
            id: 'user-' + Date.now(),
            username: userData.username,
            email: userData.email,
            joined: new Date().toISOString(),
            isDemo: true
        });
        
        this.hideModal();
        this.showToast(`Account created! Welcome, ${userData.username}!`);
    },
    
    logout() {
        this.clearSession();
        this.showToast('Logged out successfully');
    },
    
    showProfileMenu() {
        const menu = document.createElement('div');
        menu.className = 'profile-menu';
        menu.style.cssText = `
            position: absolute;
            right: 20px;
            top: 60px;
            background: #1a1a1a;
            border: 1px solid #4D5D53;
            border-radius: 8px;
            padding: 1rem;
            min-width: 200px;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        menu.innerHTML = `
            <div class="profile-header">
                <i class="fas fa-user-circle fa-2x"></i>
                <div>
                    <h4>${this.currentUser.username}</h4>
                    <p>${this.currentUser.email}</p>
                </div>
            </div>
            <div class="profile-stats">
                <div class="stat">
                    <span class="label">Member Since</span>
                    <span class="value">${new Date(this.currentUser.joined).toLocaleDateString()}</span>
                </div>
                <div class="stat">
                    <span class="label">Account Type</span>
                    <span class="value">${this.currentUser.isDemo ? 'Demo' : 'Free'}</span>
                </div>
            </div>
            <div class="profile-actions">
                <button class="profile-action-btn">
                    <i class="fas fa-history"></i>
                    Watch History
                </button>
                <button class="profile-action-btn">
                    <i class="fas fa-heart"></i>
                    Favorites
                </button>
                <button class="profile-action-btn">
                    <i class="fas fa-cog"></i>
                    Settings
                </button>
                <button id="logoutBtn" class="profile-action-btn logout">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target) && e.target.id !== 'authButton') {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 0);
        
        menu.querySelector('#logoutBtn').addEventListener('click', () => {
            this.logout();
            menu.remove();
        });
        
        menu.querySelectorAll('.profile-action-btn:not(.logout)').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showToast('Feature coming soon!');
            });
        });
    },
    
    showToast(message) {
        if (typeof showToast === 'function') {
            showToast(message, 'success');
        } else {
            alert(message);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

const authStyles = document.createElement('style');
authStyles.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        background: #1a1a1a;
        border-radius: 12px;
        width: 90%;
        max-width: 400px;
        border: 1px solid #4D5D53;
        overflow: hidden;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: rgba(77, 93, 83, 0.2);
        border-bottom: 1px solid #4D5D53;
    }
    
    .modal-header h2 {
        font-size: 1.5rem;
        color: #ACE1AF;
    }
    
    .close-modal {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .auth-tabs {
        display: flex;
        margin-bottom: 1.5rem;
        background: rgba(77, 93, 83, 0.1);
        border-radius: 8px;
        padding: 4px;
    }
    
    .tab {
        flex: 1;
        padding: 0.8rem;
        background: none;
        border: none;
        color: #b0b0b0;
        cursor: pointer;
        border-radius: 6px;
        font-weight: 500;
    }
    
    .tab.active {
        background: #fd5c63;
        color: white;
    }
    
    .auth-form {
        display: none;
    }
    
    .auth-form.active {
        display: block;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group input {
        width: 100%;
        padding: 0.8rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #4D5D53;
        border-radius: 6px;
        color: white;
        font-size: 1rem;
    }
    
    .form-group input:focus {
        outline: none;
        border-color: #ACE1AF;
    }
    
    .auth-btn {
        width: 100%;
        padding: 1rem;
        background: #fd5c63;
        border: none;
        border-radius: 6px;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .auth-note {
        text-align: center;
        color: #b0b0b0;
        font-size: 0.9rem;
        margin-top: 1rem;
    }
    
    .auth-action-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(172, 225, 175, 0.2);
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .profile-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #4D5D53;
    }
    
    .profile-header i {
        color: #ACE1AF;
    }
    
    .profile-header h4 {
        font-size: 1.1rem;
        margin-bottom: 0.2rem;
    }
    
    .profile-header p {
        color: #b0b0b0;
        font-size: 0.9rem;
    }
    
    .profile-stats {
        margin-bottom: 1rem;
    }
    
    .stat {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .stat .label {
        color: #b0b0b0;
    }
    
    .stat .value {
        color: #ACE1AF;
        font-weight: 500;
    }
    
    .profile-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .profile-action-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.8rem;
        background: rgba(77, 93, 83, 0.2);
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        text-align: left;
        font-size: 0.9rem;
    }
    
    .profile-action-btn:hover {
        background: rgba(77, 93, 83, 0.4);
    }
    
    .profile-action-btn.logout {
        background: rgba(253, 92, 99, 0.2);
        color: #fd5c63;
        margin-top: 0.5rem;
    }
    
    .profile-action-btn.logout:hover {
        background: rgba(253, 92, 99, 0.3);
    }
`;
document.head.appendChild(authStyles);
