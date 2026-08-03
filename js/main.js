/* ============================================
   PORTFOLIO: KOMAKECH STEPHEN
   Cybersecurity Professional & Quality Assurance Executive
   Interactive Engine — Audited & Patched
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initTypingAnimation();
    initStatsCounter();
    initSmoothScroll();
    initContactForm();
    initActiveNavHighlight();
    initTimeline();
    initTerminal();
    initCertificationsToggle();
});

/* ---------- THEME SWITCHER ---------- */
function initTheme() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Update active button
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (!themeButtons.length) return;
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-theme');
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update active button
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    const setOpen = (open) => {
        toggle.classList.toggle('active', open);
        menu.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
        setOpen(!menu.classList.contains('active'));
    });

    links.forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            setOpen(false);
        }
    });
}

/* ---------- SCROLL EFFECTS ---------- */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
        '.expertise-card, .portfolio-card, .cert-card, .proof-card, .stack-category, .highlight-item, .contact-method'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ---------- TYPING ANIMATION ---------- */
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'Cybersecurity Engineer',
        'AI Researcher',
        'MSc Candidate'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

/* ---------- STATS COUNTER (FIXED v2) ----------
   Bug in v1: hero-stats is above the fold, so the IntersectionObserver
   fired immediately on page load and recruiters saw "0" for ~2 seconds.
   Fix: render the target value at rest. Only animate if the user has
   scrolled away and scrolled back (delight, not bug). */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    // 1. Set rest state to the final value immediately so first paint is correct.
    const setRestValues = () => {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            stat.textContent = Number.isInteger(target) ? target : target.toFixed(1);
        });
    };
    setRestValues();

    let animationFrameId;
    const animateOnce = () => {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const duration = 800;
            const startTime = performance.now();

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = target * eased;
                stat.textContent = Number.isInteger(target) ? Math.floor(value) : value.toFixed(1);
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(tick);
                } else {
                    stat.textContent = Number.isInteger(target) ? target : target.toFixed(1);
                }
            }
            animationFrameId = requestAnimationFrame(tick);
        });
    };

    // 2. Track whether the user has scrolled away from the hero.
    //    Only re-animate when they come BACK to it.
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats || !('IntersectionObserver' in window)) return;

    let leftHero = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                leftHero = true;
            } else if (leftHero) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                animateOnce();
                leftHero = false;
            }
        });
    }, { threshold: 0.5 });
    observer.observe(heroStats);
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;

            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ---------- CONTACT FORM (PATCHED) ---------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            shakeElement(form);
            return;
        }

        if (!isValidEmail(email)) {
            const emailInput = document.getElementById('email');
            emailInput.style.borderColor = 'var(--accent-danger)';
            emailInput.focus();
            setTimeout(() => {
                emailInput.style.borderColor = 'var(--border-color)';
            }, 2000);
            return;
        }

        // hCaptcha verification — make sure the user solved the challenge before submitting
        const captchaResponse = (typeof hcaptcha !== 'undefined')
            ? hcaptcha.getResponse()
            : (document.querySelector('[name="h-captcha-response"]')?.value || '');
        if (!captchaResponse) {
            shakeElement(form);
            const captchaWidget = document.querySelector('.h-captcha');
            if (captchaWidget) {
                captchaWidget.style.outline = '2px solid var(--accent-danger)';
                setTimeout(() => { captchaWidget.style.outline = ''; }, 2000);
            }
            return;
        }

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // ============================================
        // REPLACE WITH YOUR ACTUAL FORMSPREE FORM ID
        // Go to formspree.io → Create Form → Copy ID
        // ============================================
        const formspreeEndpoint = 'https://formspree.io/f/xjgjqogk';

        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: document.getElementById('subject').value.trim(),
                message: message,
                'h-captcha-response': captchaResponse
            })
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Recovery: Allow sending another message without page reload
                if (!document.getElementById('send-another')) {
                    const sendAnother = document.createElement('button');
                    sendAnother.id = 'send-another';
                    sendAnother.className = 'btn btn-secondary';
                    sendAnother.style.cssText = 'margin-top: 16px;';
                    sendAnother.innerHTML = '<i class="fas fa-redo"></i> Send Another Message';
                    sendAnother.addEventListener('click', () => {
                        form.style.display = 'flex';
                        successMessage.classList.add('hidden');
                        sendAnother.remove();
                        // Reset hCaptcha so the next message has a fresh challenge
                        if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
                    });
                    successMessage.appendChild(sendAnother);
                }
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please email me directly at cybercon.UG@proton.me');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function shakeElement(element) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 50%, 90% { transform: translateX(-6px); }
        30%, 70% { transform: translateX(6px); }
    }
`;
document.head.appendChild(shakeStyle);

/* ---------- KEYBOARD NAVIGATION ---------- */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menu = document.querySelector('.nav-menu');
        const toggle = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

/* ---------- PARALLAX GRID EFFECT ---------- */
document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.hero-bg-grid');
    if (!grid || window.innerWidth < 768) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

/* ---------- CAREER TIMELINE ---------- */
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const filterButtons = document.querySelectorAll('.timeline-btn');
    
    if (!timelineItems.length) return;

    // Animate progress bar on scroll
    window.addEventListener('scroll', () => {
        const timeline = document.querySelector('.timeline-container');
        if (!timeline) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;
        
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - timelineTop) / (timelineHeight + windowHeight)
        ));
        
        if (timelineProgress) {
            timelineProgress.style.height = `${scrollProgress * 100}%`;
        }
    });

    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-view');
            
            timelineItems.forEach(item => {
                item.classList.remove('hidden-item');
                
                if (filter === 'all') return;
                
                const category = item.getAttribute('data-category');
                if (category !== filter) {
                    item.classList.add('hidden-item');
                }
            });
        });
    });

    // Reveal items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        const isLeft = item.classList.contains('left');
        item.style.opacity = '0';
        item.style.transform = isLeft ? 'translateX(-30px)' : 'translateX(30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

/* ---------- CERTIFICATIONS TOGGLE ---------- */
function initCertificationsToggle() {
    const viewAllBtn = document.getElementById('view-all-certs');
    const hiddenCerts = document.querySelectorAll('.cert-card.cert-hidden');
    
    if (!viewAllBtn || !hiddenCerts.length) return;
    
    let isExpanded = false;
    
    viewAllBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        hiddenCerts.forEach(cert => {
            cert.style.display = isExpanded ? 'block' : 'none';
        });
        
        viewAllBtn.innerHTML = isExpanded 
            ? 'View Less ←<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
            : 'View All →<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
    });
}

/* ---------- LOGGING ---------- */
console.log(
    '%c Komakech Stephen Portfolio %c v1.1 ',
    'background: #00d4aa; color: #0a0e14; padding: 6px 12px; font-weight: 700; border-radius: 4px 0 0 4px;',
    'background: #0f1419; color: #e6edf3; padding: 6px 12px; border-radius: 0 4px 4px 0;'
);
console.log('%c🔐 Cybersecurity Professional & Quality Assurance Executive', 'color: #8b949e; font-style: italic;');
console.log('%c💻 github.com/Komakech-Stephen', 'color: #00a3ff;');
console.log('%c✅ Audited — 3 patches applied', 'color: #00d4aa; font-size: 0.8rem;');

/* ---------- INTERACTIVE TERMINAL ---------- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const body = document.getElementById('terminal-body');
    
    if (!input || !output) return;

    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
        help: () => `
<span class="output-title">Available Commands</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">whoami</span>        — Who I am
<span class="output-success">skills</span>        — Technical skill tree
<span class="output-success">certs</span>         — Certifications list
<span class="output-success">experience</span>    — Career summary
<span class="output-success">redteam</span>       — AI red teaming methodology
<span class="output-success">soc</span>           — SOC & defensive tools
<span class="output-success">education</span>     — Academic background
<span class="output-success">contact</span>       — Get in touch
<span class="output-success">github</span>        — Repository links
<span class="output-success">resume</span>        — Download resume
<span class="output-success">whois komakech</span>  — Full profile
<span class="output-success">clear</span>         — Clear terminal
<span class="output-success">history</span>       — Command history
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-subtitle">Try: <span class="cmd-highlight">whoami</span> or <span class="cmd-highlight">skills</span></span>`,

        whoami: () => `
<span class="output-title">🛡️ Komakech Stephen</span>
<span class="output-subtitle">Cybersecurity Professional & Quality Assurance Executive</span>
<span class="output-divider">─────────────────────────────────────</span>
Cybersecurity professional with 2+ years of experience in ICT support, user training, and system administration and 6+ years of experience in quality assurance. Experience supporting UN ICT operations, delivering staff training, and preparing technical documentation.

<span class="output-highlight">📍 Kampala City, UGANDA</span>
<span class="output-highlight">🎓 B.S.C Cybersecurity, ISBAT (GPA 4.4 / 5.0)</span>
<span class="output-highlight">📜 Industry certifications + ongoing training (comptia Network+)</span>
<span class="output-highlight">💼 Active Sr.executive QA | Agri Exim ltd</span>
<span class="output-highlight">⚡ A Two year of progressive IT and cybersecurity experience</span>

<span class="output-subtitle">I break AI systems to make them safer — and I build defenses that actually hold.</span>`,

        skills: () => {
            const skillData = [
                { name: 'Splunk (SIEM)', level: 85 },
                { name: 'Python Automation', level: 82 },
                { name: 'Prompt Injection Testing', level: 85 },
                { name: 'Threat Intelligence (MISP)', level: 80 },
                { name: 'Incident Response', level: 78 },
                { name: 'LLM Jailbreak Analysis', level: 87 },
                { name: 'GRC & Compliance', level: 75 },
                { name: 'Linux Administration', level: 80 },
                { name: 'AWS / Azure Security', level: 72 }
            ];
            
            let html = `<span class="output-title">⚡ Technical Skill Tree</span>
<span class="output-divider">──────────────────────────────────────────</span>
<div class="terminal-skill-tree">`;
            
            skillData.forEach(skill => {
                html += `
                <div class="terminal-skill-item">
                    <span style="min-width:160px;font-size:0.8rem;">${skill.name}</span>
                    <div class="terminal-skill-bar">
                        <div class="terminal-skill-fill" style="width:${skill.level}%"></div>
                    </div>
                    <span style="font-size:0.72rem;color:#8b949e;">${skill.level}%</span>
                </div>`;
            });
            
            html += `</div>`;
            return html;
        },

        certs: () => `
<span class="output-title">📜 Certifications & Training</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">Google IT Support</span> — IT Support Professional Certificate (Google)
<span class="output-highlight">Diploma in Cybersecurity</span> — Cybersecurity Diploma (Alison)
<span class="output-highlight">UN Information Security</span> — Security Awareness Training (United Nations)
<span class="output-highlight">UN Ethics</span> — Ethics and Integrity Training (United Nations)
<span class="output-highlight">CompTIA Network+</span> — Network Certification (CompTIA · Future)
<span class="output-highlight">CompTIA Security+</span> — Security Certification (CompTIA · Future)
<span class="output-highlight">CompTIA CySA+</span> — Cybersecurity Analyst (CompTIA · Future)
<span class="output-highlight">CompTIA PenTest+</span> — Penetration Testing (CompTIA · Future)
<span class="output-highlight">BESAFE. At UN</span> — Basic Security in the Field (United Nations)
<span class="output-highlight">Active Shooter Response</span> — Preparing and Responding to Active Shooter Incidents (United Nations)
<span class="output-highlight">Fraud Prevention</span> — Preventing Fraud and Corruption (United Nations)
<span class="output-highlight">PSEA Training</span> — Prevention of Sexual Exploitation and Abuse (United Nations)
<span class="output-highlight">Drone Pilot</span> — Drone Pilot Certificate (Alison)

<span class="output-subtitle">15+ Professional Certifications across IT, Cybersecurity, and UN Training</span>`,

        experience: () => `
<span class="output-title">💼 Career Timeline</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">2022 – Present</span>  Senior Executive Quality Assurance — Agri Exim Ltd
<span class="output-highlight">2025</span>          Information Technology Intern — United Nations Regional Service Centre Entebbe
<span class="output-highlight">2024</span>          Volunteer IT Assistant — Agri Exim Ltd
<span class="output-highlight">2022</span>          Senior Executive Quality Assurance — Agri Exim Ltd
<span class="output-highlight">2019</span>          Quality Supervisor — Agri Exim Ltd

<span class="output-subtitle">📍 Kampala, Uganda | Quality Assurance, ICT Operations, and Cybersecurity</span>`,

        redteam: () => `
<span class="output-title">🔴 Cybersecurity Methodology</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">1.</span> Network Security — Security monitoring and incident response
<span class="output-success">2.</span> Quality Assurance — Systematic testing and quality control processes
<span class="output-success">3.</span> ICT Operations — Digital infrastructure and technical support
<span class="output-success">4.</span> Security Training — Staff awareness and cybersecurity education
<span class="output-success">5.</span> Risk Management — Proactive threat identification and mitigation

<span class="output-subtitle">🔗 github.com/Komakech-Stephen</span>`,

        soc: () => `
<span class="output-title">🛡️ Security Operations & Tools</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Network Security:</span> Security monitoring and incident response
<span class="output-success">Quality Assurance:</span> Systematic testing and quality control
<span class="output-success">ICT Operations:</span> Digital infrastructure and technical support
<span class="output-success">Security Training:</span> Staff awareness and cybersecurity education
<span class="output-success">Risk Management:</span> Proactive threat identification and mitigation

<span class="output-subtitle">Experience in UN ICT operations and enterprise quality assurance</span>`,

        education: () => `
<span class="output-title">🎓 Education</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">BSc Networking & Cybersecurity</span>
ISBAT University | First Class Honours
Strong foundation in network security, cybersecurity principles, system administration, and artificial intelligence.

<span class="output-highlight">BSc Chemical Engineering</span>
Kyambogo University
Strong foundation in process design, material science, and IoT systems.

<span class="output-highlight">Professional Training:</span>
• Google IT Support Professional Certificate
• Diploma in Cybersecurity (Alison)
• UN Information Security & Ethics Training
• CompTIA Certifications (Network+, Security+, CySA+, PenTest+)`,

        contact: () => `
<span class="output-title">📬 Let's Connect</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Email:</span>    <span class="output-link">cybercon.UG@proton.me</span>
<span class="output-success">LinkedIn:</span>  <span class="output-link">linkedin.com/in/komakech-stephen-7835b2117</span>
<span class="output-success">GitHub:</span>    <span class="output-link">github.com/Komakech-Stephen</span>
<span class="output-success">Website:</span>  <span class="output-link">komakech-stephen.github.io</span>

<span class="output-subtitle">Open to: SOC Analyst | Network Security Engineer | Information Security Analyst | Cybersecurity Consultant</span>`,

        github: () => `
<span class="output-title">📦 GitHub Profile</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Profile:</span>    <span class="output-link">github.com/Komakech-Stephen</span>
<span class="output-success">Portfolio:</span>  <span class="output-link">komakech-stephen.github.io</span>

<span class="output-subtitle">Check out my GitHub for projects and contributions</span>`,

        resume: () => `
<span class="output-title">📄 Resume</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">View:</span> <span class="output-link">resume/</span>

<span class="output-subtitle">Type <span class="cmd-highlight">experience</span> for career summary</span>`,

        'whois komakech': () => `
<span class="output-title">WHOIS: komakech-stephen</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Registrant:</span> Komakech Stephen
<span class="output-success">Organization:</span> Agri Exim Ltd / UN Regional Service Centre Entebbe
<span class="output-success">Location:</span>    Kampala, Uganda
<span class="output-success">Domain:</span>      komakech-stephen.github.io
<span class="output-success">Specialty:</span>   Cybersecurity, Network Security, Quality Assurance
<span class="output-success">Status:</span>      Active — Available for Opportunities
<span class="output-success">Created:</span>     2019 (Quality Assurance career began)
<span class="output-success">Updated:</span>     2026 (BSc Networking and Cybersecurity in progress)
<span class="output-success">Source:</span>      github.com/Komakech-Stephen`,

        history: () => {
            if (commandHistory.length === 0) return '<span class="output-subtitle">No commands yet. Start typing!</span>';
            return `<span class="output-title">Command History</span>
<span class="output-divider">────────────────────</span>
${commandHistory.map((cmd, i) => `<span class="output-subtitle">${i + 1}.</span> ${cmd}`).join('<br>')}`;
        },

        nmap: (args) => {
            const target = args || 'localhost';
            return `
<span class="output-title">Starting Nmap scan on ${target}</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">PORT     STATE    SERVICE</span>
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
3306/tcp filtered mysql
8080/tcp open     http-proxy

<span class="output-subtitle">Nmap done: 1 IP address scanned in 2.34 seconds</span>
<span class="output-highlight">⚠️ Just kidding. This is a portfolio terminal.</span>`;
        }
    };

    function executeCommand(cmdString) {
        const trimmed = cmdString.trim().toLowerCase();
        
        if (!trimmed) return '';
        
        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        // Parse command and args
        let cmd = trimmed;
        let args = '';
        
        if (trimmed.startsWith('nmap ')) {
            cmd = 'nmap';
            args = trimmed.substring(5);
        }

        if (cmd === 'clear') {
            output.innerHTML = '';
            return '';
        }

        if (commands[cmd]) {
            return commands[cmd](args);
        }

        if (cmd === 'ls') {
            return `
<span class="output-success">skills.txt</span>    <span class="output-success">certs.txt</span>     <span class="output-success">experience.log</span>
<span class="output-success">redteam/</span>      <span class="output-success">soc/</span>          <span class="output-success">education.pdf</span>
<span class="output-success">contact.txt</span>   <span class="output-success">resume.pdf</span>    <span class="output-success">github.lnk</span>

<span class="output-subtitle">Use <span class="cmd-highlight">cat [filename]</span> to view. Example: <span class="cmd-highlight">cat skills.txt</span></span>`;
        }

        if (cmd.startsWith('cat ')) {
            const file = cmd.substring(4).trim();
            const fileMap = {
                'skills.txt': 'skills',
                'certs.txt': 'certs',
                'experience.log': 'experience',
                'education.pdf': 'education',
                'contact.txt': 'contact',
                'resume.pdf': 'resume',
                'readme.md': 'whoami'
            };
            if (fileMap[file]) {
                return commands[fileMap[file]]();
            }
            return `<span class="output-error">cat: ${file}: No such file or directory</span>`;
        }

        return `<span class="output-error">Command not found: ${trimmed}</span>
<span class="output-subtitle">Type <span class="cmd-highlight">help</span> to see available commands.</span>`;
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const cmd = input.value;
            
            // Display the command
            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-output-line';
            cmdLine.innerHTML = `<span class="prompt">┌──(komakech㉿portfolio)-[~]</span><br><span class="prompt">└─$</span> <span class="command">${cmd}</span>`;
            output.appendChild(cmdLine);

            // Execute and display result
            const result = executeCommand(cmd);
            if (result) {
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-output-line';
                resultLine.innerHTML = result;
                output.appendChild(resultLine);
            }

            // Scroll to bottom
            body.scrollTop = body.scrollHeight;
            
            input.value = '';
        }

        // Arrow up for history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex] || '';
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    // Click to focus input
    body.addEventListener('click', () => input.focus());

    // Clickable help hints - use event delegation for dynamically generated content
    output.addEventListener('click', function(e) {
        const cmdHighlight = e.target.closest('.cmd-highlight');
        if (cmdHighlight) {
            e.stopPropagation();
            input.value = cmdHighlight.textContent;
            input.focus();
        }
    });
}

// Global clear function for the clear button
function clearTerminal() {
    const output = document.getElementById('terminal-output');
    if (output) output.innerHTML = '';
}
