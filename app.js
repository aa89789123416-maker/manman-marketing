/* ===========================
   漫漫行銷 — Shared JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // Mobile Nav Toggle
  // ===========================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ===========================
  // FAQ Accordion
  // ===========================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (btn && answer) {
      btn.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(i => {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
        });

        // Open clicked (if not already open)
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ===========================
  // Scroll Animations (Intersection Observer)
  // ===========================
  const fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger children if it's a grid
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach((el, i) => {
      // Add stagger delay to grid items
      if (el.classList.contains('grid-2') ||
          el.classList.contains('grid-3') ||
          el.classList.contains('grid-4')) {
        el.querySelectorAll(':scope > *').forEach((child, j) => {
          child.style.transitionDelay = (j * 80) + 'ms';
        });
      }
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ===========================
  // Smooth scroll for anchor links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===========================
  // Pricing Category Scroll Helper (pricing.html)
  // ===========================
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // ===========================
  // Sticky Navbar shadow on scroll
  // ===========================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      } else {
        navbar.style.boxShadow = '';
      }
    }, { passive: true });
  }

  // ===========================
  // Mobile Sticky CTA visibility
  // ===========================
  const mobileStickyCta = document.getElementById('mobileStickyCta');
  if (mobileStickyCta) {
    // Already visible by default on mobile via CSS
    // Hide on scroll past hero, show when scrolled enough
  }

  // ===========================
  // Category buttons on pricing page
  // ===========================
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // ===========================
  // Process steps hover
  // ===========================
  document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', function () {
      const icon = this.querySelector('.step-icon');
      if (icon && !icon.classList.contains('active')) {
        icon.style.borderColor = 'var(--primary)';
        icon.style.background = 'var(--primary-50)';
      }
    });
    step.addEventListener('mouseleave', function () {
      const icon = this.querySelector('.step-icon');
      if (icon && !icon.classList.contains('active')) {
        icon.style.borderColor = '';
        icon.style.background = '';
      }
    });
  });

  // ===========================
  // Auto-generate order number on success page
  // ===========================
  const orderNumEl = document.getElementById('orderNum');
  if (orderNumEl && !orderNumEl.dataset.set) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 90000) + 10000);
    orderNumEl.textContent = `MM-${year}${month}${day}-${rand}`;
    orderNumEl.dataset.set = 'true';
  }

  // ===========================
  // Brief form step indicator scroll
  // ===========================
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    const activeStep = progressBar.querySelector('.progress-step.active');
    if (activeStep) {
      activeStep.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // ===========================
  // Auto-select plan from URL on order page
  // ===========================
  if (window.location.pathname.includes('order.html')) {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    if (plan) {
      const selector = document.getElementById('planSelector');
      if (selector && typeof updatePlan !== 'undefined') {
        selector.value = plan;
        updatePlan(plan);
      }
    }
  }

  // ===========================
  // Floating button visibility
  // ===========================
  const floatingBtns = document.querySelector('.floating-btns');
  if (floatingBtns) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.scrollY;
      if (currentScroll < 200) {
        floatingBtns.style.opacity = '0';
        floatingBtns.style.transform = 'translateY(20px)';
        floatingBtns.style.pointerEvents = 'none';
      } else {
        floatingBtns.style.opacity = '1';
        floatingBtns.style.transform = 'translateY(0)';
        floatingBtns.style.pointerEvents = '';
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // Initial state
    floatingBtns.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    if (window.scrollY < 200) {
      floatingBtns.style.opacity = '0';
      floatingBtns.style.transform = 'translateY(20px)';
      floatingBtns.style.pointerEvents = 'none';
    }
  }

  // ===========================
  // Pricing card hover ripple effect
  // ===========================
  document.querySelectorAll('.pricing-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease';
    });
  });

  // ===========================
  // Form input focus animation
  // ===========================
  document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.querySelector('.form-label')?.style &&
        (this.parentElement.querySelector('.form-label').style.color = 'var(--primary)');
    });
    input.addEventListener('blur', function () {
      this.parentElement.querySelector('.form-label')?.style &&
        (this.parentElement.querySelector('.form-label').style.color = '');
    });
  });

  // ===========================
  // Stats counter animation
  // ===========================
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('counted');
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }

});
