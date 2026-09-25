// Toggle abstract visibility
function toggleAbstract(pubId) {
    const abstractText = document.getElementById(`abstract-${pubId}`);
    const button = document.getElementById(`btn-${pubId}`);

    if (abstractText && button) {
        const isOpen = abstractText.classList.toggle('show');
        button.textContent = isOpen ? 'Hide Abstract' : 'Read Abstract';
        button.setAttribute('aria-expanded', isOpen);
    }
}

// Publication filter functionality
function filterPublications(type, button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (button) {
        button.classList.add('active');
    }

    document.querySelectorAll('.publication-item').forEach(pub => {
        pub.style.display = (type === 'all' || pub.dataset.type === type) ? '' : 'none';
    });
}

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxHeight > 0 ? (window.pageYOffset / maxHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('load', updateScrollProgress);

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');

    // Mobile navigation drawer
    function setMenu(open) {
        hamburger.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open);
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));

        links.forEach(link => link.addEventListener('click', () => setMenu(false)));

        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                setMenu(false);
            }
        });
    }

    // Highlight the nav link of the section currently in view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px' });

        document.querySelectorAll('.section').forEach(section => observer.observe(section));
    }

    // Keep the footer year current
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Image modal for the book cover
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const bookCoverImage = document.querySelector('.book-cover-image');

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (bookCoverImage) {
        bookCoverImage.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (modal && modal.classList.contains('show')) {
                closeModal();
            }
            if (navLinks && navLinks.classList.contains('active')) {
                setMenu(false);
            }
        }
    });
});
