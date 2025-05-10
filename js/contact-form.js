// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// Contact form animations and functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    // Animate form elements on page load
    const formGroups = contactForm.querySelectorAll('.form-group');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    gsap.from(formGroups, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from(submitBtn, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
    });
    
    // Form input animations
    const formInputs = contactForm.querySelectorAll('.form-input');
    const formLabels = contactForm.querySelectorAll('.form-label');
    
    // Set up initial positions
    formLabels.forEach(label => {
        const input = document.getElementById(label.getAttribute('for'));
        
        // Position label inside input initially
        gsap.set(label, {
            position: 'absolute',
            top: '50%',
            left: '1rem',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            fontSize: '1rem',
            color: 'var(--color-muted)'
        });
        
        // If textarea, adjust position
        if (input.tagName.toLowerCase() === 'textarea') {
            gsap.set(label, {
                top: '1.5rem',
                transform: 'none'
            });
        }
        
        // If input already has value, move label up
        if (input.value !== '') {
            gsap.set(label, {
                top: '0',
                left: '0.5rem',
                transform: 'translateY(-50%)',
                fontSize: '0.8rem',
                color: 'var(--color-accent)',
                backgroundColor: 'var(--color-dark-2)',
                padding: '0 0.5rem'
            });
        }
    });
    
    // Add focus and blur event listeners
    formInputs.forEach(input => {
        const label = contactForm.querySelector(`label[for="${input.id}"]`);
        
        // Focus animation
        input.addEventListener('focus', () => {
            // Animate input
            gsap.to(input, {
                borderColor: 'var(--color-accent)',
                boxShadow: '0 0 0 2px rgba(255, 131, 64, 0.2)',
                duration: 0.3
            });
            
            // Animate label
            gsap.to(label, {
                top: '0',
                left: '0.5rem',
                transform: 'translateY(-50%)',
                fontSize: '0.8rem',
                color: 'var(--color-accent)',
                backgroundColor: 'var(--color-dark-2)',
                padding: '0 0.5rem',
                duration: 0.3
            });
        });
        
        // Blur animation
        input.addEventListener('blur', () => {
            // If input is empty, animate label back to original position
            if (input.value === '') {
                gsap.to(input, {
                    borderColor: 'var(--color-dark-3)',
                    boxShadow: 'none',
                    duration: 0.3
                });
                
                // Different position for textarea
                if (input.tagName.toLowerCase() === 'textarea') {
                    gsap.to(label, {
                        top: '1.5rem',
                        left: '1rem',
                        transform: 'none',
                        fontSize: '1rem',
                        color: 'var(--color-muted)',
                        backgroundColor: 'transparent',
                        padding: '0',
                        duration: 0.3
                    });
                } else {
                    gsap.to(label, {
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1rem',
                        color: 'var(--color-muted)',
                        backgroundColor: 'transparent',
                        padding: '0',
                        duration: 0.3
                    });
                }
            } else {
                // If input has value, keep label at top but change color
                gsap.to(input, {
                    borderColor: 'var(--color-dark-3)',
                    boxShadow: 'none',
                    duration: 0.3
                });
                
                gsap.to(label, {
                    color: 'var(--color-light)',
                    duration: 0.3
                });
            }
        });
    });
    
    // Submit button animation
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        submitBtn.addEventListener('mouseenter', () => {
            gsap.to(btnIcon, {
                x: 5,
                duration: 0.3
            });
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            gsap.to(btnIcon, {
                x: 0,
                duration: 0.3
            });
        });
        
        // Form submission animation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const isValid = Array.from(formInputs).every(input => input.checkValidity());
            
            if (isValid) {
                // Disable form
                formInputs.forEach(input => {
                    input.disabled = true;
                });
                submitBtn.disabled = true;
                
                // Animate button
                const submitTl = gsap.timeline();
                
                submitTl
                    .to(btnText, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2
                    })
                    .to(btnIcon, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2
                    }, 0)
                    .to(submitBtn, {
                        width: submitBtn.offsetWidth,
                        height: submitBtn.offsetHeight,
                        duration: 0
                    })
                    .to(submitBtn, {
                        width: '50px',
                        borderRadius: '50%',
                        duration: 0.3
                    })
                    .set(btnText, {
                        text: ''
                    })
                    .set(btnIcon, {
                        className: '+=fas fa-check',
                        y: 0
                    })
                    .to(btnIcon, {
                        opacity: 1,
                        scale: 1.5,
                        duration: 0.3
                    })
                    .to(btnIcon, {
                        scale: 1,
                        duration: 0.2
                    })
                    .to(submitBtn, {
                        backgroundColor: '#4CAF50',
                        duration: 0.3
                    }, '-=0.2');
                
                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    setTimeout(() => {
                        const resetTl = gsap.timeline();
                        
                        resetTl
                            .to(btnIcon, {
                                opacity: 0,
                                duration: 0.2
                            })
                            .to(submitBtn, {
                                width: 'auto',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: 'var(--color-accent)',
                                duration: 0.3
                            })
                            .set(btnIcon, {
                                className: '+=fas fa-paper-plane',
                                x: 0
                            })
                            .set(btnText, {
                                text: 'Send Message'
                            })
                            .to([btnText, btnIcon], {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                stagger: 0.1
                            });
                        
                        // Re-enable form
                        formInputs.forEach(input => {
                            input.disabled = false;
                        });
                        submitBtn.disabled = false;
                        
                        // Reset labels
                        formLabels.forEach(label => {
                            const input = document.getElementById(label.getAttribute('for'));
                            
                            if (input.tagName.toLowerCase() === 'textarea') {
                                gsap.to(label, {
                                    top: '1.5rem',
                                    left: '1rem',
                                    transform: 'none',
                                    fontSize: '1rem',
                                    color: 'var(--color-muted)',
                                    backgroundColor: 'transparent',
                                    padding: '0',
                                    duration: 0.3
                                });
                            } else {
                                gsap.to(label, {
                                    top: '50%',
                                    left: '1rem',
                                    transform: 'translateY(-50%)',
                                    fontSize: '1rem',
                                    color: 'var(--color-muted)',
                                    backgroundColor: 'transparent',
                                    padding: '0',
                                    duration: 0.3
                                });
                            }
                        });
                    }, 1500);
                }, 1500);
            }
        });
    }
}