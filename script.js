/* ============================================================
   ELYSIUM ESTATES — Homepage JavaScript
   Handles: Preloader, Navbar, Mobile Menu, Slider, 
   Testimonials, Counter, Scroll Animations, Particles
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2200);
    });

    // Fallback: hide preloader after 4s even if images haven't loaded
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 4000);


    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    let ticking = false;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleNavbarScroll);
            ticking = true;
        }
    });


    // ===== MOBILE MENU =====
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });


    // ===== HERO PARTICLES =====
    const particlesContainer = document.getElementById('hero-particles');
    
    function createParticles() {
        const count = window.innerWidth < 768 ? 12 : 25;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 12 + 8;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.5 + 0.2;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = opacity;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();


    // ===== PROPERTIES SLIDER =====
    const track = document.getElementById('properties-track');
    const cards = document.querySelectorAll('.property-card');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    let slidesPerView = 1;
    let totalSlides = cards.length;
    let maxSlide = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateSlidesPerView() {
        if (window.innerWidth >= 1024) {
            slidesPerView = 3;
        } else if (window.innerWidth >= 768) {
            slidesPerView = 2;
        } else {
            slidesPerView = 1;
        }
        maxSlide = Math.max(0, totalSlides - slidesPerView);
        if (currentSlide > maxSlide) currentSlide = maxSlide;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const dotCount = maxSlide + 1;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 24; // card width + gap
        const translate = -(currentSlide * cardWidth);
        track.style.transform = `translateX(${translate}px)`;
        currentTranslate = translate;
        prevTranslate = translate;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, maxSlide));
        updateSlider();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch / Drag support
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('touchstart', dragStart, { passive: true });
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('touchmove', dragMove, { passive: true });
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('touchend', dragEnd);
    track.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        isDragging = true;
        startX = getPositionX(e);
        track.style.transition = 'none';
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        const diff = currentX - startX;
        track.style.transform = `translateX(${prevTranslate + diff}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)';
        
        const currentX = getPositionX(e) || startX;
        const diff = currentX - startX;
        const threshold = 80;
        
        if (diff < -threshold) {
            nextSlide();
        } else if (diff > threshold) {
            prevSlide();
        } else {
            updateSlider();
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    }

    // Initialize slider
    function initSlider() {
        updateSlidesPerView();
        createDots();
        updateSlider();
    }

    initSlider();
    window.addEventListener('resize', () => {
        initSlider();
    });


    // ===== TESTIMONIALS CAROUSEL =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testPrev = document.getElementById('test-prev');
    const testNext = document.getElementById('test-next');
    const testDotsContainer = document.getElementById('test-dots');
    const testDots = testDotsContainer.querySelectorAll('.test-dot');
    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active', 'prev');
            if (i < index) card.classList.add('prev');
        });
        testimonialCards[index].classList.add('active');

        testDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    testNext.addEventListener('click', () => {
        nextTestimonial();
        resetTestimonialAutoplay();
    });

    testPrev.addEventListener('click', () => {
        prevTestimonial();
        resetTestimonialAutoplay();
    });

    testDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
            resetTestimonialAutoplay();
        });
    });

    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function resetTestimonialAutoplay() {
        clearInterval(testimonialInterval);
        startTestimonialAutoplay();
    }

    startTestimonialAutoplay();


    // ===== COUNTER ANIMATION =====
    const statItems = document.querySelectorAll('[data-animate="counter"]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        statItems.forEach(item => {
            const target = parseInt(item.dataset.count);
            const numberEl = item.querySelector('.stat-number');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    numberEl.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    numberEl.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    }


    // ===== SCROLL REVEAL ANIMATIONS =====
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                if (el.dataset.animate === 'counter') {
                    animateCounters();
                } else {
                    el.classList.add('visible');
                }
                
                scrollObserver.unobserve(el);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });


    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletter-form');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        
        // Visual feedback
        const btn = document.getElementById('newsletter-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Subscribed!</span> ✓';
        btn.style.background = '#25d366';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            newsletterForm.reset();
        }, 2500);
    });


    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ===== PARALLAX EFFECT ON HERO (subtle) =====
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const heroHeight = heroSection.offsetHeight;
        if (scrollY < heroHeight) {
            const heroImgs = document.querySelectorAll('.hero-img');
            heroImgs.forEach(img => {
                img.style.transform = `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.15}px)`;
            });
        }
    });

});
