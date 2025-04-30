// ===== PRELOADER =====
window.addEventListener('load', () => {
    // Hide preloader after page load
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Initialize animations after preloader is gone
        initializeAnimations();
    }, 1500);
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
const savedColor = localStorage.getItem('color-theme');

// Apply saved theme if it exists
if (savedTheme) {
    body.className = savedTheme;
    updateThemeIcon();
}

// Apply saved color theme if it exists
if (savedColor) {
    document.documentElement.setAttribute('data-theme', savedColor);
    // Highlight the active color option
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.color === savedColor) {
            option.style.border = '2px solid white';
        }
    });
}

// Theme toggle function
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    updateThemeIcon();
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', body.className);
});

// Update theme icon based on current theme
function updateThemeIcon() {
    if (body.classList.contains('light-mode')) {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// ===== COLOR THEME CUSTOMIZER =====
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const color = option.dataset.color;
        
        // Apply the color theme
        document.documentElement.setAttribute('data-theme', color);
        
        // Highlight the active option
        colorOptions.forEach(opt => {
            opt.style.border = '2px solid transparent';
        });
        option.style.border = '2px solid white';
        
        // Save color preference to localStorage
        localStorage.setItem('color-theme', color);
    });
});

// ===== TYPING EFFECT =====
function setupTypewriter() {
    const roles = ["Computer Science Student", "Full-Stack Developer", "Competitive Programmer", "NTSE Scholar"];
    const typingText = document.getElementById('typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If word is complete, start deleting after pause
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        }
        
        // If word is deleted, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    type();
}

// ===== NAVIGATION =====
// Sticky navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Update progress bar
    updateProgressBar();
    
    // Show/hide back to top button
    toggleBackToTopButton();
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL PROGRESS BAR =====
function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    document.querySelector('.progress-bar').style.width = `${scrollProgress}%`;
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.dataset.filter;
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 100);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== ANIMATED COUNTERS =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = +stat.dataset.count;
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 15); // Update every 15ms
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count);
                setTimeout(updateCount, 15);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
}

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

// Initialize EmailJS with your public key
emailjs.init("F0reQZ-2OuDStf_pV");

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form data
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            formMessage.innerHTML = `
                <div class="message-content error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Please fill in all fields.</p>
                </div>
            `;
            formMessage.style.display = 'block';
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            formMessage.innerHTML = `
                <div class="message-content error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Please enter a valid email address.</p>
                </div>
            `;
            formMessage.style.display = 'block';
            return;
        }
        
        console.log('Form data:', formData);

        // Prepare email parameters
        const emailParams = {
            email: formData.email, // recipient's email for auto-reply
            from_name: formData.name,
            subject: formData.subject,
            message: formData.message,
            reply_to: formData.email
        };

        console.log('Sending email with parameters:', emailParams);
        
        // Send notification to you
        emailjs.send("service_91lod9o", "template_nmsigm6", emailParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            
            // Show success message
            formMessage.innerHTML = `
                <div class="message-content success">
                    <i class="fas fa-check-circle"></i>
                    <p>Message sent successfully! I'll get back to you soon.</p>
                </div>
            `;
            formMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 3000);
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            console.error('Error details:', {
                status: error.status,
                text: error.text,
                params: emailParams
            });
            
            // Show specific error message
            let errorMessage = 'Failed to send message. Please try again later.';
            if (error.text) {
                try {
                    const errorObj = JSON.parse(error.text);
                    errorMessage = errorObj.message || error.text;
                } catch (e) {
                    errorMessage = error.text;
                }
            }
            
            formMessage.innerHTML = `
                <div class="message-content error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${errorMessage}</p>
                </div>
            `;
            formMessage.style.display = 'block';
        });
    });
}

// ===== INTERSECTION OBSERVER ANIMATIONS =====
function initializeAnimations() {
    // Setup Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .project-card, .contact-content');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate skill bars if this is a skills section
                if (entry.target.classList.contains('skills-content')) {
                    animateSkillBars();
                }
                
                // Animate counters if this is the stats container
                if (entry.target.classList.contains('about-content')) {
                    animateCounters();
                }
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
}

// Animate skill bars
function animateSkillBars() {
    const skills = document.querySelectorAll('.skill-progress');
    
    skills.forEach(skill => {
        const width = skill.dataset.width;
        skill.style.width = `${width}%`;
    });
}

// ===== EASTER EGG =====
const logo = document.querySelector('.logo');
let clickCount = 0;

logo.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;
    
    if (clickCount === 5) {
        // Activate easter egg
        activateEasterEgg();
        clickCount = 0;
    }
});

function activateEasterEgg() {
    // Create floating elements
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'easter-egg-emoji';
        emoji.textContent = ['🚀', '⭐', '💻', '🎉', '🔥'][Math.floor(Math.random() * 5)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.animationDuration = `${Math.random() * 3 + 2}s`;
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        
        document.body.appendChild(emoji);
        
        // Remove after animation
        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }
    
    // Show a message
    const message = document.createElement('div');
    message.className = 'easter-egg-message';
    message.textContent = 'You found the Easter Egg! 🎉';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Resume Tabs
function initResumeTabs() {
    const resumeTabs = document.querySelectorAll('.resume-tab');
    const resumeContents = document.querySelectorAll('.resume-tab-content');

    if (resumeTabs.length > 0 && resumeContents.length > 0) {
        resumeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                resumeTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all content
                resumeContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
}

// Initialize preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            initializeAnimations();
        }, 1500);
    }
}

// Initialize navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .btn-primary[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Calculate the offset to account for the fixed header
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll events
function initScrollEvents() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveNavLink();
        updateProgressBar();
        toggleBackToTopButton();
    });
}

// Initialize counter animation
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        animateCounters();
    }
}

// Initialize project filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form validation logic here
        });
    }
}

// Initialize easter egg
function initEasterEgg() {
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;
            if (clickCount === 5) {
                activateEasterEgg();
                clickCount = 0;
            }
        });
    }
}

// Smooth scrolling for all anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Initialize all
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    initPreloader();
    
    // Typing Text
    setupTypewriter();
    
    // Navigation
    initNavigation();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Scroll Events
    initScrollEvents();
    
    // Counter Animation
    initCounterAnimation();
    
    // Project Filters
    initProjectFilters();
    
    // Resume Tabs
    initResumeTabs();
    
    // Form Validation
    initFormValidation();
    
    // Easter Egg
    initEasterEgg();
}); 