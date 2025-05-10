// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initHorizontalScroll();
});

// Horizontal scroll for projects page
function initHorizontalScroll() {
    const horizontalSection = document.querySelector('.horizontal-scroll-container');
    const horizontalContent = document.querySelector('.projects-horizontal');
    
    if (!horizontalSection || !horizontalContent) return;
    
    // Get all project cards
    const projectCards = horizontalContent.querySelectorAll('.project-card');
    
    // Calculate total width of all cards including margins
    const totalWidth = Array.from(projectCards).reduce((width, card) => {
        const cardWidth = card.offsetWidth;
        const marginRight = parseInt(getComputedStyle(card).marginRight);
        return width + cardWidth + marginRight;
    }, 0);
    
    // Set the width of the horizontal content
    horizontalContent.style.width = `${totalWidth}px`;
    
    // Create ScrollTrigger for horizontal scrolling
    ScrollTrigger.create({
        trigger: horizontalSection,
        pin: true,
        start: 'top top',
        end: () => `+=${totalWidth - window.innerWidth + 100}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(horizontalContent, {
                x: -progress * (totalWidth - window.innerWidth),
                ease: 'none',
                duration: 0.1
            });
        }
    });
    
    // Create animations for each project card
    projectCards.forEach((card, index) => {
        // Calculate when this card should be in view
        const cardWidth = card.offsetWidth;
        const cardPosition = Array.from(projectCards).slice(0, index).reduce((pos, c) => {
            return pos + c.offsetWidth + parseInt(getComputedStyle(c).marginRight);
        }, 0);
        
        // Calculate start and end positions for this card's animation
        const startPosition = cardPosition / (totalWidth - window.innerWidth);
        const endPosition = (cardPosition + cardWidth) / (totalWidth - window.innerWidth);
        
        // Create a timeline for this card
        const cardTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalSection,
                start: `top top+=${startPosition * 100}%`,
                end: `top top+=${endPosition * 100}%`,
                scrub: true,
                invalidateOnRefresh: true
            }
        });
        
        // Add animations to the timeline
        cardTimeline
            .fromTo(card, 
                { opacity: 0.3, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
            )
            .to(card, { opacity: 0.3, scale: 0.9, duration: 0.5, ease: 'power2.in' }, 0.5);
        
        // Add parallax effect to the project image
        const projectImage = card.querySelector('.project-image img');
        if (projectImage) {
            gsap.to(projectImage, {
                scrollTrigger: {
                    trigger: horizontalSection,
                    start: `top top+=${startPosition * 100}%`,
                    end: `top top+=${endPosition * 100}%`,
                    scrub: true,
                    invalidateOnRefresh: true
                },
                scale: 1.1,
                ease: 'none'
            });
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}

// Filter functionality for projects
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
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
            let visibleCards = 0;
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        onStart: function() {
                            card.style.display = 'flex';
                        }
                    });
                    visibleCards++;
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
            
            // Refresh ScrollTrigger after filtering
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 600);
        });
    });
});