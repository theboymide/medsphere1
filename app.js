// Live Chat Integration with Firebase (Example)
// Note: For a real implementation, you would need to set up Firebase

class LiveChat {
    constructor() {
        // Initialize chat system
        this.initChat();
    }

    initChat() {
        console.log('Live Chat system initialized');
        
        // Initialize Firebase (Example - you would replace with your config)
        /*
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        */
    }

    // User registration for chat
    async registerUser(userData) {
        try {
            // For demo purposes - in real app, this would connect to Firebase
            console.log('Registering user:', userData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Return mock user data
            return {
                success: true,
                userId: 'user_' + Date.now(),
                username: userData.username,
                message: 'Account created successfully!'
            };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // Join chat room
    async joinChatRoom(roomId, userId) {
        try {
            console.log(`User ${userId} joining room ${roomId}`);
            
            // In real app: Add user to Firebase room document
            return { success: true, roomId };
        } catch (error) {
            console.error('Join room error:', error);
            return { success: false, error: error.message };
        }
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize live chat system
    const liveChat = new LiveChat();
    
    // Setup chat room click handlers
    setupChatRooms(liveChat);
    
    // Setup event registration
    setupEventRegistration();
    
    // Setup animations
    initAnimations();
});

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
}

// Setup Chat Room Interactions
function setupChatRooms(liveChat) {
    // This would connect to the chat.html page
    // For homepage, just handle the navigation
    const chatLinks = document.querySelectorAll('a[href*="chat.html"]');
    
    chatLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For demo - in real app this would check login status
            console.log('Navigating to chat system');
        });
    });
}

// Event Registration
function setupEventRegistration() {
    const eventButtons = document.querySelectorAll('.event-action, .event-btn');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get event details
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            // Show registration modal
            showEventRegistrationModal(eventTitle);
        });
    });
}

// Show Event Registration Modal
function showEventRegistrationModal(eventTitle) {
    const modalHTML = `
        <div class="modal-overlay" id="eventModal">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Register for Event</h3>
                <p>You're registering for: <strong>${eventTitle}</strong></p>
                
                <form id="eventRegistrationForm">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" required placeholder="your.email@campus.edu">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" required placeholder="+234 800 000 0000">
                    </div>
                    
                    <button type="submit" class="modal-submit">
                        <i class="fas fa-check-circle"></i> Confirm Registration
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        
        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #666;
        }
        
        .modal-content h3 {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: var(--primary);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--dark);
        }
        
        .form-group input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            transition: var(--transition);
        }
        
        .form-group input:focus {
            border-color: var(--primary);
            outline: none;
        }
        
        .modal-submit {
            width: 100%;
            padding: 18px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            transition: var(--transition);
        }
        
        .modal-submit:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(67, 97, 238, 0.3);
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Handle modal close
    const modal = document.getElementById('eventModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });
    
    // Handle form submission
    const form = document.getElementById('eventRegistrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Simulate API call
        setTimeout(() => {
            modal.remove();
            modalStyle.remove();
            
            // Show success message
            alert(`✅ Successfully registered for "${eventTitle}"!\nConfirmation will be sent to ${email}`);
        }, 1000);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            modalStyle.remove();
        }
    });
}

// Initialize Animations
function initAnimations() {
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.event-card, .stat, .feature, .benefit, .method').forEach(el => {
        observer.observe(el);
    });
}

// Export for use in chat.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LiveChat };
}
