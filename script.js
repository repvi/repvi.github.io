// ===================================
// Portfolio Website JavaScript
// Interactive Features and Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && menu.classList.contains('active')) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Header Background on Scroll
    // ===================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 14, 39, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ===================================
    // Active Navigation Highlight
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.links[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary-color)';
                } else {
                    navLink.style.color = 'var(--text-primary)';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call on page load
    
    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and project items
    const animatedElements = document.querySelectorAll('.my-card, .project-card, .details');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // ===================================
    // Contact Form Handling with Formspree
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show sending notification
            showNotification('Sending your message...', 'info');
            
            // Send form data to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            showNotification(data.errors.map(error => error.message).join(', '), 'error');
                        } else {
                            showNotification('Oops! There was a problem sending your message.', 'error');
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Oops! There was a problem sending your message. Please try again.', 'error');
            });
        });
    }
    
    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add animation styles for notification
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
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
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // Typing Effect for Hero Section (Optional)
    // ===================================
    const subtitleElement = document.querySelector('.sub-heading');
    
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        let displayedText = '';
        let index = 0;
        
        // Only run on first page load
        if (!sessionStorage.getItem('typingAnimationShown')) {
            subtitleElement.textContent = '';
            
            function typeWriter() {
                if (index < originalText.length) {
                    displayedText += originalText.charAt(index);
                    subtitleElement.textContent = displayedText;
                    index++;
                    setTimeout(typeWriter, 50);
                } else {
                    sessionStorage.setItem('typingAnimationShown', 'true');
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // ===================================
    // Back to Top Button (Optional)
    // ===================================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: var(--dark-bg);
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
    });
    
    // ===================================
    // Lazy Loading for Images
    // ===================================
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Check if image is already loaded
                if (img.complete && img.naturalHeight !== 0) {
                    // Image already loaded successfully
                    img.style.opacity = '1';
                } else {
                    // Image not yet loaded
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    // Handle image load errors (broken images)
                    img.onerror = () => {
                        img.style.opacity = '1';
                        console.warn('Image failed to load:', img.src);
                    };
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // Request Details - Prefill Contact Form
    // ===================================
    document.querySelectorAll('.request-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const subject = this.dataset.subject || 'Project Inquiry';
            const contactForm = document.getElementById('contactForm');
            const header = document.querySelector('.header');
            const target = document.getElementById('contact');
            
            // Smooth scroll to contact section
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: 'smooth' 
                });
            }
            
            // Prefill subject field after scrolling
            setTimeout(() => {
                if (contactForm) {
                    const subjectInput = contactForm.querySelector('input[name="subject"]');
                    if (subjectInput) {
                        subjectInput.value = subject;
                        // Add a subtle highlight effect
                        subjectInput.style.transition = 'all 0.3s ease';
                        subjectInput.style.borderColor = 'var(--primary-color)';
                        subjectInput.style.boxShadow = '0 0 0 2px rgba(0, 212, 255, 0.2)';
                        
                        // Focus on the name field to draw attention
                        const nameInput = contactForm.querySelector('input[name="name"]');
                        if (nameInput) nameInput.focus();
                        
                        // Remove highlight after 2 seconds
                        setTimeout(() => {
                            subjectInput.style.borderColor = '';
                            subjectInput.style.boxShadow = '';
                        }, 2000);
                    }
                }
            }, 600);
        });
    });
    
    // ===================================
    // Project Detail Overlay
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');
    const projectImages = document.querySelectorAll('.project-image[data-project]');
    const projectInfos = document.querySelectorAll('.project-info[data-project]');
    const overlay = document.getElementById('projectDetailOverlay');
    const overlayContent = document.getElementById('overlayProjectContent');
    const overlayClose = document.getElementById('overlayClose');
    
    // Function to open overlay with project details
    function openProjectDetail(projectNumber) {
        const projectCard = document.querySelector(`.project-card[data-project="${projectNumber}"]`);
        if (!projectCard) return;
        
        // Clone the entire project info content
        const projectInfo = projectCard.querySelector('.project-info');
        const projectImage = projectCard.querySelector('.project-image img');
        const clonedContent = projectInfo.cloneNode(true);
        
        // Show hidden details in the overlay
        const hiddenDetails = clonedContent.querySelectorAll('.project-details-hidden');
        hiddenDetails.forEach(detail => {
            detail.style.display = 'block';
        });
        
        // Create overlay content structure
        overlayContent.innerHTML = '';
        
        // Add project image if exists
        if (projectImage) {
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = 'text-align: center; margin-bottom: 2rem; background: var(--light-bg); padding: 2rem; border-radius: 10px;';
            const img = document.createElement('img');
            img.src = projectImage.src;
            img.alt = projectImage.alt;
            img.style.cssText = 'max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px;';
            imgContainer.appendChild(img);
            overlayContent.appendChild(imgContainer);
        }
        
        overlayContent.appendChild(clonedContent);
        
        // Show overlay with animation
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close overlay
    function closeProjectDetail() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add click handlers to project cards
    projectCards.forEach(card => {
        const projectNumber = card.getAttribute('data-project');
        if (projectNumber) {
            card.addEventListener('click', (e) => {
                // Prevent opening if clicking on a link
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                openProjectDetail(projectNumber);
            });
        }
    });
    
    // Add click handlers to images specifically
    projectImages.forEach(image => {
        const projectNumber = image.getAttribute('data-project');
        if (projectNumber) {
            image.addEventListener('click', (e) => {
                e.stopPropagation();
                openProjectDetail(projectNumber);
            });
        }
    });
    
    // Add click handlers to project info sections
    projectInfos.forEach(info => {
        const projectNumber = info.getAttribute('data-project');
        if (projectNumber) {
            info.addEventListener('click', (e) => {
                // Prevent opening if clicking on a link or button
                if (e.target.tagName === 'A' || e.target.closest('a') || 
                    e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                openProjectDetail(projectNumber);
            });
        }
    });
    
    // Close button handler
    if (overlayClose) {
        overlayClose.addEventListener('click', closeProjectDetail);
    }
    
    // Close on overlay background click
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeProjectDetail();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeProjectDetail();
        }
    });
    
    // ===================================
    // Console Message (Easter Egg)
    // ===================================
    console.log('%c👋 Hello, fellow developer!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%c🔧 Interested in embedded systems? Let\'s connect!', 'color: #0066cc; font-size: 14px;');
    console.log('%c📧 GitHub: https://github.com/repvi', 'color: #718096; font-size: 12px;');
    
});
