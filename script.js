/* ==========================================
   JAVASCRIPT INTERACTIVITY - PORTFOLIO LOGIC
   ========================================== */

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        if (systemPrefersDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme immediately when script executes (safe due to 'defer')
initTheme();

// Project Details Data
const projectDetails = {
    'expense-tracker': {
        title: 'Full-Stack Expense Tracker',
        period: 'Jan 2026',
        category: 'Web Development',
        desc: 'A comprehensive and secure financial dashboard engineered to help users manage their financial health. The app provides user accounts with JWT token encryption, custom category creation, monthly limits, and real-time analytical reports.',
        features: [
            'Secure User Authentication (JWT) and encrypted passwords.',
            'Protected REST APIs for transactions, categories, and user profiles.',
            'Interactive analytics visualization with monthly budget trackers.',
            'Fully cloud-integrated utilizing MongoDB Atlas cluster.',
            'Responsive web design optimized for mobile and desktop screens.'
        ],
        techs: ['Node.js', 'Express.js', 'MongoDB Atlas', 'HTML5', 'CSS3', 'JavaScript', 'JWT', 'REST API'],
        github: 'https://github.com/NISHANTH5235099',
        live: '#'
    },
    'taskora': {
        title: 'Taskora – To-Do Web Application',
        period: '2026',
        category: 'Web Development',
        desc: 'Taskora is a sleek, glassmorphic task management application designed to boost user productivity. It features robust client-side routing, LocalStorage persistence, multi-level tag categories, search index filters, and status counters.',
        features: [
            'Offline-first architecture with automatic LocalStorage updates.',
            'Dynamic task state filters (All, Active, Completed).',
            'Full text search query matching for active checklists.',
            'Modern UI design utilizing HSL colors, smooth transitions, and grid layouts.'
        ],
        techs: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Flexbox'],
        github: 'https://github.com/NISHANTH5235099',
        live: '#'
    },
    'portfolio': {
        title: 'Personal Portfolio Website',
        period: '2026',
        category: 'Web Development',
        desc: 'A showcase of developmental competency and aesthetic excellence. Built with curated typography, custom cursor glows, fluid scroll reveal animations, scroll-spy navbar syncing, and floating progress indicators.',
        features: [
            'Modular decoupled code structure separating HTML, CSS, and JS logic.',
            'Custom 2D canvas particle web background responding to cursor coordinates.',
            'Responsive media queries supporting compact mobile views.',
            'Automated theme matching using window matchMedia detection and localStorage cache.'
        ],
        techs: ['HTML5', 'CSS3', 'Vanilla JS', 'Canvas 2D API', 'IntersectionObserver'],
        github: 'https://github.com/NISHANTH5235099',
        live: '#'
    }
};

// Set up UI Event Listeners and Interactions on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle Binding
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Cursor Glow Tracking Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // Auto Typewriter Effect in Hero Section
    const words = ["B.Tech CSE Student", "Fullstack Developer", "REST API Engineer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenWords = 2000;
    const typewriterElement = document.getElementById('typewriter');

    function type() {
        if (!typewriterElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
        }
    }

    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // Project Filtering Tabs Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-v2');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Intersection Observer for Slide-Up Scroll Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Initialize New Premium Features
    initHeroParticles();
    init3DTilt();
    initMobileMenu();
    initHeroParallax();
    initScrollspy();
    initBackToTop();
    initStatsCounter();
    initProjectModals();
    initContactForm();
});

// 1. Hero Canvas Particles Background (Three.js WebGL Particle Wave with 2D Fallback)
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Check if Three.js is loaded, else run 2D canvas fallback
    if (typeof THREE !== 'undefined') {
        initThreeJSParticles(canvas);
        return;
    }
    
    // Fallback: 2D Canvas particles
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 130 };
    
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles();
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 1.5;
                    this.y -= (dy / dist) * force * 1.5;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            const isDark = document.body.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(165, 180, 252, 0.3)' : 'rgba(79, 70, 229, 0.2)';
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        const count = Math.min(55, Math.floor((canvas.width * canvas.height) / 16000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const isDark = document.body.classList.contains('dark');
        const lineColor = isDark ? 'rgba(165, 180, 252, 0.04)' : 'rgba(79, 70, 229, 0.035)';
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1 - dist / 100;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    const heroSec = canvas.closest('.hero-sec');
    if (heroSec) {
        heroSec.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        
        heroSec.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }
    
    resizeCanvas();
    animate();
}

function initThreeJSParticles(canvas) {
    const heroSec = canvas.closest('.hero-sec');
    if (!heroSec) return;

    let width = heroSec.clientWidth;
    let height = heroSec.clientHeight;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 110, 180);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Dynamic wave parameters
    const rows = 45;
    const cols = 45;
    const spacing = 16;
    const particleCount = rows * cols;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // Initial grid mapping (X, Z on flat plane)
    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            positions[index * 3] = (c - cols / 2) * spacing;     // x
            positions[index * 3 + 1] = 0;                         // y
            positions[index * 3 + 2] = (r - rows / 2) * spacing; // z
            index++;
        }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Dynamic texture generation using 2D Canvas
    function createCircleTexture() {
        const texCanvas = document.createElement('canvas');
        texCanvas.width = 16;
        texCanvas.height = 16;
        const ctx = texCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
        return new THREE.CanvasTexture(texCanvas);
    }

    let isDark = document.body.classList.contains('dark');
    let colorVal = isDark ? 0xa5b4fc : 0x4f46e5;

    const material = new THREE.PointsMaterial({
        color: colorVal,
        size: 3.5,
        map: createCircleTexture(),
        transparent: true,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Interactive mouse mapping
    let mouse = { x: null, z: null };
    heroSec.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        
        // Map screen space 2D coordinates to 3D grid bounds
        mouse.x = ((screenX / rect.width) - 0.5) * (cols * spacing);
        mouse.z = ((screenY / rect.height) - 0.5) * (rows * spacing);
    });

    heroSec.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.z = null;
    });

    // Animate wave
    let count = 0;
    const speed = 0.02;

    function render() {
        count += speed;
        const pos = geometry.attributes.position.array;
        
        // Update color and blending dynamically if theme changes
        const currentIsDark = document.body.classList.contains('dark');
        if (currentIsDark !== isDark) {
            isDark = currentIsDark;
            colorVal = isDark ? 0xa5b4fc : 0x4f46e5;
            material.color.setHex(colorVal);
            material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
            material.needsUpdate = true;
        }

        let idx = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const xIndex = idx * 3;
                const yIndex = idx * 3 + 1;
                const zIndex = idx * 3 + 2;

                const px = pos[xIndex];
                const pz = pos[zIndex];

                // Undulating waves based on sin/cos and distance
                let yVal = Math.sin(c * 0.15 + count) * 15 +
                           Math.cos(r * 0.15 + count) * 15;

                // Mouse interaction repulsion/warp ripple
                if (mouse.x !== null && mouse.z !== null) {
                    const dx = mouse.x - px;
                    const dz = mouse.z - pz;
                    const dist = Math.sqrt(dx * dx + dz * dz);
                    if (dist < 100) {
                        const force = (100 - dist) / 100;
                        yVal += force * Math.sin(count * 4) * 28;
                    }
                }

                pos[yIndex] = yVal;
                idx++;
            }
        }
        geometry.attributes.position.needsUpdate = true;
        
        // Subtle global tilt rotations
        particleSystem.rotation.y = count * 0.04;
        
        renderer.render(scene, camera);
    }

    // Resize Handler
    function handleResize() {
        width = heroSec.clientWidth;
        height = heroSec.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    // Optimized Animation loop via IntersectionObserver
    let isVisible = true;
    let frameId = null;

    function animateLoop() {
        if (!isVisible) return;
        render();
        frameId = requestAnimationFrame(animateLoop);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const wasVisible = isVisible;
            isVisible = entry.isIntersecting;
            if (isVisible && !wasVisible) {
                animateLoop();
            } else if (!isVisible && wasVisible) {
                cancelAnimationFrame(frameId);
            }
        });
    }, { threshold: 0.05 });
    observer.observe(canvas);

    // Start
    animateLoop();
}

// Custom 3D Card Tilt Engine
function init3DTilt() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Skip tilt on mobile device touchscreens
        if (window.matchMedia('(max-width: 768px)').matches) return;
        
        // Append glare overlay element
        const glare = document.createElement('div');
        glare.classList.add('card-glare');
        card.appendChild(glare);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            // Calculate rotational angles (-8 to 8 degrees max)
            const angleX = -(y - yc) / yc * 8;
            const angleY = (x - xc) / xc * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Calculate glare overlay center percentages
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// 2. Active Navigation Link Scrollspy
function initScrollspy() {
    const sections = document.querySelectorAll('section[id], footer');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || 'footer';
            }
        });
        
        if (window.scrollY < 100) {
            currentSectionId = '';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' && currentSectionId === '') {
                // Top of page matches home
            } else if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

// 3. Back-to-Top Circle Progress Indicator
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.getElementById('progress-ring-circle');
    if (!backToTopBtn || !progressCircle) return;
    
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
    
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        if (docHeight > 0) {
            const scrollPercent = scrollTop / docHeight;
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
    }
    
    window.addEventListener('scroll', updateProgress);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    updateProgress();
}

// 4. Stats Counter Animation on Viewport Entrance
function initStatsCounter() {
    const statsSec = document.getElementById('about');
    if (!statsSec) return;
    
    const statNums = document.querySelectorAll('.stat-num');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNums.forEach(numElement => {
                    const originalText = numElement.textContent;
                    const targetValue = parseFloat(originalText);
                    const hasPlus = originalText.includes('+');
                    const isFloat = originalText.includes('.');
                    
                    let startValue = 0;
                    const duration = 1800; // 1.8 seconds duration
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const easeProgress = progress * (2 - progress); // outQuad
                        
                        let currentValue = startValue + easeProgress * targetValue;
                        
                        if (isFloat) {
                            numElement.textContent = currentValue.toFixed(2) + (hasPlus ? '+' : '');
                        } else {
                            numElement.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            numElement.textContent = originalText;
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                });
                observer.unobserve(statsSec);
            }
        });
    }, { threshold: 0.15 });
    
    observer.observe(statsSec);
}

// 5. Project Pop-up Modals Integration
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const projectCards = document.querySelectorAll('.project-card-v2');
    
    if (!modal || !modalContent) return;
    
    function openModal(projectId) {
        const project = projectDetails[projectId];
        if (!project) return;
        
        let featuresHtml = '';
        project.features.forEach(f => {
            featuresHtml += `<li>${f}</li>`;
        });
        
        let techsHtml = '';
        project.techs.forEach(t => {
            techsHtml += `<span class="modal-tech-badge">${t}</span>`;
        });
        
        let linksHtml = '';
        if (project.github && project.github !== '#') {
            linksHtml += `
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <ion-icon name="logo-github"></ion-icon>
                    <span>View Repository</span>
                </a>
            `;
        }
        if (project.live) {
            linksHtml += `
                <a href="${project.live}" class="btn btn-secondary">
                    <ion-icon name="open-outline"></ion-icon>
                    <span>Live Preview</span>
                </a>
            `;
        }
        
        modalContent.innerHTML = `
            <div class="modal-project-header">
                <h2>${project.title}</h2>
                <div class="modal-project-meta">
                    <span><ion-icon name="calendar-outline"></ion-icon> ${project.period}</span>
                    <span>•</span>
                    <span><ion-icon name="folder-open-outline"></ion-icon> ${project.category}</span>
                </div>
            </div>
            <div class="modal-project-body">
                <div class="modal-project-desc">
                    <h3>Project Overview</h3>
                    <p>${project.desc}</p>
                    
                    <div class="modal-project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${featuresHtml}
                        </ul>
                    </div>
                </div>
                <div class="modal-project-sidebar">
                    <h3>Technologies Used</h3>
                    <div class="modal-tech-list">
                        ${techsHtml}
                    </div>
                    
                    <h3>Project Links</h3>
                    <div class="modal-links">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project-id');
        if (projectId) {
            card.addEventListener('click', () => {
                openModal(projectId);
            });
        }
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// 6. Direct Message Submit (FormSubmit.co API Integration)
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMessage = document.getElementById('toast-message');
    
    function showToast(message, isSuccess = true) {
        if (!toast) return;
        
        toastMessage.textContent = message;
        if (isSuccess) {
            toast.querySelector('.toast-content').style.backgroundColor = '#10b981';
            toast.querySelector('.toast-content').style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
            if (toastIcon) toastIcon.setAttribute('name', 'checkmark-circle');
        } else {
            toast.querySelector('.toast-content').style.backgroundColor = '#ef4444';
            toast.querySelector('.toast-content').style.boxShadow = '0 10px 25px -5px rgba(239, 68, 68, 0.4)';
            if (toastIcon) toastIcon.setAttribute('name', 'alert-circle-outline');
        }
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Clear errors on input focus/type
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let hasError = false;
        
        // Remove previous error classes to reset animation
        nameInput.classList.remove('input-error');
        emailInput.classList.remove('input-error');
        messageInput.classList.remove('input-error');
        
        // Reflow hack to restart CSS animation if classes are re-added immediately
        void nameInput.offsetWidth;
        void emailInput.offsetWidth;
        void messageInput.offsetWidth;
        
        if (!name) {
            nameInput.classList.add('input-error');
            hasError = true;
        }
        if (!email || !emailRegex.test(email)) {
            emailInput.classList.add('input-error');
            hasError = true;
        }
        if (!message) {
            messageInput.classList.add('input-error');
            hasError = true;
        }
        
        if (hasError) {
            showToast('Please check the highlighted fields.', false);
            return;
        }
        
        // Block interaction & show loader state
        submitBtn.classList.add('btn-loading');
        nameInput.disabled = true;
        emailInput.disabled = true;
        messageInput.disabled = true;
        
        // Execute POST to FormSubmit API
        fetch('https://formsubmit.co/ajax/nishanthtirumalasetty@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: `New portfolio contact from ${name}`
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Form submission failed.');
        })
        .then(data => {
            // Trigger takeoff airplane transition
            submitBtn.classList.remove('btn-loading');
            submitBtn.classList.add('btn-success-plane');
            
            showToast('Message sent successfully!');
            
            // Clear fields
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            
            setTimeout(() => {
                submitBtn.classList.remove('btn-success-plane');
                nameInput.disabled = false;
                emailInput.disabled = false;
                messageInput.disabled = false;
            }, 2200);
        })
        .catch(error => {
            submitBtn.classList.remove('btn-loading');
            nameInput.disabled = false;
            emailInput.disabled = false;
            messageInput.disabled = false;
            
            showToast('Could not send message. Please try again.', false);
            console.error('Submit error:', error);
        });
    });
}

// Mobile Hamburger Menu Trigger Toggling
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navLinks) return;
    
    function toggleMenu() {
        const isActive = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Auto-close menu drawer when selecting any anchor target
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// Hero Text Card Parallax Float
function initHeroParallax() {
    const heroSec = document.querySelector('.hero-sec');
    const textCard = document.querySelector('.hero-text-card');
    
    if (!heroSec || !textCard) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    
    heroSec.addEventListener('mousemove', (e) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Normalize cursor offset coordinates between -1 and 1
        const mouseX = (e.clientX / width - 0.5) * 2;
        const mouseY = (e.clientY / height - 0.5) * 2;
        
        // Translate gently on X/Y plane and apply subtle skew rotations
        const moveX = mouseX * 14;
        const moveY = mouseY * 8;
        const rotateX = -mouseY * 3;
        const rotateY = mouseX * 3;
        
        textCard.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroSec.addEventListener('mouseleave', () => {
        textCard.style.transition = 'transform 0.5s ease';
        textCard.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
    });
    
    heroSec.addEventListener('mouseenter', () => {
        textCard.style.transition = 'none';
    });
}
