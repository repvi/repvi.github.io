// ================================================
// Portfolio — Clean, professional interactions
// ================================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Mobile Navigation
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (menu && hamburger &&
            !menu.contains(e.target) &&
            !hamburger.contains(e.target) &&
            menu.classList.contains('active')) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    const headerH = document.querySelector('.header')?.offsetHeight || 0;
                    window.scrollTo({
                        top: target.offsetTop - headerH,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Header — scroll state
    // ============================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }
    }, { passive: true });

    // ============================================
    // Active Navigation Highlight
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.links[href="#${id}"]`);
            if (navLink) {
                navLink.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ============================================
    // Scroll Reveal (Intersection Observer)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ============================================
    // Back to Top Button
    // ============================================
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backBtn);

    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // Contact Form (Formspree)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            showNotification('Sending your message...', 'info');

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Thank you! Your message has been sent.', 'success');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (data.errors) {
                            showNotification(data.errors.map(err => err.message).join(', '), 'error');
                        } else {
                            showNotification('There was a problem sending your message.', 'error');
                        }
                    });
                }
            })
            .catch(() => {
                showNotification('There was a problem sending your message. Please try again.', 'error');
            });
        });
    }

    // ============================================
    // Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const el = document.createElement('div');
        el.className = `notification notification-${type}`;
        el.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        document.body.appendChild(el);

        el.querySelector('.notification-close').addEventListener('click', () => {
            el.style.animation = 'notifSlideOut 0.3s ease forwards';
            setTimeout(() => el.remove(), 300);
        });

        setTimeout(() => {
            if (el.parentElement) {
                el.style.animation = 'notifSlideOut 0.3s ease forwards';
                setTimeout(() => el.remove(), 300);
            }
        }, 5000);
    }

    // ============================================
    // Request Details — Prefill Contact Form
    // ============================================
    document.querySelectorAll('.request-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = btn.dataset.subject || 'Project Inquiry';
            const target = document.getElementById('contact');

            if (target) {
                const headerH = document.querySelector('.header')?.offsetHeight || 0;
                window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
            }

            setTimeout(() => {
                const subjectInput = contactForm?.querySelector('input[name="subject"]');
                if (subjectInput) {
                    subjectInput.value = subject;
                    subjectInput.style.borderColor = 'var(--gold-dim)';
                    setTimeout(() => { subjectInput.style.borderColor = ''; }, 2000);
                }
                const nameInput = contactForm?.querySelector('input[name="name"]');
                if (nameInput) nameInput.focus();
            }, 600);
        });
    });

    // ============================================
    // Project Detail Overlay — loads project page via fetch
    // ============================================
    const overlay = document.getElementById('projectDetailOverlay');
    const overlayContent = document.getElementById('overlayProjectContent');
    const overlayClose = document.getElementById('overlayClose');

    function openProjectDetail(url) {
        if (!overlay || !overlayContent) return;

        overlayContent.innerHTML = '<div class="overlay-loading"><i class="fas fa-circle-notch fa-spin"></i></div>';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load project page');
                return res.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.project-content');
                const header = doc.querySelector('.project-header');

                overlayContent.innerHTML = '';

                if (header) {
                    const headerClone = header.cloneNode(true);
                    // Remove ::after pseudo-element issue by resetting position
                    headerClone.style.paddingTop = '2rem';
                    headerClone.style.paddingBottom = '2rem';
                    overlayContent.appendChild(headerClone);
                }

                if (content) {
                    const contentClone = content.cloneNode(true);
                    // Remove back buttons inside the overlay
                    contentClone.querySelectorAll('.back-button').forEach(el => el.remove());
                    overlayContent.appendChild(contentClone);
                } else {
                    overlayContent.innerHTML = '<p style="color:var(--text-secondary);padding:2rem;">Could not load project details.</p>';
                }
            })
            .catch(() => {
                overlayContent.innerHTML = '<p style="color:var(--text-secondary);padding:2rem;">Could not load project details.</p>';
            });
    }

    function closeProjectDetail() {
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { overlayContent.innerHTML = ''; }, 350);
        }
    }

    if (overlayClose) overlayClose.addEventListener('click', closeProjectDetail);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeProjectDetail(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProjectDetail(); });

    document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = btn.getAttribute('href');
            if (url) openProjectDetail(url);
        });
    });

    // ============================================
    // Lazy Image Fade-in
    // ============================================
    const images = document.querySelectorAll('img[src]');

    const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (!img.complete || img.naturalHeight === 0) {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    img.onload = () => { img.style.opacity = '1'; };
                    img.onerror = () => { img.style.opacity = '1'; };
                } else {
                    img.style.opacity = '1';
                }
                obs.unobserve(img);
            }
        });
    });

    images.forEach(img => imgObserver.observe(img));

});
