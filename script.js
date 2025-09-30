// Parallax and scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                // Special animation for hobby items
                if (entry.target.classList.contains('hobby-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 50;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .hobby-item, .section-title').forEach(el => {
        observer.observe(el);
    });

    // Add floating animation to strength items
    const strengthItems = document.querySelectorAll('.strength-item');
    strengthItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('float-animation');
    });

    // Cursor glow effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Sparkle effect on hover for hobby items
    document.querySelectorAll('.hobby-item').forEach(item => {
        item.addEventListener('mouseenter', createSparkles);
        item.addEventListener('mouseleave', removeSparkles);
    });

    function createSparkles(e) {
        const sparkleCount = 5;
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                e.target.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }, i * 100);
        }
    }

    function removeSparkles(e) {
        const sparkles = e.target.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => sparkle.remove());
    }

    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    const titleText = 'Pavel Sidžina';
    const subtitleText = 'člověk, kterého chceš v týmu';
    
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Start typewriter effect after page load
    setTimeout(() => {
        const mainTitle = heroTitle.firstChild;
        if (mainTitle) {
            typeWriter(mainTitle, titleText, 80);
        }
    }, 500);

    // Add scroll-triggered animations for timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.filter = 'blur(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        item.style.filter = 'blur(2px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        timelineObserver.observe(item);
    });

    // Background particles effect
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Add glitch effect to current timeline items
    setInterval(() => {
        const currentItems = document.querySelectorAll('.timeline-item.current');
        currentItems.forEach(item => {
            item.classList.add('glitch');
            setTimeout(() => {
                item.classList.remove('glitch');
            }, 200);
        });
    }, 3000);
});

// Add dynamic color shifting
function addColorShifting() {
    const colorShiftElements = document.querySelectorAll('.hero-title, .section-title');
    
    setInterval(() => {
        colorShiftElements.forEach(element => {
            const hue = Math.random() * 60 + 160; // Random hue between cyan and blue
            element.style.filter = `hue-rotate(${hue}deg)`;
        });
    }, 5000);
}

// Initialize color shifting after DOM is loaded
document.addEventListener('DOMContentLoaded', addColorShifting);