/**
 * 123 MOBILE HOUSE — OFFICIAL JAVASCRIPT
 * Bishal Chowk, Bharatpur, Chitwan, Nepal
 * Phone & WhatsApp: +977 9844338306
 * Developer: Rajan Sharma
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var SHOP_PHONE = '9779844338306';
  var WA_BASE = 'https://wa.me/' + SHOP_PHONE + '?text=';

  /* ------------------------------------------------------------------------
     1. Sticky Header & Scroll Spy
     ------------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header shadow on scroll
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy
    var currentSectionId = '';
    sections.forEach(function (sec) {
      var top = sec.offsetTop - 120;
      var height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var drawerBackdrop = document.getElementById('mobileDrawer');
  var drawerCloseBtn = document.getElementById('drawerCloseBtn');
  var drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openDrawer() {
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', function (e) {
      if (e.target === drawerBackdrop) {
        closeDrawer();
      }
    });
  }

  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ------------------------------------------------------------------------
     3. Catalog Brand Filtering
     ------------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var brandTiles = document.querySelectorAll('.brand-tile');
  var phoneCards = document.querySelectorAll('.phone-item-card');

  function filterPhonesByBrand(brand) {
    // Update filter buttons
    filterButtons.forEach(function (btn) {
      if (btn.getAttribute('data-brand') === brand) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update brand tiles in brand strip
    brandTiles.forEach(function (tile) {
      if (tile.getAttribute('data-brand') === brand) {
        tile.classList.add('active');
      } else {
        tile.classList.remove('active');
      }
    });

    // Filter cards
    phoneCards.forEach(function (card) {
      var cardBrand = card.getAttribute('data-brand');
      if (brand === 'all' || cardBrand === brand) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var brand = this.getAttribute('data-brand');
      filterPhonesByBrand(brand);
    });
  });

  brandTiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      var brand = this.getAttribute('data-brand');
      filterPhonesByBrand(brand);
      // Smooth scroll to catalog
      var catalogSec = document.getElementById('phones');
      if (catalogSec) {
        catalogSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. Interactive Phone Finder & Recommendation Engine
     ------------------------------------------------------------------------ */
  var finderBudget = document.getElementById('finderBudget');
  var finderNeed = document.getElementById('finderNeed');
  var finderBrand = document.getElementById('finderBrand');
  var finderTitle = document.getElementById('finderRecTitle');
  var finderDesc = document.getElementById('finderRecDesc');
  var finderBadge = document.getElementById('finderRecBadge');
  var finderWaBtn = document.getElementById('finderWaBtn');

  var recommendationDatabase = {
    'budget-student': {
      title: 'Redmi Note 13 / Samsung Galaxy A15',
      desc: 'Top choice under NPR 25k — vivid AMOLED display, solid 5000mAh battery, and reliable everyday multitasking for classes & social media.',
      badge: 'Best Value for Students',
      model: 'Redmi Note 13 / Samsung Galaxy A15'
    },
    'budget-camera': {
      title: 'Redmi Note 13 Pro (200MP) / Vivo Y28',
      desc: 'Clear 200MP sensor with OIS stabilization and portrait lighting modes at an accessible price point.',
      badge: 'Budget Portrait Pick',
      model: 'Redmi Note 13 Pro 200MP'
    },
    'budget-gaming': {
      title: 'Infinix Note 40 / Realme 12',
      desc: 'High refresh rate 120Hz display, dedicated gaming mode, bypass charging, and stereo speakers.',
      badge: 'Budget Gaming Value',
      model: 'Infinix Note 40 / Realme 12'
    },
    'budget-battery': {
      title: 'Samsung Galaxy A15 / Redmi 13C (6000mAh Class)',
      desc: 'All-day to 2-day dependable endurance with power-efficient processor and fast charging support.',
      badge: 'Long Battery Champion',
      model: 'Samsung Galaxy A15 5000mAh'
    },
    'mid-student': {
      title: 'Samsung Galaxy A35 5G / OnePlus Nord 4',
      desc: 'Super AMOLED display, 4-year Android OS upgrades, Knox security, and fast 5G connectivity.',
      badge: 'Smart All-Rounder',
      model: 'Samsung Galaxy A35 5G'
    },
    'mid-camera': {
      title: 'Vivo V40 5G (ZEISS Optics) / Oppo Reno 12 5G',
      desc: 'Professional studio portrait aura light, ZEISS natural color processing, and ultra-sharp selfie cameras.',
      badge: 'Portrait & Studio Camera',
      model: 'Vivo V40 5G with ZEISS'
    },
    'mid-gaming': {
      title: 'OnePlus Nord 4 5G / Poco X6 Pro',
      desc: 'Snapdragon gaming chipset, large cooling chamber, 100W SuperVOOC charge, and 120Hz esports display.',
      badge: 'Performance & Gaming',
      model: 'OnePlus Nord 4 5G'
    },
    'mid-battery': {
      title: 'Samsung Galaxy A55 5G / Vivo V40 (5500mAh)',
      desc: 'Extra-capacity battery with intelligent battery protection and metal armor frame.',
      badge: 'Heavy Usage & Travel',
      model: 'Samsung Galaxy A55 5G'
    },
    'flagship-student': {
      title: 'Apple iPhone 15 / Galaxy S24',
      desc: 'Compact powerhouse with seamless iOS ecosystem, long-term trade-in value, and cinematic cameras.',
      badge: 'Premium Daily Driver',
      model: 'Apple iPhone 15'
    },
    'flagship-camera': {
      title: 'Samsung Galaxy S24 Ultra / iPhone 16 Pro Max',
      desc: '200MP Quad Zoom with 100x Space Zoom, 4K120fps Dolby Vision, ProRAW photos, and titanium frame.',
      badge: 'Ultimate Camera Flagship',
      model: 'Samsung Galaxy S24 Ultra & iPhone 16 Pro Max'
    },
    'flagship-gaming': {
      title: 'OnePlus 12 (Snapdragon 8 Gen 3) / iPhone 16 Pro',
      desc: 'Console-grade hardware ray tracing, 16GB RAM, 100W flash charging, and fluid 120Hz ProMotion.',
      badge: 'Extreme Flagship Gaming',
      model: 'OnePlus 12 / iPhone 16 Pro'
    },
    'flagship-battery': {
      title: 'Samsung Galaxy S24 Ultra (5000mAh AI Optimized)',
      desc: 'Intelligent power management delivering 1.5+ days of intense productivity and S-Pen navigation.',
      badge: 'Flagship Battery King',
      model: 'Samsung Galaxy S24 Ultra'
    }
  };

  function updateRecommendation() {
    if (!finderBudget || !finderNeed) return;
    var b = finderBudget.value; // budget, mid, flagship
    var n = finderNeed.value;     // student, camera, gaming, battery
    var key = b + '-' + n;

    var rec = recommendationDatabase[key] || recommendationDatabase['mid-camera'];

    if (finderTitle) finderTitle.textContent = rec.title;
    if (finderDesc) finderDesc.textContent = rec.desc;
    if (finderBadge) finderBadge.textContent = rec.badge;

    if (finderWaBtn) {
      var msg = 'Hello 123 Mobile House! Based on your phone finder, I am interested in: ' + rec.model + ' (Budget tier: ' + b + ', Focus: ' + n + '). What is today\'s price and available stock at Bishal Chowk?';
      finderWaBtn.href = WA_BASE + encodeURIComponent(msg);
    }
  }

  if (finderBudget) finderBudget.addEventListener('change', updateRecommendation);
  if (finderNeed) finderNeed.addEventListener('change', updateRecommendation);
  if (finderBrand) finderBrand.addEventListener('change', updateRecommendation);

  // Initialize
  updateRecommendation();

  /* ------------------------------------------------------------------------
     5. Counter Repair Estimator
     ------------------------------------------------------------------------ */
  var repairBrand = document.getElementById('repairBrand');
  var repairIssue = document.getElementById('repairIssue');
  var repairEstimateText = document.getElementById('repairEstimateText');
  var repairTimeText = document.getElementById('repairTimeText');
  var repairWaBtn = document.getElementById('repairWaBtn');

  function updateRepairDocket() {
    if (!repairBrand || !repairIssue) return;
    var brand = repairBrand.value;
    var issue = repairIssue.value;

    var time = '30–45 Mins at Counter';
    var note = 'Inspection & testing done before any part swap.';

    if (issue.indexOf('Screen') !== -1) {
      time = '30–40 Mins';
      note = 'High quality display replacement with touch calibration & color check.';
    } else if (issue.indexOf('Battery') !== -1) {
      time = '20–30 Mins';
      note = 'Fresh original-grade battery with health calibration.';
    } else if (issue.indexOf('Charging') !== -1) {
      time = '25–45 Mins';
      note = 'Sub-board / charging port module check and cleaning.';
    } else if (issue.indexOf('Water') !== -1) {
      time = '45–90 Mins';
      note = 'Deep ultrasonic cleaning and moisture drying to prevent motherboard corrosion.';
    } else if (issue.indexOf('Software') !== -1) {
      time = '20–40 Mins';
      note = 'Official firmware flash, loop fix, and data backup where possible.';
    }

    if (repairEstimateText) {
      repairEstimateText.textContent = brand + ' — ' + issue + ' Service Docket';
    }
    if (repairTimeText) {
      repairTimeText.textContent = 'Estimated Time: ' + time + ' | ' + note;
    }

    if (repairWaBtn) {
      var msg = 'Hello 123 Mobile House Repair Support! My phone is a ' + brand + ' and it has this issue: ' + issue + '. Can I bring it to your Bishal Chowk counter today? Please give me an estimate.';
      repairWaBtn.href = WA_BASE + encodeURIComponent(msg);
    }
  }

  if (repairBrand) repairBrand.addEventListener('change', updateRepairDocket);
  if (repairIssue) repairIssue.addEventListener('change', updateRepairDocket);
  updateRepairDocket();

  /* ------------------------------------------------------------------------
     6. FAQ Accordion
     ------------------------------------------------------------------------ */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.faq-trigger');
    var content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            var otherContent = other.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          item.classList.remove('open');
          content.style.maxHeight = null;
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    var firstContent = faqItems[0].querySelector('.faq-content');
    faqItems[0].classList.add('open');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  /* ------------------------------------------------------------------------
     7. Demo Banner Dismiss
     ------------------------------------------------------------------------ */
  var demoClose = document.getElementById('demoBannerClose');
  var demoBanner = document.getElementById('demoBanner');

  if (demoClose && demoBanner) {
    demoClose.addEventListener('click', function () {
      demoBanner.style.display = 'none';
    });
  }

  /* ------------------------------------------------------------------------
     8. Smooth Anchor Scrolling Helper
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        var targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
