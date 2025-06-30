// About Us Section Animations
document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // Mission Section Animations
  // ==========================================

  // Mission content animation
  gsap.to(".about-mission-content", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-mission",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    onComplete: function () {
      const missionTitle = document.querySelector(".mission-title");
      if (missionTitle) {
        missionTitle.classList.add("animate-in");
      }
    },
  });

  // Mission visual animation
  gsap.to(".mission-visual", {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.3,
    scrollTrigger: {
      trigger: ".about-mission",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // ==========================================
  // New Mission Visual Animations
  // ==========================================

  // Central hub animation
  gsap.to(".central-hub", {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 0.5,
    scrollTrigger: {
      trigger: ".mission-visual",
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
  });

  // Hub rings staggered animation
  gsap.to(".hub-ring", {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    delay: 0.7,
    scrollTrigger: {
      trigger: ".mission-visual",
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
  });

  // STEM orbs staggered animation
  gsap.to(".stem-orb", {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "back.out(1.7)",
    stagger: 0.15,
    delay: 0.8,
    scrollTrigger: {
      trigger: ".mission-visual",
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
  });

  // Connection lines animation
  gsap.to(".connection-line", {
    opacity: 0.6,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.1,
    delay: 1.2,
    scrollTrigger: {
      trigger: ".mission-visual",
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
  });

  // Interactive particles animation
  gsap.to(".i-particle", {
    opacity: 0.4,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.05,
    delay: 1.4,
    scrollTrigger: {
      trigger: ".mission-visual",
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
  });

  // ==========================================
  // STEM Orb Hover Interactions
  // ==========================================

  const stemOrbs = document.querySelectorAll(".stem-orb");
  const tooltip = document.querySelector(".stem-tooltip");

  // Tooltip content for each STEM field
  const tooltipContent = {
    science: {
      title: "Science",
      description:
        "Exploring the natural world through observation and experimentation",
    },
    technology: {
      title: "Technology",
      description:
        "Applying scientific knowledge to create innovative solutions",
    },
    engineering: {
      title: "Engineering",
      description:
        "Designing and building systems that solve real-world problems",
    },
    math: {
      title: "Mathematics",
      description: "The universal language that connects all STEM disciplines",
    },
  };

  stemOrbs.forEach((orb) => {
    orb.addEventListener("mouseenter", function () {
      const stemType = this.getAttribute("data-stem");

      // Scale up the orb
      gsap.to(this, {
        scale: 1.15,
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      // Animate the inner orb
      gsap.to(this.querySelector(".orb-inner"), {
        rotation: 10,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate particles
      gsap.to(this.querySelectorAll(".particle"), {
        scale: 1.2,
        opacity: 0.8,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.05,
      });

      // Show tooltip
      if (tooltip && tooltipContent[stemType]) {
        const titleEl = tooltip.querySelector(".tooltip-title");
        const descEl = tooltip.querySelector(".tooltip-description");

        if (titleEl) titleEl.textContent = tooltipContent[stemType].title;
        if (descEl) descEl.textContent = tooltipContent[stemType].description;

        gsap.to(tooltip, {
          opacity: 1,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    orb.addEventListener("mouseleave", function () {
      // Scale down the orb
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reset inner orb
      gsap.to(this.querySelector(".orb-inner"), {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reset particles
      gsap.to(this.querySelectorAll(".particle"), {
        scale: 1,
        opacity: 0.6,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.05,
      });

      // Hide tooltip
      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // ==========================================
  // About Content Section Animations
  // ==========================================

  // Animate about sections
  gsap.to(".about-section", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play none none reverse",
    },
    onComplete: function () {
      // Trigger section title animations
      document.querySelectorAll(".section-title").forEach((title) => {
        title.classList.add("animate-in");
      });
    },
  });

  // ==========================================
  // Features Section Animations (Left Side)
  // ==========================================

  // Feature items staggered animation
  gsap.to(".feature-item", {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".about-features",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // Feature item hover interactions
  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      gsap.to(this, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });

      const featureIcon = this.querySelector(".feature-icon");
      if (featureIcon) {
        gsap.to(featureIcon, {
          rotation: 5,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    item.addEventListener("mouseleave", function () {
      gsap.to(this, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      const featureIcon = this.querySelector(".feature-icon");
      if (featureIcon) {
        gsap.to(featureIcon, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // ==========================================
  // STEM Breakdown Section Animations (Right Side)
  // ==========================================

  // STEM items staggered animation
  gsap.to(".stem-item", {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".stem-breakdown",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // STEM item hover interactions with enhanced effects
  const stemItems = document.querySelectorAll(".stem-item");
  stemItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      gsap.to(this, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate the STEM letter
      const stemLetter = this.querySelector(".stem-letter");
      if (stemLetter) {
        gsap.to(stemLetter, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        // Pulse effect for the letter background
        gsap.to(stemLetter, {
          boxShadow: "0 6px 20px rgba(66, 166, 76, 0.4)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    item.addEventListener("mouseleave", function () {
      gsap.to(this, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const stemLetter = this.querySelector(".stem-letter");
      if (stemLetter) {
        gsap.to(stemLetter, {
          scale: 1,
          rotation: 0,
          boxShadow: "0 4px 15px rgba(66, 166, 76, 0.25)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // ==========================================
  // Background Elements Animations
  // ==========================================

  // Animate background shapes on scroll
  ScrollTrigger.create({
    trigger: ".about-us",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      const shape1 = document.querySelector(".about-bg-shape-1");
      const shape2 = document.querySelector(".about-bg-shape-2");
      const shape3 = document.querySelector(".about-bg-shape-3");

      if (shape1) {
        gsap.set(shape1, {
          x: progress * 100,
          y: progress * -50,
          rotation: progress * 180,
        });
      }

      if (shape2) {
        gsap.set(shape2, {
          x: progress * -80,
          y: progress * 60,
          rotation: progress * -120,
        });
      }

      if (shape3) {
        gsap.set(shape3, {
          x: progress * 60,
          y: progress * -30,
          rotation: progress * 90,
        });
      }
    },
  });

  // Animate background particles
  gsap.to(".about-particle", {
    opacity: 0.6,
    duration: 2,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-us",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // ==========================================
  // Mission Visual Continuous Animations
  // ==========================================

  // Central hub pulse animation
  gsap.to(".hub-pulse", {
    scale: 1.2,
    opacity: 0.3,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2,
  });

  // Hub rings rotation
  gsap.to(".ring-1", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none",
    delay: 2,
  });

  gsap.to(".ring-2", {
    rotation: -360,
    duration: 30,
    repeat: -1,
    ease: "none",
    delay: 2.5,
  });

  gsap.to(".ring-3", {
    rotation: 360,
    duration: 40,
    repeat: -1,
    ease: "none",
    delay: 3,
  });

  // STEM orbs floating animation
  gsap.to(".stem-science", {
    y: "+=15",
    rotation: "+=5",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.2,
  });

  gsap.to(".stem-tech", {
    y: "-=10",
    rotation: "-=3",
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.4,
  });

  gsap.to(".stem-engineering", {
    y: "+=12",
    rotation: "+=4",
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.6,
  });

  gsap.to(".stem-math", {
    y: "-=8",
    rotation: "-=6",
    duration: 4.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.8,
  });

  // Orb particles animation
  gsap.to(".orb-particles .particle", {
    scale: 1.5,
    opacity: 0.2,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.2,
    delay: 3,
  });

  // Interactive particles floating
  gsap.to(".i-particle", {
    y: "+=20",
    x: "+=10",
    rotation: "+=180",
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5,
    delay: 3.5,
  });

  // ==========================================
  // Scroll-Based Parallax Effects
  // ==========================================

  // Mission section parallax
  ScrollTrigger.create({
    trigger: ".about-mission",
    start: "top bottom",
    end: "bottom top",
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = self.progress;

      const missionContent = document.querySelector(".about-mission-content");
      const missionVisual = document.querySelector(".mission-visual");

      if (missionContent) {
        gsap.set(missionContent, {
          y: progress * -30,
        });
      }

      if (missionVisual) {
        gsap.set(missionVisual, {
          y: progress * 20,
        });
      }
    },
  });

  // ==========================================
  // Performance Optimization
  // ==========================================

  // Intersection Observer for performance
  const aboutSection = document.querySelector(".about-us");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ScrollTrigger.refresh();
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }

  // Handle window resize
  window.addEventListener(
    "resize",
    debounce(() => {
      ScrollTrigger.refresh();
    }, 250)
  );

  // ==========================================
  // Accessibility Support
  // ==========================================

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.timeScale(0.3);

    // Disable continuous animations
    gsap.set(
      ".hub-pulse, .hub-ring, .stem-orb, .i-particle, .orb-particles .particle",
      {
        animation: "none",
      }
    );

    // Simplify scroll triggers
    ScrollTrigger.config({
      limitCallbacks: true,
    });
  }

  // ==========================================
  // Utility Functions
  // ==========================================

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ==========================================
  //  Mouse Interactions
  // ==========================================

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  // Mouse movement parallax for about section
  const aboutUsSection = document.querySelector(".about-us");

  if (aboutUsSection) {
    aboutUsSection.addEventListener(
      "mousemove",
      throttle((e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        // Apply subtle parallax to background particles - FASTER
        const particles = document.querySelectorAll(".about-particle");
        particles.forEach((particle, index) => {
          const intensity = ((index % 3) + 1) * 5;

          gsap.to(particle, {
            x: xPercent * intensity,
            y: yPercent * intensity,
            duration: 0.4, // Reduced from 0.8
            ease: "none", // Fastest easing
            overwrite: "auto", // Prevent animation conflicts
          });
        });

        // Apply parallax to STEM orbs - FASTER
        const stemOrbs = document.querySelectorAll(".stem-orb");
        stemOrbs.forEach((orb, index) => {
          const intensity = ((index % 2) + 1) * 3;

          gsap.to(orb, {
            x: xPercent * intensity,
            y: yPercent * intensity,
            duration: 0.5, // Reduced from 1
            ease: "none", // Fastest easing
            overwrite: "auto",
          });
        });

        // Apply parallax to interactive particles - FASTER
        const iParticles = document.querySelectorAll(".i-particle");
        iParticles.forEach((particle, index) => {
          const intensity = ((index % 4) + 1) * 2;

          gsap.to(particle, {
            x: xPercent * intensity,
            y: yPercent * intensity,
            duration: 0.6, // Reduced from 1.2
            ease: "none", // Fastest easing
            overwrite: "auto",
          });
        });
      }, 16)
    ); // Throttle to ~60fps

    // Reset parallax on mouse leave - OPTIMIZED VERSION
    aboutUsSection.addEventListener("mouseleave", () => {
      gsap.to(".about-particle, .stem-orb, .i-particle", {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power1.out",
        overwrite: "auto", // Prevent conflicts with mousemove animations
      });
    });
  }

  console.log("About Us animations initialized successfully");
});
