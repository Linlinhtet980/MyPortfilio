/* ============================================
   Portfolio Website - JavaScript
   လူမှီ Portfolio အင်္ဂလိပ်စာ JavaScript Code
   ============================================ */

// DOM အားလုံးတည့်တော်နေသည့်အခါ သုံးမည့်ခြင်း
document.addEventListener('DOMContentLoaded', () => {

    // ====== THEME TOGGLE (အညာမည်း/အဖြူရောင် ဖူးစွဲမှု) + RIPPLE EFFECT ======
    // အကျစ်အလုံးလူမှီ button လုံးစုံkollection
    const themeToggleBtn = document.getElementById('theme-toggle');
    // HTML document root element
    const htmlElement = document.documentElement;
    // Body element (စာမျက်နှာ အဓိကအုပ်စုံ)
    const body = document.body;

    // localStorage မှ သိုလှယ်ထားသည့် အညာမည်း/အဖြူရောင်ကို ရယူခြင်း
    // အရင်ကမ သိုလှယ်ထားခြင်းမရှိလျှင် 'dark' ကို သုံးမည်
    const savedTheme = localStorage.getItem('theme') || 'dark';
    // Body element ကို data-theme attribute ဖြင့် သတ်မှတ်ခြင်း
    body.setAttribute('data-theme', savedTheme);
    // Theme icon ကို အဆင်သြင်းခြင်း (sun သို့ moon icon)
    updateThemeIcon(savedTheme);

    // Theme ခလုတ်ကို နှိပ်သည့်အခါ အလုပ်လုပ်မည့် function
    themeToggleBtn.addEventListener('click', (e) => {
        // Ripple effect အကျစ်အလုံး div element ကို ဖန်တီးခြင်း
        const ripple = document.createElement('div');
        // Ripple အည ထည့်သွင်းခြင်း
        ripple.classList.add('theme-ripple');
        // HTML မှာ ripple element ထည့်သွင်းခြင်း
        document.body.appendChild(ripple);

        // Ripple ကို mouse နှိပ်သည့်အရာသို့ အနေအထားယူခြင်း
        ripple.style.left = `${e.clientX}px`;  // အနောက်သို့ အကွာအဝေး
        ripple.style.top = `${e.clientY}px`;   // အထက်သို့ အကွာအဝေး

        // လက်ရှိ theme ကို ရယူခြင်း (dark သို့ light)
        const currentTheme = body.getAttribute('data-theme');
        // Ripple အရောင်ကို အပြည့်စုံခြင်း (အညာမည်းလျှင် အဖြူရောင်၊ အဖြူရောင်လျှင် အညာမည်း)
        ripple.style.backgroundColor = currentTheme === 'dark' ? '#ffffff' : '#0a0a0f';

        // Ripple ကို လှုပ်ရှားမည့် animation ထည့်သွင်းခြင်း
        ripple.classList.add('animate');

        // နောက်လွှာ theme သုံး་ပြီးခြင်း (အပြည့်စုံ ပြောင်းလဲခြင်း)
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // 400ms (0.4 ဆက္ကန်) ကျော်သည့်အခါ theme ကို အဆင်ပြေခြင်း
        setTimeout(() => {
            // Body ကို အသစ် theme ဖြင့် သတ်မှတ်ခြင်း
            body.setAttribute('data-theme', newTheme);
            // Browser တွင် theme ကို သိုလှယ်ခြင်း (လူမှီ ပြန်လည်ဖွင့်လည်း ထိန်းသိမ်းခြင်း)
            localStorage.setItem('theme', newTheme);
            // Icon ကို အဆင်သြင်းခြင်း
            updateThemeIcon(newTheme);
        }, 400);

        // 800ms (0.8 ဆက္ကန်) ကျော်သည့်အခါ ripple element ကို ဖျက်ခြင်း
        setTimeout(() => {
            // Ripple div ကို HTML မှ ဖယ်ရှားခြင်း
            ripple.remove();
        }, 800);
    });

    // Theme icon ကို အဆင်သြင်းခြင်းအတွက် function
    // @param {string} theme - လက်ရှိ theme ('light' သို့ 'dark')
    function updateThemeIcon(theme) {
        // Theme အဖြူရောင်ဒြီသုံးလျှင် Sun icon ပြောင်းခြင်း
        if (theme === 'light') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            // Theme အညာမည်းသုံးလျှင် Moon icon ပြောင်းခြင်း
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }


    // ====== TYPING EFFECT (စာလုံးတွေ တစ်ခုချင်း ရေးဆွဲခြင်း) ======
    // Typing effect ကိုကွတ်ပြလုံးအတွက် element
    const typedTextEl = document.getElementById('typed-text');
    // အလှည့်အစားကွိုးရှီဖြစ်လုံးစုံ array
    const words = ['Fullstack Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
    // လက်ရှိ အလုံးစုံ word ၏ အစီအစဉ်
    let wordIndex = 0;
    // လက်ရှိ စာလုံးအစီအစဉ် (သုံးယူ တစ်ခုချင်းစီ character)
    let charIndex = 0;
    // အမေး ဖျက်မည်လျှင် true
    let isDeleting = false;
    // ရေးဆွဲခြင်း သို့ ဖျက်ခြင်း အလျင် (milliseconds)
    let typeSpeed = 100;

    // Typing effect အားလုံးလုပ်ဆောင်မည့် main function
    function typeEffect() {
        // လက်ရှိ word ကို ရယူခြင်း
        const currentWord = words[wordIndex];

        // အမေး ဖျက်သည့် အခါ
        if (isDeleting) {
            // စာလုံးကို မြန်သည့်အနည်းအလဒ်များမှ ဆွဲဖျက်ခြင်း
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;  // ဖျက်ခြင်း သည့်နည်းအထူး မြန်ခြင်း
        } else {
            // စာလုံးကို တစ်ခုချင်းစီ ရေးသားခြင်း
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;  // ရေးခြင်း အလျင်
        }

        // အလုံးအစုံ word ရေးပြီးလျှင်
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;  // 2 ဆက္ကန်နေထိုင်ခြင်း
            isDeleting = true;  // ဖျက်မည့်အခြေအေကျ သတ်မှတ်ခြင်း
        } else if (isDeleting && charIndex === 0) {
            // အလုံးစုံ ဖျက်ပြီးလျှင်
            isDeleting = false;  // ရေးမည့်အခြေအေကျ သတ်မှတ်ခြင်း
            // နောက် word သို့ အလှည့်လှည့်ခြင်း (စာအလုံးများပြည်ကျလျှင် ပထမ word သို့ ပြန်ခြင်း)
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;  // နောက် word ကိုမီ ခြင်း
        }

        // typeEffect function ကို ပုံမှန်မြန်မြန် ခေါ်ခြင်း (recursion)
        setTimeout(typeEffect, typeSpeed);
    }

    // Typing effect စတင်ခြင်း
    typeEffect();


    // ====== NAVBAR SCROLL EFFECT (စာမျက်နှာ စကျဆင်းလျှင် Navbar များအုပ်စုံခြင်း) ======
    // Navigation bar element ကို ရယူခြင်း
    const navbar = document.getElementById('navbar');

    // Window scroll ဖြစ်သည့်အခါ အလုပ်လုပ်မည့်နည်း
    window.addEventListener('scroll', () => {
        // အထက်သို့ 50 pixel အထက်သို့ ဆင်းလျှင်
        if (window.scrollY > 50) {
            // Navbar ကို 'scrolled' class ထည့်သွင်းခြင်း (CSS မှ ကလုတ်အုပ်စုံလုံ)
            navbar.classList.add('scrolled');
        } else {
            // အထက်သို့ 50 pixel အတွင်းဖြည့်ခြင်း (scrolled class ဖယ်ရှားခြင်း)
            navbar.classList.remove('scrolled');
        }
    });


    // ====== MOBILE NAV TOGGLE (Mobile မှာ Menu ဖွင့်ပိတ်ခြင်း) ======
    // Hamburger menu ခလုတ် element ကို ရယူခြင်း
    const navToggle = document.getElementById('nav-toggle');
    // Navigation menu container ကို ရယူခြင်း
    const navMenu = document.getElementById('nav-menu');

    // Hamburger ခလုတ်ကို နှိပ်သည့်အခါ အလုပ်လုပ်မည့်နည်း
    navToggle.addEventListener('click', () => {
        // Hamburger icon ကို 'active' class ဘယ်လုံစုံ သွင်းခြင်း (icon အလုပ်အစားတည့်တောင်ခြင်း)
        navToggle.classList.toggle('active');
        // Navigation menu ကို 'active' class ဘယ်လုံစုံ သွင်းခြင်း (menu ပွင့်လင်းခြင်း)
        navMenu.classList.toggle('active');
    });

    // Menu item တွေကို နှိပ်သည့်အခါ menu ကို ပိတ်ခြင်း
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Hamburger icon ကို 'active' class ဖယ်ရှားခြင်း (ပုံမှန်အနေအထား)
            navToggle.classList.remove('active');
            // Navigation menu ကို 'active' class ဖယ်ရှားခြင်း (menu ပိတ်ခြင်း)
            navMenu.classList.remove('active');
        });
    });


    // ====== ACTIVE NAV LINK ON SCROLL & SLIDING INDICATOR (စကျဆင်းတစ်တိုင်း ထိုချက်သီးခြင်း) ======
    // အလုံးလုံးမျက်နှာများကို ရယူခြင်း (id attribute ရှိသည့်စာမျက်နှာများ)
    const sections = document.querySelectorAll('section[id]');
    // Navigation link တွေကို အလုံးအစုံ ရယူခြင်း
    const navLinks = document.querySelectorAll('.nav-link');

    // Sliding indicator (ကွန်တန်အောက်မှာ အလုံးအစုံစုံခြင်းနည်း) ဖန်တီးခြင်း
    const navIndicator = document.createElement('div');
    // Element ကို nav-indicator class ထည့်သွင်းခြင်း
    navIndicator.classList.add('nav-indicator');
    // Navigation menu အတွင်း indicator ထည့်သွင်းခြင်း
    navMenu.appendChild(navIndicator);

    // Navigation indicator ကို အဆင်သြင်းခြင်းအတွက် function
    // @param {HTMLElement} activeLink - လက်ရှိ active している nav-link
    function updateNavIndicator(activeLink) {
        if (activeLink) {
            // Indicator ၏ အကျယ်အဝန် (active link များုံအကျယ်)
            navIndicator.style.width = `${activeLink.offsetWidth}px`;
            // Indicator ၏ အနေအထား (active link ၏ အနောက်သို့ အကွာအဝေး)
            navIndicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
            // Indicator ကိုပွင့်လင်းခြင်း
            navIndicator.style.opacity = '1';
        } else {
            // Indicator ကိုအခြင်းအလုံးတည့်တောင်ခြင်း (မြင်သည့်အကျ)
            navIndicator.style.opacity = '0';
        }
    }

    // Page load ဖြစ်သည့်အခါ indicator ကို အဆင်သြင်းခြင်း
    setTimeout(() => {
        // လက်ရှိ active nav-link ကို ရယူခြင်း
        const initialActive = document.querySelector('.nav-link.active');
        // Indicator ကို အဆင်သြင်းခြင်း
        updateNavIndicator(initialActive);
    }, 100);

    // Scroll နေတုန်းက active nav link ကို အဆင်သြင်းခြင်းအတွက် function
    function highlightNav() {
        // အထက်သို့ scroll အကွာအဝေး +'100' ကို အသုံးမည့် (adjustment အတွက်)
        const scrollY = window.scrollY + 100;
        // Active link ကိုရွေးချယ်ခြင်းခြင်း မဟုတ်ခြည့်ဆွဲခြင်း tracking
        let foundActive = false;

        // Section တစ်ခုချင်းစီ အတွက် loop
        sections.forEach(section => {
            // Section ၏ အထက်သို့ အနေအထား
            const sectionTop = section.offsetTop;
            // Section ၏ အမြင့် (အုပ်စုံအကျယ်)
            const sectionHeight = section.offsetHeight;
            // Section ၏ id attribute
            const sectionId = section.getAttribute('id');

            // လက်ရှိ scroll အနေအထား section နေရာတည့်တောင်ခြည့်ဆွဲခြည့်ဆွဲခြင်းနည်း
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Navlinks တွေမှ active class ဖယ်ရှားခြင်း
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // လက်ရှိ section နငှာ ချူးထည့်ငင့ nav-link လျှင်
                    if (link.getAttribute('href') === '#' + sectionId) {
                        // ထိုน‌ link ကို active လုပ်ခြင်း
                        link.classList.add('active');
                        // Indicator ကို သုံးစည့်ခြင်း
                        updateNavIndicator(link);
                        foundActive = true;
                    }
                });
            }
        });

        // Page အထက်ဆုံးတည့်တောင်ခြည့်ဆွဲခြည့်ဆွဲခြင်းနည်း (ပထမဆုံး link အတွက်)
        if (!foundActive && window.scrollY < 100) {
            // Indicator ကီုန်စတင်ခြင်း (ပထမ nav link အငါ)
            updateNavIndicator(navLinks[0]);
        }
    }

    // Window scroll ဖြစ်သည့်အခါ highlightNav function ခေါ်ခြင်း
    window.addEventListener('scroll', highlightNav);

    // Window အကျယ်အဝန်ပြောင်းလဲသည့်အခါ indicator ကို အဆင်သြင်းခြင်း
    window.addEventListener('resize', () => {
        // လက်ရှိ active nav-link ကို ရယူခြင်း
        const activeItem = document.querySelector('.nav-link.active');
        // အကယ်၍ active item ရှိခြည့်ဆွဲခြည့်ဆွဲခြည့်ဆွဲခြン indicator ကို အဆင်သြင်းခြင်း
        if (activeItem) updateNavIndicator(activeItem);
    });


    // ====== SCROLL ANIMATIONS (Intersection Observer - စာမျက်နှာ ခြင်းလျင် ပွင့်လင်းခြင်း) ======
    // Animation လုပ်ဆောင်မည့် element တွေကိုရယူခြင်း (animate-on-scroll class ရှိသည့်)
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    // Intersection Observer ဖန်တီးခြင်း (element မြင်ပြလျှင် အလုပ်လုပ်မည့် observer)
    const observer = new IntersectionObserver((entries) => {
        // မြင်ပြသည့် element တစ်ခုချင်းစီ အတွက် loop
        entries.forEach((entry, index) => {
            // Element မြင်ပြလျှင် (viewport အတွင်း ရောက်ခြည့်ဆွဲခြည့်ဆွဲခြင်း)
            if (entry.isIntersecting) {
                // Animation ကို အနည်းအလဒ် delay လုပ်ခြင်း (index * 100, ဒုတိယခြင်း delay ၁၀၀ms)
                setTimeout(() => {
                    // Element ကို 'visible' class ထည့်သွင်းခြင်း (CSS မှ animation စတင်သည့်)
                    entry.target.classList.add('visible');
                }, index * 100);
                // Element ကို observer မှ ဖယ်ရှားခြင်း (နောက်တစ်ခါ မလုပ်ဆောင်မည့်)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element မြင်ပြခြင်း၏ အနည်းဆုံး ရာခိုင်နှုန်း (15% မြင်ပြခြည့်ဆွဲခြည့်ဆွဲခြင်းနည်း)
        threshold: 0.15,
        // Root margin (element ကို viewport မြင်မြင်သည့်အခင်း အကွာအဝေး)
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate element တစ်ခုချင်းစီကို observe လုပ်ခြင်း
    animateElements.forEach(el => observer.observe(el));


    // ====== SKILL BAR ANIMATION (ကျွမ်းကျင်မှု အတိုးအလျင် အုပ်စုံခြင်း) ======
    // Skill progress bar element တွေကိုရယူခြင်း (.skill-bar-fill class ရှိသည့်)
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // Skill bars အတွက် Intersection Observer တည်ဆောက်ခြင်း
    const skillObserver = new IntersectionObserver((entries) => {
        // Viewport အတွင်း ရောက်သည့် skill bar တစ်ခုချင်းစီ အတွက် loop
        entries.forEach(entry => {
            // Element မြင်ပြလျှင် (skill section မြင်ပြခြည့်ဆွဲခြည့်ဆွဲခြည့်ဆွဲခြင်း)
            if (entry.isIntersecting) {
                // 'animate' class ထည့်သွင်းခြင်း (CSS မှ animation စတင်သည့်)
                entry.target.classList.add('animate');
                // Observer မှ ဖယ်ရှားခြင်း (တစ်ကြိမ်သာ animate လုပ်သည့်)
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        // Element မြင်ပြခြင်း၏ အနည်းဆုံး ရာခိုင်နှုန်း (50% မြင်ပြခြည့်ဆွဲခြည့်ဆွဲခြင်းနည်း)
        threshold: 0.5
    });

    // Skill bar တစ်ခုချင်းစီကို observe လုပ်ခြင်း
    skillBars.forEach(bar => skillObserver.observe(bar));


    // ====== PARTICLE BACKGROUND & INTERACTION (လူမှီ အခွံတွေ လှုပ်ရှားခြင်း) ======
    // Particle component ကည့်ခြင်း container
    const particlesContainer = document.getElementById('particles');
    // Particle အရည်အသွေးများကို သိုလှယ်မည့် array
    const particlesArray = [];
    // လူမှီ cursor ၏ အနောက်သို့ အနေအထား
    let mouseX = window.innerWidth / 2;
    // လူမှီ cursor ၏ အထက်သို့ အနေအထား
    let mouseY = window.innerHeight / 2;

    // Particle တွေ ဖန်တီးခြင်းအတွက် function
    function createParticles() {
        // ဖန်တီးမည့် particle အရေအတွက် (၃၀ လုံး)
        const particleCount = 30;

        // အလုံးအစုံ particle တွေ တည်ဆောက်ခြင်း
        for (let i = 0; i < particleCount; i++) {
            // Particle တစ်ခုအတွက် div element တည်ဆောက်ခြင်း
            const particle = document.createElement('div');
            // 'particle' class ထည့်သွင်းခြင်း
            particle.classList.add('particle');

            // Particle ၏ စဥ်စာ အနေအထား (random)
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // Particle အနေအထား css မှာ သတ်မှတ်ခြင်း
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            // Particle လှုပ်ရှားမှု အချိန် (8-18 ဆက္ကန်)
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            // Particle လှုပ်ရှားမှု စတင်မည့် အချိန် (0-5 ဆက္ကန်)
            particle.style.animationDelay = (Math.random() * 5) + 's';
            // Particle အကျယ် (1-4 pixel)
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            // Particle အမြင့် (အကျယ်နဲ့ တူခြင်း - အလုံး ပုံစံ)
            particle.style.height = particle.style.width;

            // Particle को HTML မှ ထည့်သွင်းခြင်း
            particlesContainer.appendChild(particle);

            // Particle အရည်အသွေး array မှာ ထည့်သွင်းခြင်း
            particlesArray.push({
                el: particle,              // Particle element
                x: x,                      // လက်ရှိ အနောက်သို့ အနေအထား
                y: y,                      // လက်ရှိ အထက်သို့ အနေအထား
                baseX: x,                  // မူလ အနောက်သို့ အနေအထား (ပြန်ရန်)
                baseY: y,                  // မူလ အထက်သို့ အနေအထား (ပြန်ရန်)
                density: (Math.random() * 5) + 1  // Particle ၏ ကုန်အလုံး (mouse interaction အတွက်)
            });
        }
    }

    // Particle တွေ ဖန်တီးခြင်း (စတင်ခြင်း)
    createParticles();

    // Particle တွေကို လူမှီ cursor အနေအထားအရ လှုပ်ရှားခြင်းအတွက် function
    function animateParticles() {
        // Particle တစ်ခုချင်းစီ အတွက် loop
        particlesArray.forEach(p => {
            // Particle နှင့် mouse ကြား အကွာအဝေး ပညာခြင်း (x အကွာအဝေး)
            let dx = mouseX - p.x;
            // Particle နှင့် mouse ကြား အကွာအဝေး ပညာခြင်း (y အကွာအဝေး)
            let dy = mouseY - p.y;
            // အကွာအဝေး ကိုက်ခြင်း (Pythagorean formula)
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Interaction radius: 150px (အကွာအဝေး)
            if (distance < 150) {
                // Particle ကို ပန့်လှန်းခြင်း (mouse နှင့်ဝေးခြင်း)
                // Force ၏ အရပ်သတ် (mouse မှ particle သို့ အရပ်သတ်)
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                // Force အင်အားပြည့် (mouse အနီးကျ particle ပိုမိုအင်အားရ)
                const force = (150 - distance) / 150;

                // X အရပ်သတ် push အင်အား
                const pushX = forceDirectionX * force * p.density * 5;
                // Y အရပ်သတ် push အင်အား
                const pushY = forceDirectionY * force * p.density * 5;

                // Particle အနေအထား ပြောင်းလဲခြင်း (ဝေးရန်)
                p.x -= pushX;
                p.y -= pushY;
            } else {
                // အကွာအဝေး ၁၅၀px ထက်မြင့်လျှင် မူလ အနေအထား သို့ ပြန်ခြင်း
                // X အနေအထား ပြန်ခြင်း
                if (p.x !== p.baseX) {
                    p.x -= (p.x - p.baseX) / 10;  // 천천히 ပြန်ခြင်း (division 10)
                }
                // Y အနေအထား ပြန်ခြင်း
                if (p.y !== p.baseY) {
                    p.y -= (p.y - p.baseY) / 10;  // 천천히 ပြန်ခြင်း (division 10)
                }
            }

            // Particle element ၏ အနေအထား CSS မှာ အဆင်သြင်းခြင်း
            // translate(x, y) = x && y pixel အကွာအဝေးတည်ခြင်း
            p.el.style.transform = `translate(${p.x - p.baseX}px, ${p.y - p.baseY}px)`;
        });

        // Animation ကို ပုံမှန်မြန်မြန် ပြန်ခေါ်ခြင်း (requestAnimationFrame - 60fps အတွက်၍)
        requestAnimationFrame(animateParticles);
    }

    // Particle animation စတင်ခြင်း
    animateParticles();


    // ====== CONTACT FORM (ဆက်သွယ်မှု ဖွင့်ခြင်း form) ======
    // Contact form element ကိုရယူခြင်း
    const contactForm = document.getElementById('contact-form');

    // Contact form submit ဖြစ်သည့်အခါ အလုပ်လုပ်မည့်နည်း
    contactForm.addEventListener('submit', (e) => {
        // Default form submission ကို ငြင်းခြင်း (page reload မဖြစ်ရန်)
        e.preventDefault();

        // Form မှ user ၏ အချက်အလက်များ ရယူခြင်း
        const name = document.getElementById('form-name').value;      // အမည်
        const email = document.getElementById('form-email').value;    // အီးမေးလ်
        const message = document.getElementById('form-message').value; // စာသားအကြောင်းအရာ

        // Submit button element ကိုရယူခြင်း
        const btn = contactForm.querySelector('.btn-primary');
        // Button ၏မူလ HTML သိုလှယ်ခြင်း (နောက်မှာ ပြန်ပြသည့် အတွက်)
        const originalHTML = btn.innerHTML;

        // Submit အောင်မြင်းသည့်အကြောင်း ပြတင်းဖွင့်ခြင်း
        // Check icon + message ပြလုံး
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        // Button အရောင်ကို အစိမ်းရောင် gradient သို့ ပြောင်းခြင်း
        btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';

        // 3 ဆက္ကန်ကျော်သည့်အခါ button ကို မူလအနေအထား သို့ ပြန်ခြင်း
        setTimeout(() => {
            // Button HTML ကို မူလုံပြန်ခြင်း
            btn.innerHTML = originalHTML;
            // Button အရောင်ကို သုံးမည့်ခြင်း (CSS style ကို ဖယ်ရှားခြင်း)
            btn.style.background = '';
            // Form ၏ input တွေကို အလုံးအစုံ ရှင်းခြင်း (နောက်တစ်ခါ အသုံးပြုရန်)
            contactForm.reset();
        }, 3000);
    });


    // ====== PRELOADER & SMOOTH REVEAL (NeoLeaf Style) ======
    const preloader = document.getElementById('preloader');
    const loadingCounter = document.getElementById('loading-counter');
    const liquidLogo = document.querySelector('.liquid-logo');

    if (preloader && loadingCounter && liquidLogo) {
        let progress = 0;

        // Add transitions for smooth color switching
        loadingCounter.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
        liquidLogo.style.transition = 'background-position 0.1s linear, filter 0.3s ease, -webkit-text-stroke 0.3s ease';

        function updateProgress() {
            // Randomly increase progress for realistic loading feel
            progress += Math.random() * 4 + 1;

            if (progress > 100) progress = 100;

            // Determine dynamic colors based on percentage
            let color = '#ffffff';
            if (progress <= 20) {
                color = '#ff4757'; // Red
            } else if (progress <= 40) {
                color = '#ffa502'; // Orange
            } else if (progress <= 60) {
                color = '#eccc68'; // Yellow
            } else if (progress <= 80) {
                color = '#2ed573'; // Green
            } else {
                color = '#00d4aa'; // Cyan (Brand Accent)
            }

            // Update counter text and color
            loadingCounter.textContent = Math.floor(progress) + '%';
            loadingCounter.style.color = color;
            loadingCounter.style.textShadow = `0 0 10px ${color}`;

            // Fill the logo text with liquid of current color
            liquidLogo.style.backgroundImage = `linear-gradient(to top, ${color} 50%, transparent 50%)`;
            liquidLogo.style.backgroundPosition = `0% ${progress}%`;

            // Enhance visibility with stroke and glow against dark background
            liquidLogo.style.webkitTextStroke = `1.5px ${color}`;
            liquidLogo.style.filter = `drop-shadow(0 0 15px ${color}66)`; // 66 is hex opacity for ~40%

            if (progress < 100) {
                // Loop with a random delay
                setTimeout(updateProgress, Math.random() * 80 + 20);
            } else {
                // Done loading. Enhance glow at 100%
                liquidLogo.style.filter = `drop-shadow(0 0 30px ${color})`;

                // Wait a fraction of a second, then fade out
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800);
                }, 400);
            }
        }

        // Start the fake loading sequence
        updateProgress();
    }


    // ====== CUSTOM CURSOR IMPLEMENTATION (ကိုယ့်သီးခွဲ Mouse cursor အုပ်စုံခြင်း) ======
    // Custom cursor dot (သေးသေးသော အမြီုလေး) ဖန်တီးခြင်း
    const cursor = document.createElement('div');
    // Cursor dot element အင ္ အည ထည့်သွင်းခြင်း
    cursor.classList.add('custom-cursor');

    // Custom cursor follower (လွတ်လွတ်သေးသေး အမြီုလေး) ဖန်တီးခြင်း
    const cursorFollower = document.createElement('div');
    // Cursor follower element အည ထည့်သွင်းခြင်း
    cursorFollower.classList.add('custom-cursor-follower');

    // Custom cursor element တွေကို HTML မှာ ထည့်သွင်းခြင်း
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    // Cursor dot ၏ လက်ရှိ အနေအထား
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    // Cursor follower ၏ လက်ရှိ အနေအထား
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    // Mouse လှုပ်ရှားသည့်အခါ အလုပ်လုပ်မည့်နည်း
    window.addEventListener('mousemove', (e) => {
        // Cursor dot အနေအထား အဆင်သြင်းခြင်း (နေတကျအစ)
        cursorX = e.clientX;
        cursorY = e.clientY;

        // Particle interaction အတွက် mouse အနေအထား အဆင်သြင်းခြင်း
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Cursor dot ကို mouse အနေအထား သို့ အစီအစဉ်ခြင်း (အလျင်မြန်ခြင်း)
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });

    // Cursor follower ကို အချိန်နှင့်အမျှ လွတ်လွတ် လုံးလုံးသည့် function
    function animateCursorFollower() {
        // Follower ကို cursor သို့ နှေးနှေး နီးကပ်စေခြင်း (interpolation)
        // 0.15 = လွတ်လွတ် အလျင် (ကျယ်ကျယ်စွာ နီးကပ်သည့်)
        followerX += (cursorX - followerX) * 0.15;
        followerY += (cursorY - followerY) * 0.15;

        // Cursor follower အနေအထား CSS မှ အဆင်သြင်းခြင်း
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        // Animation ကို ပုံမှန်မြန်မြန် ပြန်ခေါ်ခြင်း
        requestAnimationFrame(animateCursorFollower);
    }
    // Cursor follower animation စတင်ခြင်း
    animateCursorFollower();

    // အင်္စကေးလုံးအစုံ (a, button, etc) အတွက် hover state ထည့်သွင်းခြင်း
    // နှိုးခြင်း element တွေကိုရယူခြင်း (links, buttons, custom hover, project cards, btn class)
    const interactives = document.querySelectorAll('a, button, .custom-hover, .project-card, .btn');
    // Element တစ်ခုချင်းစီ အတွက် loop
    interactives.forEach(el => {
        // Mouse element ၏ အပေါ်သို့ အခုံခြင်းအခါ
        el.addEventListener('mouseenter', () => {
            // Body မှ 'cursor-hover' class ထည့်သွင်းခြင်း (CSS မှ cursor ကြီးလာခြင်း)
            document.body.classList.add('cursor-hover');
        });
        // Mouse element မှ ထွက်သည့်အခါ
        el.addEventListener('mouseleave', () => {
            // Body မှ 'cursor-hover' class ဖယ်ရှားခြင်း (cursor မူလအကျယ်သို့ ပြန်ခြင်း)
            document.body.classList.remove('cursor-hover');
        });
    });

});
