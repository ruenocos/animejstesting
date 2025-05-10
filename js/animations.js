// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initHeroAnimations();
    initScrollAnimations();
    initTypewriterEffect();
    initParallaxEffects();
    
    // Initialize page-specific animations
    if (document.querySelector('.projects-horizontal')) {
        initHorizontalScroll();
    }
    
    if (document.querySelector('.playground-grid')) {
        initPlaygroundAnimations();
    }
    
    if (document.querySelector('.contact-form')) {
        initContactFormAnimations();
    }
});

// Hero section animations
function initHeroAnimations() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    const tl = gsap.timeline();
    
    tl.to('.intro-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.typewriter-container', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.hero p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.cta-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.video-showcase', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');
}

// Scroll animations
function initScrollAnimations() {
    // About section
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Projects section
    gsap.from('.projects h2', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Stagger project cards
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.view-all', {
        scrollTrigger: {
            trigger: '.view-all',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Playground teaser
    gsap.from('.playground-content', {
        scrollTrigger: {
            trigger: '.playground-teaser',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.playground-preview', {
        scrollTrigger: {
            trigger: '.playground-teaser',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Page hero sections
    const pageHero = document.querySelector('.projects-hero, .playground-hero, .contact-hero');
    
    if (pageHero) {
        gsap.from(`${pageHero.className} h1`, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from(`${pageHero.className} p`, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.project-filters, .playground-filters', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out'
        });
    }
}

// Typewriter effect
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (!typewriterElement) return;
    
    const words = ['websites', 'animations', 'videos', 'experiences'];
    let currentWordIndex = 0;
    
    const typewriterTimeline = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
        }
    });
    
    typewriterTimeline
        .to(typewriterElement, {
            duration: 1,
            text: words[0],
            ease: 'none'
        })
        .to(typewriterElement, {
            duration: 1.5,
            delay: 1,
            text: '',
            ease: 'none'
        })
        .to(typewriterElement, {
            duration: 1,
            text: () => words[currentWordIndex],
            ease: 'none'
        })
        .to(typewriterElement, {
            duration: 1.5,
            delay: 1,
            text: '',
            ease: 'none'
        });
}

// Parallax effects
function initParallaxEffects() {
    // Project cards parallax
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        
        if (!image) return;
        
        gsap.to(image, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: 50,
            ease: 'none'
        });
    });
}

// Horizontal scroll for projects page
function initHorizontalScroll() {
    const horizontalSection = document.querySelector('.horizontal-scroll-container');
    const horizontalContent = document.querySelector('.projects-horizontal');
    
    if (!horizontalSection || !horizontalContent) return;
    
    const projectCards = horizontalContent.querySelectorAll('.project-card');
    const totalWidth = Array.from(projectCards).reduce((width, card) => {
        return width + card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
    }, 0);
    
    gsap.to(horizontalContent, {
        scrollTrigger: {
            trigger: horizontalSection,
            start: 'top top',
            end: `+=${totalWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        },
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none'
    });
    
    // Fade in project cards as they enter the viewport
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: gsap.to(horizontalContent, {x: -(totalWidth - window.innerWidth)}),
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// Playground grid animations
function initPlaygroundAnimations() {
    const playgroundItems = document.querySelectorAll('.playground-item');
    
    if (playgroundItems.length === 0) return;
    
    gsap.from(playgroundItems, {
        scrollTrigger: {
            trigger: '.playground-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Hover animations
    playgroundItems.forEach(item => {
        const overlay = item.querySelector('.playground-overlay');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(item.querySelector('img'), {
                scale: 1.1,
                duration: 0.5
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(item.querySelector('img'), {
                scale: 1,
                duration: 0.5
            });
        });
    });
}

// Contact form animations
function initContactFormAnimations() {
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-container');
    
    if (!contactInfo || !contactForm) return;
    
    gsap.from(contactInfo, {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from(contactForm, {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                borderColor: 'var(--color-accent)',
                boxShadow: '0 0 0 2px rgba(255, 131, 64, 0.2)',
                duration: 0.3
            });
            
            const label = input.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                gsap.to(label, {
                    color: 'var(--color-accent)',
                    y: -5,
                    duration: 0.3
                });
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input, {
                    borderColor: 'var(--color-dark-3)',
                    boxShadow: 'none',
                    duration: 0.3
                });
                
                const label = input.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    gsap.to(label, {
                        color: 'var(--color-light)',
                        y: 0,
                        duration: 0.3
                    });
                }
            }
        });
    });
    
    // Submit button animation
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
            gsap.to(submitBtn.querySelector('.btn-icon'), {
                x: 5,
                duration: 0.3
            });
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            gsap.to(submitBtn.querySelector('.btn-icon'), {
                x: 0,
                duration: 0.3
            });
        });
    }
}