// EmailJS Configuration
// Ganti dengan kredensial EmailJS Anda setelah mendaftar di https://www.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "_RiJ16LBld3OfmVTv",        // Dapatkan dari EmailJS Dashboard
    SERVICE_ID: "service_24h8k3v",        // ID layanan email (Gmail, Outlook, etc.)
    TEMPLATE_ID: "template_0pr22nm",      // ID template email
    TO_EMAIL: "ahnafbawedan01@gmail.com"  // Email tujuan
};

// Project Data Loading
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

// Function to generate technology tags
function generateTechTags(technologies) {
    const colors = [
        'bg-blue-500/20 text-blue-400',
        'bg-green-500/20 text-green-400', 
        'bg-purple-500/20 text-purple-400',
        'bg-yellow-500/20 text-yellow-400',
        'bg-red-500/20 text-red-400',
        'bg-pink-500/20 text-pink-400'
    ];
    
    return technologies.map((tech, index) => {
        const colorClass = colors[index % colors.length];
        return `<span class="bg-gray-700 rounded-full px-3 py-1 text-sm ${colorClass.split(' ')[1]}">${tech}</span>`;
    }).join('');
}

// Function to generate project card HTML
function generateProjectCard(project, index) {
    const gradients = [
        'from-green-500 to-blue-600',
        'from-purple-500 to-pink-600',
        'from-orange-500 to-red-600',
        'from-blue-500 to-cyan-600',
        'from-indigo-500 to-purple-600',
        'from-yellow-500 to-orange-600',
        'from-teal-500 to-green-600',
        'from-red-500 to-pink-600'
    ];
    
    const gradient = gradients[index % gradients.length];
    const isWideCard = index === 2; // Make third project wide
    
    return `
        <article class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-on-scroll ${isWideCard ? 'md:col-span-2' : ''}">
            ${isWideCard ? `
                <div class="md:flex">
                    <div class="bg-gradient-to-br ${gradient} h-48 md:h-auto md:w-1/3 flex items-center justify-center">
                        <div class="text-center">
                            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="w-16 h-16 mx-auto mb-2 rounded-lg object-cover">` : 
                            `<svg class="w-16 h-16 mx-auto text-white mb-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path>
                            </svg>`}
                            <p class="text-white font-semibold">${project.title}</p>
                        </div>
                    </div>
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="bg-${project.category === 'mobile' ? 'blue' : project.category === 'web' ? 'green' : 'purple'}-500/20 text-${project.category === 'mobile' ? 'blue' : project.category === 'web' ? 'green' : 'purple'}-400 px-2 py-1 rounded-full text-xs font-medium">${project.categoryLabel}</span>
                            <span class="text-gray-400 text-sm">${project.year}</span>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-3">${project.title}</h3>
                        <p class="text-gray-300 mb-4">${project.description}</p>
                        ${project.features ? `
                            <ul class="text-sm text-gray-400 mb-4 space-y-1">
                                ${project.features.slice(0, 3).map(feature => `<li>• ${feature}</li>`).join('')}
                            </ul>
                        ` : ''}
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${generateTechTags(project.technologies)}
                        </div>
                        <div class="flex gap-3">
                            ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm font-medium">Live Demo →</a>` : ''}
                            ${project.github && project.github !== '#' ? `<a href="${project.github}" target="_blank" class="text-gray-400 hover:text-white text-sm font-medium">GitHub →</a>` : ''}
                        </div>
                    </div>
                </div>
            ` : `
                <div class="bg-gradient-to-br ${gradient} h-48 flex items-center justify-center">
                    <div class="text-center">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="w-16 h-16 mx-auto mb-2 rounded-lg object-cover">` : 
                        `<svg class="w-16 h-16 mx-auto text-white mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                        </svg>`}
                        <p class="text-white font-semibold">${project.title}</p>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="bg-${project.category === 'mobile' ? 'blue' : project.category === 'web' ? 'green' : 'purple'}-500/20 text-${project.category === 'mobile' ? 'blue' : project.category === 'web' ? 'green' : 'purple'}-400 px-2 py-1 rounded-full text-xs font-medium">${project.categoryLabel}</span>
                        <span class="text-gray-400 text-sm">${project.year}</span>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-3">${project.title}</h3>
                    <p class="text-gray-300 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${generateTechTags(project.technologies)}
                    </div>
                    <div class="flex gap-3">
                        ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm font-medium">Live Demo →</a>` : ''}
                        ${project.github && project.github !== '#' ? `<a href="${project.github}" target="_blank" class="text-gray-400 hover:text-white text-sm font-medium">GitHub →</a>` : ''}
                    </div>
                </div>
            `}
        </article>
    `;
}

// Function to render projects
async function renderProjects() {
    const projects = await loadProjects();
    const projectsContainer = document.getElementById('projects-container');
    const viewAllBtn = document.getElementById('view-all-btn');
    
    if (projectsContainer && projects.length > 0) {
        // Show featured projects (first 6)
        const featuredProjects = projects.slice(0, 6);
        projectsContainer.innerHTML = featuredProjects.map((project, index) => 
            generateProjectCard(project, index)
        ).join('');
        
        // Show "View All" button if there are more projects
        if (projects.length > 6 && viewAllBtn) {
            viewAllBtn.classList.remove('hidden');
            viewAllBtn.addEventListener('click', function() {
                // Show all projects
                projectsContainer.innerHTML = projects.map((project, index) => 
                    generateProjectCard(project, index)
                ).join('');
                
                // Hide the button after showing all
                viewAllBtn.style.display = 'none';
                
                // Re-apply scroll animations for new elements
                applyScrollAnimations();
            });
        }
        
        // Apply scroll animations
        applyScrollAnimations();
    }
}

// Function to apply scroll animations to new elements
function applyScrollAnimations() {
    const newAnimateElements = document.querySelectorAll('.animate-on-scroll');
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
    
    newAnimateElements.forEach(element => {
        animateObserver.observe(element);
    });
}

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

    // Load and render projects
    renderProjects();

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