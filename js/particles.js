// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles in hero section
    initHeroParticles();
    
    // Initialize particles in contact form if it exists
    if (document.getElementById('particles-contact')) {
        initContactParticles();
    }
});

// Create particles in hero section
function initHeroParticles() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Create particles container if it doesn't exist
    let particlesContainer = hero.querySelector('.particles-container');
    
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.id = 'particles-hero';
        hero.insertBefore(particlesContainer, hero.firstChild);
    }
    
    // Create particles
    createParticles(particlesContainer, 50, {
        colorStart: '#ff8340',
        colorEnd: '#ffa366',
        sizeMin: 2,
        sizeMax: 8,
        speedMin: 0.5,
        speedMax: 2,
        opacityMin: 0.1,
        opacityMax: 0.5,
        blurMin: 0,
        blurMax: 3
    });
}

// Create particles in contact form
function initContactParticles() {
    const particlesContainer = document.getElementById('particles-contact');
    
    if (!particlesContainer) return;
    
    // Create particles
    createParticles(particlesContainer, 30, {
        colorStart: '#ff8340',
        colorEnd: '#ffa366',
        sizeMin: 2,
        sizeMax: 6,
        speedMin: 0.3,
        speedMax: 1.5,
        opacityMin: 0.1,
        opacityMax: 0.3,
        blurMin: 0,
        blurMax: 2
    });
}

// Create particles with GSAP
function createParticles(container, count, options) {
    // Default options
    const defaults = {
        colorStart: '#ff8340',
        colorEnd: '#ffa366',
        sizeMin: 2,
        sizeMax: 8,
        speedMin: 0.5,
        speedMax: 2,
        opacityMin: 0.1,
        opacityMax: 0.5,
        blurMin: 0,
        blurMax: 3
    };
    
    // Merge options
    const settings = { ...defaults, ...options };
    
    // Clear container
    container.innerHTML = '';
    
    // Get container dimensions
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Create particles
    for (let i = 0; i < count; i++) {
        // Create particle element
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = gsap.utils.random(settings.sizeMin, settings.sizeMax);
        const opacity = gsap.utils.random(settings.opacityMin, settings.opacityMax);
        const blur = gsap.utils.random(settings.blurMin, settings.blurMax);
        const color = gsap.utils.interpolate(settings.colorStart, settings.colorEnd, Math.random());
        
        // Set initial styles
        gsap.set(particle, {
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            top: gsap.utils.random(0, height),
            left: gsap.utils.random(0, width),
            opacity: opacity,
            filter: `blur(${blur}px)`,
            zIndex: 0
        });
        
        // Add to container
        container.appendChild(particle);
        
        // Animate particle
        animateParticle(particle, width, height, settings);
    }
}

// Animate a single particle
function animateParticle(particle, containerWidth, containerHeight, settings) {
    // Random speed
    const speed = gsap.utils.random(settings.speedMin, settings.speedMax);
    
    // Random direction
    const angle = gsap.utils.random(0, Math.PI * 2);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    // Initial position
    const x = parseFloat(particle.style.left);
    const y = parseFloat(particle.style.top);
    
    // Create timeline
    const tl = gsap.timeline({ repeat: -1 });
    
    // Animate position
    tl.to(particle, {
        x: '+=' + vx * 100,
        y: '+=' + vy * 100,
        duration: 10,
        ease: 'none',
        onUpdate: function() {
            // Get current position
            const rect = particle.getBoundingClientRect();
            const containerRect = particle.parentNode.getBoundingClientRect();
            
            // Check if particle is out of bounds
            if (rect.left < containerRect.left || 
                rect.right > containerRect.right || 
                rect.top < containerRect.top || 
                rect.bottom > containerRect.bottom) {
                
                // Reset position
                gsap.set(particle, {
                    x: gsap.utils.random(0, containerWidth),
                    y: gsap.utils.random(0, containerHeight)
                });
                
                // Restart animation
                tl.restart();
            }
        }
    });
    
    // Add subtle pulsing
    gsap.to(particle, {
        opacity: '-=' + gsap.utils.random(0.1, 0.3),
        scale: gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
.particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
}

.particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
}
`;
document.head.appendChild(style);