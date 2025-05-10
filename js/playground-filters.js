// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initPlaygroundFilters();
});

// Playground filter functionality
function initPlaygroundFilters() {
    const filterBtns = document.querySelectorAll('.playground-filters .filter-btn');
    const playgroundItems = document.querySelectorAll('.playground-item');
    
    if (filterBtns.length === 0 || playgroundItems.length === 0) return;
    
    console.log('Initializing playground filters');
    console.log(`Found ${filterBtns.length} filter buttons and ${playgroundItems.length} playground items`);
    
    // Initial animation for playground items
    gsap.from(playgroundItems, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Set up filter button click events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            console.log(`Filter clicked: ${filter}`);
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Create a timeline for the filter animation
            const tl = gsap.timeline();
            
            // First, fade out all items
            tl.to(playgroundItems, {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
                onComplete: () => {
                    // After fade out, hide non-matching items and show matching ones
                    playgroundItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        
                        if (filter === 'all' || filter === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Get visible items after filtering
                    const visibleItems = Array.from(playgroundItems).filter(item => {
                        const category = item.getAttribute('data-category');
                        return filter === 'all' || filter === category;
                    });
                    
                    console.log(`Showing ${visibleItems.length} items for filter: ${filter}`);
                    
                    // Fade in visible items
                    gsap.to(visibleItems, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        });
    });
    
    // Set up hover animations for playground items
    playgroundItems.forEach(item => {
        const overlay = item.querySelector('.playground-overlay');
        const image = item.querySelector('img');
        
        // Create hover timeline
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl
            .to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            }, 0);
        
        // Add event listeners
        item.addEventListener('mouseenter', () => {
            hoverTl.play();
        });
        
        item.addEventListener('mouseleave', () => {
            hoverTl.reverse();
        });
    });
}