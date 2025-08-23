// Universal Smooth Scrolling Function
// This function can be used for any link with href="#section-id" across the entire site

document.addEventListener("DOMContentLoaded", function () {

  // Mobile breakpoint check function
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Function to disable all GSAP animations on mobile
  function disableGSAPAnimationsOnMobile() {
    if (isMobile() && typeof gsap !== 'undefined') {
      // Disable ScrollTrigger on mobile
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.disable());
      }
      
      // Pause all GSAP timelines
      gsap.globalTimeline.pause();
      
      // Disable all active tweens
      gsap.globalTimeline.getChildren().forEach(child => {
        if (child.isActive()) {
          child.pause();
        }
      });
    }
  }

  // Function to enable GSAP animations on desktop
  function enableGSAPAnimationsOnDesktop() {
    if (!isMobile() && typeof gsap !== 'undefined') {
      // Re-enable ScrollTrigger on desktop
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.enable());
      }
      
      // Resume global timeline
      gsap.globalTimeline.resume();
    }
  }

  // Listen for window resize to toggle animations
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isMobile()) {
        disableGSAPAnimationsOnMobile();
      } else {
        enableGSAPAnimationsOnDesktop();
      }
    }, 250);
  });

  // Initial check for mobile
  if (isMobile()) {
    disableGSAPAnimationsOnMobile();
  }
  
  // Small delay to ensure all scripts are loaded
  setTimeout(() => {
    // Register GSAP and ScrollToPlugin
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
    }

  // Universal smooth scroll function
  function performSmoothScroll(targetSection, targetId, clickedLink) {
    // Get header height for offset
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    // Enhanced click animation for the clicked link (only on desktop)
    if (!isMobile()) {
      gsap.to(clickedLink, {
        duration: 0.2,
        scale: 0.92,
        ease: "power2.out",
        onComplete: function () {
          gsap.to(this.targets()[0], {
            duration: 0.3,
            scale: 1,
            ease: "back.out(1.3)",
          });
        },
      });
    }

    const scrollElement = document.scrollingElement || document.documentElement;

    // Use GSAP ScrollToPlugin for smooth scrolling (enabled on all devices)
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
      gsap.to(scrollElement, {
        duration: isMobile() ? 0.8 : 1.2, // Faster on mobile
        scrollTo: {
          y: targetSection,
          offsetY: headerHeight + 20,
          autoKill: true
        },
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          // Update URL hash
          if (history.pushState) {
            history.pushState(null, null, `#${targetId}`);
          }
        }
      });
    } else {
      // Fallback if GSAP ScrollToPlugin isn't available
      console.warn("GSAP ScrollToPlugin not available, using fallback");
      const targetPosition = targetSection.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      // Update URL
      if (history.pushState) {
        history.pushState(null, null, `#${targetId}`);
      }
    }
  }

  // Function to update URL hash when scrolling to sections
  function updateURLOnScroll() {
    // Only <section> elements with an ID
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
  
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset;
      const sectionBottom = sectionTop + rect.height;
      const currentScroll = window.pageYOffset + headerHeight + 100; // Offset for better detection
  
      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        const sectionId = section.id;
        if (sectionId && history.pushState) {
          history.pushState(null, null, `#${sectionId}`);
        }
      }
    });
  }
  

  // Add scroll listener for URL hash updates
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateURLOnScroll, 100);
  });

  // Find all links with href starting with # (section links)
  const sectionLinks = document.querySelectorAll('a[href^="#"]');
  
  sectionLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get target section
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (!targetSection) {
        console.warn(`Section with id "${targetId}" not found`);
        return;
      }

      // Handle mobile menu closing if it's open
      const nav = document.querySelector(".nav");
      const hamburger = document.querySelector(".hamburger");
      
      if (nav && nav.classList.contains("mobile-open") && hamburger) {
        hamburger.click();

        // Wait for mobile menu to close before scrolling
        setTimeout(() => {
          performSmoothScroll(targetSection, targetId, this);
        }, 500);
      } else {
        performSmoothScroll(targetSection, targetId, this);
      }
    });
  });

  // Optional: Scroll to hash on page load
  const hash = window.location.hash;
  if (hash && document.querySelector(hash)) {
    setTimeout(() => {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, {
          duration: isMobile() ? 0.8 : 1.2, // Faster on mobile
          scrollTo: {
            y: hash,
            offsetY: headerHeight + 20,
            autoKill: true
          },
          ease: 'power2.inOut',
          overwrite: 'auto'
        });
      }
    }, 500); // Wait for layout/animations to finish
  }
  }, 100); // Small delay to ensure all scripts are loaded
}); 