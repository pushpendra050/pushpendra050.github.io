// Global variable to store publications data
let publicationsData = [];

// Load publications data from JSON file
async function loadPublicationsData() {
    try {
        const response = await fetch('abstracts.json');
        const data = await response.json();
        publicationsData = data.publications;
        console.log('Publications data loaded successfully');
    } catch (error) {
        console.error('Error loading publications data:', error);
    }
}

// Toggle abstract visibility
function toggleAbstract(pubId) {
    const abstractText = document.getElementById(`abstract-${pubId}`);
    const button = document.getElementById(`btn-${pubId}`);

    if (abstractText && button) {
        if (abstractText.classList.contains('show')) {
            abstractText.classList.remove('show');
            button.textContent = 'Read Abstract';
        } else {
            abstractText.classList.add('show');
            button.textContent = 'Hide Abstract';
        }
    }
}

// Scroll animations
const sections = document.querySelectorAll('.section');
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

function checkSections() {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition >= sectionTop - windowHeight + 100) {
            section.classList.add('visible');
        }
    });
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});

// Publication filter functionality
function filterPublications(type) {
    const publications = document.querySelectorAll('.publication-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter publications
    publications.forEach((pub, index) => {
        if (type === 'all' || pub.dataset.type === type) {
            pub.style.display = 'block';
            pub.style.animationDelay = (index * 0.1) + 's';
        } else {
            pub.style.display = 'none';
        }
    });
}

// Event listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    checkSections();
});

window.addEventListener('load', () => {
    checkSections();
    updateScrollProgress();
    loadPublicationsData();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.education-card, .skill-category, .publication-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing effect to header
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        setTimeout(() => {
            typeWriter(subtitle, 'Ph.D. | Assistant Professor', 150);
        }, 2000);
    }
});
