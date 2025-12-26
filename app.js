// MEDSphere Campus Community - Fixed Navigation

document.addEventListener('DOMContentLoaded', function() {
    console.log('MEDSphere Campus Community Loaded');
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-content') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // 1. Navigation Links - Smooth Scroll to Sections
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active to clicked link
                this.classList.add('active');
                
                // Find target section
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate scroll position
                    const headerHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    console.log('Navigated to:', targetId);
                }
            }
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // 2. Get Started Button - Go to Events Section
    const getStartedBtn = document.querySelector('.btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find events section
            const eventsSection = document.querySelector('#events');
            if (eventsSection) {
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const eventsLink = document.querySelector('a[href="#events"]');
                if (eventsLink) eventsLink.classList.add('active');
                
                // Smooth scroll to events
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = eventsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Get Started clicked - Scrolled to Events');
            }
        });
    }
    

    
    // 4. Feature Cards Navigation
    const discoverEventsCard = document.querySelector('.discover-events');
    const campusUpdatesCard = document.querySelector('.campus-updates');
    
    if (discoverEventsCard) {
        discoverEventsCard.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to events section
            const eventsSection = document.querySelector('#events');
            if (eventsSection) {
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const eventsLink = document.querySelector('a[href="#events"]');
                if (eventsLink) eventsLink.classList.add('active');
                
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = eventsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Discover Events clicked - Scrolled to Events');
            }
        });
    }
    
    if (campusUpdatesCard) {
        campusUpdatesCard.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to blogs section
            const blogsSection = document.querySelector('#blogs');
            if (blogsSection) {
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const blogsLink = document.querySelector('a[href="#blogs"]');
                if (blogsLink) blogsLink.classList.add('active');
                
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = blogsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Campus Updates clicked - Scrolled to Blogs');
            }
        });
    }
    
    // 5. Event Cards - Make clickable
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.event-title').textContent;
            console.log('Event clicked:', title);
            
            // Show event details notification
            showNotification(`Event: ${title}<br><br>This would open full event details with RSVP option.`);
            
            // Animation
            this.style.transform = 'translateY(-5px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // 6. Blog Cards Interactions
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link inside
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const title = this.querySelector('.blog-title').textContent;
            console.log('Reading blog:', title);
            
            // Show blog details notification
            showNotification(`Blog: ${title}<br><br>This would open the full blog article.`);
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 200);
        });
    });
    
    // 7. View All Blogs Button
    const viewAllBlogsBtn = document.querySelector('.view-all-blogs');
    if (viewAllBlogsBtn) {
        viewAllBlogsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('This would show all blog posts in a paginated view.');
        });
    }
    
    // 8. Footer Quick Links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                // Find target section
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    const correspondingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                    if (correspondingNavLink) correspondingNavLink.classList.add('active');
                    
                    // Smooth scroll to target
                    const headerHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    console.log('Footer link clicked:', targetId);
                }
            }
        });
    });
    
    // 9. Social Links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split('fa-')[1];
            showNotification(`This would open our ${platform} page in a new tab.`);
        });
    });
    
    // 10. Update Current Year
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // 11. Video Modal Functionality
    const videoModal = document.querySelector('.video-modal');
    const videoClose = document.querySelector('.video-close');
    
    if (videoClose) {
        videoClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
            // Pause video when closing
            const iframe = videoModal.querySelector('iframe');
            iframe.src = iframe.src; // Reload to pause
        });
    }
    
    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                // Pause video when closing
                const iframe = this.querySelector('iframe');
                iframe.src = iframe.src; // Reload to pause
            }
        });
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const videoModal = document.querySelector('.video-modal');
            if (videoModal && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                const iframe = videoModal.querySelector('iframe');
                iframe.src = iframe.src; // Reload to pause
            }
        }
    });
    
    // 12. Update active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});

// Open Video Modal Function
function openVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.classList.add('active');
        console.log('Video modal opened');
    }
}

// Show Notification Function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <div class="notification-text">${message}</div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: #333;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid #3949ab;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 12px;
    `;
    
    content.querySelector('i').style.cssText = `
        color: #3949ab;
        font-size: 1.2rem;
        margin-top: 2px;
        flex-shrink: 0;
    `;
    
    content.querySelector('.notification-text').style.cssText = `
        flex-grow: 1;
        line-height: 1.5;
    `;
    
    const closeBtn = content.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 0;
        margin-left: 5px;
        flex-shrink: 0;
    `;
    
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}
