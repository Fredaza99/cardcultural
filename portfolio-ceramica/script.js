// Ceramic Artist Portfolio - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth horizontal scrolling for desktop
    function initHorizontalScroll() {
        const container = document.querySelector('.container');
        
        if (window.innerWidth > 768) {
            // Enable horizontal scrolling with mouse wheel
            container.addEventListener('wheel', function(e) {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    container.scrollLeft += e.deltaY;
                }
            });
        }
    }

    // Gallery image modal functionality
    function initGalleryModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img class="modal-image" src="" alt="">
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalClose = modal.querySelector('.modal-close');

        // Add click event to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('h3').textContent;
                
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = title;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal functionality
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.about-content, .gallery-item, .contact-content');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // WhatsApp button click tracking
    function initWhatsAppTracking() {
        const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add a subtle animation feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Touch gestures for mobile gallery
    function initTouchGestures() {
        const gallery = document.querySelector('.gallery-grid');
        let startX, startY, distX, distY;

        gallery.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        });

        gallery.addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            const touch = e.touches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;

            // Prevent default scrolling if horizontal swipe is detected
            if (Math.abs(distX) > Math.abs(distY)) {
                e.preventDefault();
            }
        });
    }

    // Performance optimization: Debounced resize handler
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize
    const handleResize = debounce(function() {
        initHorizontalScroll();
    }, 250);

    window.addEventListener('resize', handleResize);

    // Initialize all features
    initHorizontalScroll();
    initGalleryModal();
    initScrollAnimations();
    initWhatsAppTracking();
    initLazyLoading();
    initTouchGestures();

    // Add CSS for modal and animations
    const style = document.createElement('style');
    style.textContent = `
        .gallery-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            backdrop-filter: blur(5px);
        }

        .gallery-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }

        .modal-image {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: opacity 0.3s ease;
        }

        .modal-close:hover {
            opacity: 0.7;
        }

        .modal-info {
            color: white;
            margin-top: 1rem;
        }

        .modal-title {
            font-family: var(--font-heading);
            font-size: 1.5rem;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }

        .gallery-item.animate-in {
            animation: slideInLeft 0.6s ease forwards;
        }

        img {
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        img.loaded {
            opacity: 1;
        }

        /* Smooth scrolling for horizontal layout */
        .container {
            scroll-behavior: smooth;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
            .modal-content {
                max-width: 95%;
                max-height: 95%;
            }
            
            .modal-close {
                top: -30px;
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Service Worker for offline functionality (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
