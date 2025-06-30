document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP timeline with enhanced settings
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Set initial states explicitly with more dramatic starting positions
  gsap.set(".header", { y: -120, opacity: 1 });
  gsap.set(".logo-main", { opacity: 1, x: 0, y: 0, scale: 1 }); // Make sure logo is visible
  gsap.set(".logo-subtitle", { opacity: 0.8, x: 0, y: 0, scale: 1 }); // Make subtitle semi-visible
  
  // Set up desktop nav animation BEFORE main timeline (desktop only)
  if (window.innerWidth > 768) {
    gsap.set(".nav-list .nav-item", { opacity: 1, y: 0, scale: 1 }); // Start visible for desktop
  }

  // Enhanced Header entrance animation - simplified to avoid conflicts
  tl.to(".header", {
    duration: 1.2,
    y: 0,
    ease: "power4.out",
  })
  .from(".logo-main", {
    duration: 1.0,
    x: -80,
    opacity: 0,
    scale: 0.8,
    ease: "power3.out",
  }, "-=0.8")
  .to(".logo-subtitle", {
    duration: 0.8,
    opacity: 0.8, // Keep it visible
    ease: "power3.out",
  }, "-=0.4")
  .from(".hamburger", {
    duration: 0.6,
    scale: 0,
    opacity: 0,
    rotation: 180,
    ease: "back.out(2.5)",
  }, "-=0.4");

  // Enhanced Desktop nav items animation - ensure they stay visible
  if (window.innerWidth > 768) {
    tl.from(".nav-list .nav-item", {
      duration: 0.7,
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: {
        amount: 0.4,
        ease: "power2.out"
      },
      ease: "back.out(1.5)",
    }, "-=0.5");
  }

  // Hamburger menu functionality
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const navItems = document.querySelectorAll(".nav-item");
  const body = document.body;

  hamburger.addEventListener("click", function () {
    const isOpen = hamburger.classList.contains("active");

    if (!isOpen) {
      // Open menu with enhanced animation
      hamburger.classList.add("active");
      nav.classList.add("mobile-open");
      body.style.overflow = "hidden";

      // Enhanced menu items animation
      gsap.set(".nav-item", { opacity: 0, y: 50, scale: 0.8, rotationX: -30 });
      gsap.to(".nav-item", {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        stagger: {
          amount: 0.5,
          ease: "power2.out"
        },
        delay: 0.2,
        ease: "back.out(1.3)",
      });

      // Enhanced background animation
      gsap.fromTo(
        ".nav.mobile-open",
        { opacity: 0, scale: 0.95 },
        { 
          duration: 0.5, 
          opacity: 1, 
          scale: 1,
          ease: "power3.out" 
        }
      );
    } else {
      // Enhanced close animation
      gsap.to(".nav-item", {
        duration: 0.4,
        opacity: 0,
        y: -30,
        scale: 0.9,
        rotationX: 15,
        stagger: {
          amount: 0.2,
          ease: "power2.in"
        },
        ease: "power2.in",
        onComplete: function () {
          hamburger.classList.remove("active");
          nav.classList.remove("mobile-open");
          body.style.overflow = "";
          
          // Reset nav items to visible state for desktop
          if (window.innerWidth > 768) {
            gsap.set(".nav-list .nav-item", { opacity: 1, y: 0, scale: 1 });
          }
        },
      });
    }
  });

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (nav.classList.contains("mobile-open")) {
        hamburger.click();
      }
    });
  });

  // Close menu when clicking outside
  nav.addEventListener("click", function (e) {
    if (e.target === nav && nav.classList.contains("mobile-open")) {
      hamburger.click();
    }
  });

  // Enhanced Logo hover animations
  const logo = document.querySelector(".logo");
  const logoMain = document.querySelector(".logo-main");
  const logoSubtitle = document.querySelector(".logo-subtitle");

  logo.addEventListener("mouseenter", function () {
    // Enhanced main logo animation
    gsap.to(logoMain, {
      duration: 0.6,
      y: -12,
      scale: 1.08,
      rotationY: 8,
      ease: "back.out(1.5)",
    });

    // Enhanced subtitle animation
    gsap.to(logoSubtitle, {
      duration: 0.5,
      opacity: 0.9,
      y: -6,
      scale: 1.15,
      ease: "back.out(1.3)",
    });

    // Enhanced pulse effect
    gsap.to(logo, {
      duration: 0.15,
      scale: 1.03,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  });

  logo.addEventListener("mouseleave", function () {
    gsap.to([logoMain, logoSubtitle], {
      duration: 0.6,
      scale: 1,
      rotationY: 0,
      x: 0,
      y: 0,
      ease: "power3.out",
    });
    
    // Keep subtitle visible
    gsap.to(logoSubtitle, {
      duration: 0.6,
      opacity: 0.8,
      ease: "power3.out",
    });
  });

  // Enhanced Navigation items animations (desktop only)
  function addDesktopHoverEffects() {
    if (window.innerWidth > 768) {
      navItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
          // Don't animate if this item is active
          if (!item.querySelector('.nav-link.active')) {
            gsap.to(item, {
              duration: 0.4,
              y: -3,
              scale: 1.02,
              ease: "back.out(1.5)",
            });
          }
        });

        item.addEventListener("mouseleave", function () {
          if (!item.querySelector('.nav-link.active')) {
            gsap.to(item, {
              duration: 0.4,
              y: 0,
              scale: 1,
              ease: "power2.out",
            });
          }
        });
      });
    }
  }

  addDesktopHoverEffects();

  // Enhanced Active state management
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links and their parent items
      navLinks.forEach((l) => {
        l.classList.remove("active");
        l.parentElement.classList.remove("active-item");
      });

      // Add active class to clicked link and parent item
      this.classList.add("active");
      this.parentElement.classList.add("active-item");

      // Enhanced click animation
      gsap.to(this, {
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

      // Reset any hover transforms when item becomes active
      gsap.set(this.parentElement, {
        y: 0,
        scale: 1
      });
    });
  });

  // Enhanced Header scroll effect
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;
    const header = document.querySelector(".header");

    if (!nav.classList.contains("mobile-open")) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Enhanced scrolling down animation
        gsap.to(header, {
          duration: 0.5,
          y: -120,
          ease: "power3.out",
        });
      } else {
        // Enhanced scrolling up animation
        gsap.to(header, {
          duration: 0.6,
          y: 0,
          ease: "back.out(1.2)",
        });
      }
    }

    lastScrollY = currentScrollY;
  });

  // Enhanced Hamburger hover effect
  hamburger.addEventListener("mouseenter", function () {
    gsap.to(hamburger, {
      duration: 0.3,
      scale: 1.15,
      rotation: 5,
      ease: "back.out(1.5)",
    });
  });

  hamburger.addEventListener("mouseleave", function () {
    gsap.to(hamburger, {
      duration: 0.3,
      scale: 1,
      rotation: 0,
      ease: "power2.out",
    });
  });

  // Enhanced window resize handler
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && nav.classList.contains("mobile-open")) {
      // Enhanced close animation on resize
      gsap.to(".nav-item", {
        duration: 0.3,
        opacity: 0,
        scale: 0.8,
        onComplete: function() {
          hamburger.classList.remove("active");
          nav.classList.remove("mobile-open");
          body.style.overflow = "";
          
          // Reset nav items for desktop - ensure they're visible
          gsap.set(".nav-list .nav-item", { opacity: 1, y: 0, scale: 1 });
        }
      });
    } else if (window.innerWidth > 768) {
      // Ensure nav items are visible on desktop
      gsap.set(".nav-list .nav-item", { opacity: 1, y: 0, scale: 1 });
    }
  });

  // Enhanced page load entrance sequence
  gsap.fromTo("body", 
    { opacity: 0 },
    { 
      duration: 0.8, 
      opacity: 1, 
      ease: "power2.out",
      delay: 0.2
    }
  );
});
