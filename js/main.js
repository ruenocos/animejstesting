// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
    
    // Custom cursor
    initCustomCursor();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Header scroll effect
    initHeaderScroll();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
});

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Cursor hover effect for links and buttons
    const links = document.querySelectorAll('a, button, .project-card, .playground-item, .video-item');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--color-accent)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(255, 131, 64, 0.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--color-accent)';
            cursor.style.border = 'none';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '0.7';
        cursorFollower.style.opacity = '0.5';
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate hamburger to X
        const lines = menuToggle.querySelectorAll('div');
        
        if (nav.classList.contains('active')) {
            gsap.to(lines[0], { rotation: 45, y: 8, duration: 0.3 });
            gsap.to(lines[1], { opacity: 0, duration: 0.3 });
            gsap.to(lines[2], { rotation: -45, y: -8, duration: 0.3 });
        } else {
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(lines[1], { opacity: 1, duration: 0.3 });
            gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            
            const lines = menuToggle.querySelectorAll('div');
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(lines[1], { opacity: 1, duration: 0.3 });
            gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
    
    // Close menu when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            
            const lines = menuToggle.querySelectorAll('div');
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(lines[1], { opacity: 1, duration: 0.3 });
            gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// Video hover effect
function initVideoHover() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const video = item.querySelector('video');
            if (video) {
                video.play();
            }
            
            gsap.to(item, {
                scale: 1.05,
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                duration: 0.3
            });
            
            gsap.to(item.querySelector('.video-overlay'), {
                y: -10,
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                y: 0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                duration: 0.3
            });
            
            gsap.to(item.querySelector('.video-overlay'), {
                y: 0,
                duration: 0.3
            });
        });
    });
}

// Initialize video hover effect if videos are present
if (document.querySelector('.video-item')) {
    initVideoHover();
}

// Project filter functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        onStart: function() {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.5,
                        ease: 'power2.out',
                        onComplete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Initialize project filters if they exist
if (document.querySelector('.filter-btn')) {
    initProjectFilters();
}

// Playground filter functionality
function initPlaygroundFilters() {
    const filterBtns = document.querySelectorAll('.playground-filters .filter-btn');
    const playgroundItems = document.querySelectorAll('.playground-item');
    
    if (filterBtns.length === 0 || playgroundItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter playground items
            playgroundItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        onStart: function() {
                            item.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.5,
                        ease: 'power2.out',
                        onComplete: function() {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Initialize playground filters if they exist
if (document.querySelector('.playground-filters .filter-btn')) {
    initPlaygroundFilters();
}