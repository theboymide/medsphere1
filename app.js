// Add this to your public website (themedsphere.vercel.app)
// Firebase Config (same as admin panel)
const firebaseConfig = {
    apiKey: "AIzaSyA8XaUNfLDq6PYJu-LC0y_5ClAkGNfrLaw",
    authDomain: "medsphere-c73e4.firebasestorage.app",
    databaseURL: "https://medsphere-c73e4-default-rtdb.firebaseio.com",
    projectId: "medsphere-c73e4",
    storageBucket: "medsphere-c73e4.firebasestorage.app",
    messagingSenderId: "289749352034",
    appId: "1:289749352034:web:57fb380ac94433148bdb3b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to load events on your public website
async function loadEventsOnWebsite() {
    try {
        const snapshot = await database.ref('events').once('value');
        const events = snapshot.val();
        
        if (!events) {
            console.log('No events found');
            return;
        }
        
        // Loop through events and display them
        Object.values(events).forEach(event => {
            // Create HTML for each event
            const eventHTML = `
                <div class="event-item">
                    <img src="${event.imageUrl}" alt="${event.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200/667eea/ffffff?text=EVENT'">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p>Time: ${new Date(event.time).toLocaleString()}</p>
                    ${event.contact ? `<p>Contact: ${event.contact}</p>` : ''}
                </div>
            `;
            
            // Add to your webpage
            document.getElementById('events-container').innerHTML += eventHTML;
        });
        
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Function to load brands on your public website
async function loadBrandsOnWebsite() {
    try {
        const snapshot = await database.ref('brands').once('value');
        const brands = snapshot.val();
        
        if (!brands) {
            console.log('No brands found');
            return;
        }
        
        // Loop through brands and display them
        Object.values(brands).forEach(brand => {
            // Create HTML for each brand
            const brandHTML = `
                <div class="brand-item">
                    <img src="${brand.imageUrl}" alt="${brand.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200/667eea/ffffff?text=BRAND'">
                    <h3>${brand.name}</h3>
                    <p>${brand.description}</p>
                    ${brand.prize ? `<p>Prize: ${brand.prize}</p>` : ''}
                    ${brand.contact ? `<p>Contact: ${brand.contact}</p>` : ''}
                    ${brand.location ? `<p>Location: ${brand.location}</p>` : ''}
                </div>
            `;
            
            // Add to your webpage
            document.getElementById('brands-container').innerHTML += brandHTML;
        });
        
    } catch (error) {
        console.error('Error loading brands:', error);
    }
}

// Call these functions when your website loads
document.addEventListener('DOMContentLoaded', function() {
    loadEventsOnWebsite();
    loadBrandsOnWebsite();
});


// ======================
// DATA SYNC FUNCTIONS
// ======================

async function syncFromSupabase() {
    try {
        if (!supabase) {
            console.warn('Supabase not available, using localStorage only');
            return false;
        }

        console.log('🔄 Syncing from Supabase...');
        
        // Load events from Supabase
        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });
        
        // Load brands from Supabase
        const { data: brands, error: brandsError } = await supabase
            .from('brands')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (eventsError) console.error('Events sync error:', eventsError);
        if (brandsError) console.error('Brands sync error:', brandsError);
        
        // Update localStorage with Supabase data
        if (events) {
            localStorage.setItem('campus_events', JSON.stringify(events));
            console.log(`✅ Synced ${events.length} events`);
        }
        
        if (brands) {
            localStorage.setItem('medsphere_brands', JSON.stringify(brands));
            console.log(`✅ Synced ${brands.length} brands`);
            
            // Update brands display immediately
            if (window.brandManager) {
                window.brandManager.displayBrands();
            }
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Supabase sync failed:', error);
        return false;
    }
}

// ======================
// BRANDS MANAGEMENT SYSTEM (UPDATED)
// ======================

class BrandManager {
    constructor() {
        this.brandsKey = 'medsphere_brands';
        this.init();
    }
    
    async init() {
        // First try to sync from Supabase
        const syncSuccess = await syncFromSupabase();
        
        // If no data in localStorage after sync, use samples
        if (!localStorage.getItem(this.brandsKey)) {
            const sampleBrands = [
                {
                    id: 1,
                    name: "Campus Food Hub",
                    category: "Food & Drinks",
                    price: "₦500 - ₦3,000",
                    info: "Delicious meals delivered to your hostel. Breakfast, lunch, and dinner available.",
                    location: "Near Main Gate",
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
                    featured: true
                },
                {
                    id: 2,
                    name: "Study Buddy Tutors",
                    category: "Education",
                    price: "₦2,000/hour",
                    info: "Professional tutoring for all courses. Group discounts available.",
                    location: "Online & Library",
                    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
                    featured: true
                },
                {
                    id: 3,
                    name: "Dorm Essentials",
                    category: "Shopping",
                    price: "₦1,500 - ₦15,000",
                    info: "Everything you need for your dorm room. Delivery in 2 hours.",
                    location: "Student Mall",
                    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
                    featured: false
                }
            ];
            localStorage.setItem(this.brandsKey, JSON.stringify(sampleBrands));
        }
    }
    
    getAllBrands() {
        return JSON.parse(localStorage.getItem(this.brandsKey) || '[]');
    }
    
    getFeaturedBrands() {
        const brands = this.getAllBrands();
        return brands.filter(brand => brand.featured);
    }
    
    addBrand(brand) {
        const brands = this.getAllBrands();
        brand.id = Date.now();
        brand.featured = true;
        brands.push(brand);
        localStorage.setItem(this.brandsKey, JSON.stringify(brands));
        this.displayBrands();
    }
    
    displayBrands() {
        const brands = this.getAllBrands();
        const container = document.getElementById('brandsGrid');
        
        if (!container) return;
        
        if (brands.length === 0) {
            container.innerHTML = `
                <div class="no-brands">
                    <div style="font-size: 60px; margin-bottom: 20px;">🏪</div>
                    <h3>No Sponsored Brands Yet</h3>
                    <p>Be the first to promote your business!</p>
                    <a href="https://wa.me/message/ASKFQBQND5AHJ1" class="whatsapp-btn" style="margin-top: 20px;">
                        <span>💬</span> Contact to Feature Your Business
                    </a>
                </div>
            `;
            return;
        }
        
        container.innerHTML = brands.map(brand => `
            <div class="brand-card ${brand.featured ? 'featured' : ''}">
                <div class="brand-image">
                    <img src="${brand.image}" alt="${brand.name}" onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=${encodeURIComponent(brand.name)}'">
                </div>
                <div class="brand-content">
                    <div class="brand-category">${brand.category}</div>
                    <h3 class="brand-name">${brand.name}</h3>
                    <div class="brand-price">${brand.price}</div>
                    <p class="brand-info">${brand.info}</p>
                    <div class="brand-location">${brand.location}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Admin functions
    removeBrand(id) {
        const brands = this.getAllBrands();
        const filtered = brands.filter(brand => brand.id !== id);
        localStorage.setItem(this.brandsKey, JSON.stringify(filtered));
        this.displayBrands();
    }
    
    clearAllBrands() {
        if (confirm('Remove all sponsored brands?')) {
            localStorage.removeItem(this.brandsKey);
            this.displayBrands();
        }
    }
}

// ======================
// EVENTS MANAGEMENT
// ======================

async function loadAndDisplayEvents() {
    try {
        // First try to get from Supabase
        if (supabase) {
            const { data: events } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true });
            
            if (events && events.length > 0) {
                localStorage.setItem('campus_events', JSON.stringify(events));
                console.log(`✅ Loaded ${events.length} events from Supabase`);
            }
        }
        
        // Get events from localStorage (either from Supabase or existing)
        const events = JSON.parse(localStorage.getItem('campus_events') || '[]');
        
        // If you have an events container, display them
        const eventsContainer = document.getElementById('eventsContainer');
        if (eventsContainer && events.length > 0) {
            eventsContainer.innerHTML = events.map(event => `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p>${event.description || 'No description'}</p>
                    <small>📅 ${event.date} | 📍 ${event.location}</small>
                </div>
            `).join('');
        }
        
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// ======================
// LIVE CHAT INTEGRATION (Your existing code)
// ======================

class LiveChat {
    constructor() {
        this.initChat();
    }

    initChat() {
        console.log('Live Chat system initialized');
    }

    async registerUser(userData) {
        try {
            console.log('Registering user:', userData);
            await new Promise(resolve => setTimeout(resolve, 1000));
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

    async joinChatRoom(roomId, userId) {
        try {
            console.log(`User ${userId} joining room ${roomId}`);
            return { success: true, roomId };
        } catch (error) {
            console.error('Join room error:', error);
            return { success: false, error: error.message };
        }
    }
}

// ======================
// MAIN INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Starting campus website...');
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Load data from Supabase
    await syncFromSupabase();
    
    // Initialize and display brands
    window.brandManager = new BrandManager();
    window.brandManager.displayBrands();
    
    // Load and display events
    await loadAndDisplayEvents();
    
    // Initialize live chat system
    const liveChat = new LiveChat();
    
    // Setup chat room click handlers
    setupChatRooms(liveChat);
    
    // Setup event registration
    setupEventRegistration();
    
    // Setup animations
    initAnimations();
    
    // Auto-sync every 30 seconds
    setInterval(syncFromSupabase, 30000);
    
    console.log('✅ Website fully loaded with Supabase sync');
});

// ======================
// EXISTING FUNCTIONS (Keep all your original code below)
// ======================

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
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
    const chatLinks = document.querySelectorAll('a[href*="chat.html"]');
    chatLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard?.querySelector('.event-title')?.textContent || 'Event';
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
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
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
    
    const modal = document.getElementById('eventModal');
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });
    
    const form = document.getElementById('eventRegistrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        setTimeout(() => {
            modal.remove();
            modalStyle.remove();
            alert(`✅ Successfully registered for "${eventTitle}"!\nConfirmation will be sent to ${email}`);
        }, 1000);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            modalStyle.remove();
        }
    });
}

// Initialize Animations
function initAnimations() {
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
    
    document.querySelectorAll('.event-card, .stat, .feature, .benefit, .method').forEach(el => {
        observer.observe(el);
    });
}

// Export for use in chat.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LiveChat };
}

// Admin functions (for you to manage brands)
window.addNewBrand = function() {
    const newBrand = {
        name: prompt("Business Name:"),
        category: prompt("Category:"),
        price: prompt("Price Range:"),
        info: prompt("Description:"),
        location: prompt("Location:"),
        image: prompt("Image URL (optional):")
    };
    
    if (newBrand.name && newBrand.category && newBrand.price) {
        window.brandManager.addBrand(newBrand);
        alert('Brand added successfully!');
    }
};

window.clearAllBrands = function() {
    window.brandManager.clearAllBrands();
};