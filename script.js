/* 
   GenZ Code Technologies 
   Core Logic - Premium Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            console.warn('Lucide library not loaded.');
        }
    };

    initIcons(); // Initial call
    setTimeout(initIcons, 500); // Delayed secondary call to catch any late elements

    // --- Dynamic Mouse Glow ---
    const bgGlow = document.getElementById('bg-glow');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Use requestAnimationFrame for smooth movement
        window.requestAnimationFrame(() => {
            bgGlow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.section, .fade-up, .glass-card, .service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a fade-up element, add the specific class
                if (entry.target.classList.contains('fade-up')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission is handled by @formspree/ajax library (see index.html)
    // No manual listener needed here to avoid double-submission components.
    
    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 1.2rem';
            header.style.background = 'rgba(3, 7, 18, 0.8)';
            header.style.borderColor = 'rgba(0, 242, 254, 0.2)';
        } else {
            header.style.padding = '0.8rem 1.5rem';
            header.style.background = 'rgba(3, 7, 18, 0.6)';
            header.style.borderColor = 'var(--clr-glass-border)';
        }
    });

    // --- Floating Action Button or Back to Top (Optional) ---
    // Can be added here for extra polish
});
