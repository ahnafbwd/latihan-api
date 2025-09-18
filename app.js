// EmailJS Configuration
// Ganti dengan kredensial EmailJS Anda setelah mendaftar di https://www.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "_RiJ16LBld3OfmVTv",        // Dapatkan dari EmailJS Dashboard
    SERVICE_ID: "service_24h8k3v",        // ID layanan email (Gmail, Outlook, etc.)
    TEMPLATE_ID: "template_0pr22nm",      // ID template email
    TO_EMAIL: "ahnafbawedan01@gmail.com"  // Email tujuan
};

// Fungsi untuk mengirim email
function sendEmail(formData) {
    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
            // Variables sesuai dengan template EmailJS yang ada
            name: formData.name,
            email: formData.email,
            message: formData.message,
            time: new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            // Variables tambahan untuk fallback dan compatibility
            subject: formData.subject,
            from_name: formData.name,
            from_email: formData.email,
            to_email: EMAILJS_CONFIG.TO_EMAIL,
            reply_to: formData.email
        }
    );
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS saat halaman dimuat
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Hide previous messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');

            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Mengirim...';
            loadingSpinner.classList.remove('hidden');

            try {
                // Get form data
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim()
                };

                // Validate form
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    throw new Error('Semua field harus diisi');
                }

                if (!isValidEmail(formData.email)) {
                    throw new Error('Format email tidak valid');
                }

                // Send email using EmailJS
                await sendEmail(formData);

                // Show success message
                successMessage.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } catch (error) {
                console.error('Error sending email:', error);
                
                // Show error message
                errorMessage.classList.remove('hidden');
                
                // Scroll to error message
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Kirim Pesan';
                loadingSpinner.classList.add('hidden');
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Active link highlighting with Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinksAll.forEach(link => {
                    link.classList.remove('text-blue-400');
                });
                
                // Add active class to current section nav link
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink && activeLink.classList.contains('nav-link')) {
                    activeLink.classList.add('text-blue-400');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Scroll animations with Intersection Observer
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        animateObserver.observe(element);
    });
    
    // Header background opacity on scroll
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.8)';
        }
        
        lastScrollY = currentScrollY;
    });
});