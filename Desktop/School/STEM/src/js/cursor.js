const cursor = document.getElementById("customCursor");
const particles = document.querySelectorAll(".cursor-particle");
const trails = document.querySelectorAll(".cursor-trail");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let trailPositions = [];

// Initialize trail positions
for (let i = 0; i < trails.length; i++) {
  trailPositions.push({ x: 0, y: 0 });
}

// Function to get background color and adjust cursor
function adjustCursorColor(x, y) {
  const element = document.elementFromPoint(x, y);
  if (!element) return;
  
  const computedStyle = window.getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;
  
  // Check if background is transparent, then check parent elements
  let currentElement = element;
  let finalBackgroundColor = backgroundColor;
  
  while (currentElement && (finalBackgroundColor === 'rgba(0, 0, 0, 0)' || finalBackgroundColor === 'transparent')) {
    currentElement = currentElement.parentElement;
    if (currentElement) {
      finalBackgroundColor = window.getComputedStyle(currentElement).backgroundColor;
    }
  }
  
  // Convert RGB to hex for easier comparison
  const rgbToHex = (rgb) => {
    const result = rgb.match(/\d+/g);
    if (!result) return null;
    return "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1);
  };
  
  const hexColor = rgbToHex(finalBackgroundColor);
  
  // Define color mappings for better visibility
  const greenColors = ['#247e0c', '#1a5c09', '#2d9610', '#389342', '#2e7a38', '#42a64c', '#d3e585', '#bdd470', '#e8f299'];
  const yellowColors = ['#cdb82d', '#a6942a', '#e6d142'];
  
  // Remove existing color classes
  cursor.classList.remove('on-green', 'on-yellow', 'on-light');
  
  if (hexColor) {
    if (greenColors.some(color => hexColor.toLowerCase() === color.toLowerCase())) {
      cursor.classList.add('on-green');
    } else if (yellowColors.some(color => hexColor.toLowerCase() === color.toLowerCase())) {
      cursor.classList.add('on-yellow');
    } else {
      // For any other background, use default visibility
      cursor.classList.add('on-light');
    }
  }
}

// Mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Adjust cursor color based on background
  adjustCursorColor(e.clientX, e.clientY);
});

// Smooth cursor follow
function updateCursor() {
  const speed = 0.15;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  
  // Use transform instead of left/top for better performance
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  
  // Update trails with delay
  trailPositions.unshift({ x: cursorX, y: cursorY });
  if (trailPositions.length > 8) {
    trailPositions.pop();
  }
  
  trails.forEach((trail, index) => {
    const pos = trailPositions[index * 2 + 2];
    if (pos) {
      trail.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      trail.style.opacity = 0.3 - index * 0.1;
    }
  });
  
  requestAnimationFrame(updateCursor);
}

updateCursor();

// Hover effects
document.addEventListener("mouseover", (e) => {
  if (e.target.matches("a, button, .demo-button")) {
    cursor.classList.add("hover");
  } else if (e.target.matches("p, h1, h2, h3, h4, h5, h6")) {
    cursor.classList.add("text");
  }
});

document.addEventListener("mouseout", (e) => {
  cursor.classList.remove("hover", "text");
});

// Click effects
document.addEventListener("mousedown", (e) => {
  // Only trigger on left click
  if (e.button === 0) {
    cursor.classList.add("click");
    // Hide trails during click
    trails.forEach((trail) => {
      trail.style.opacity = "0";
    });
    // Trigger particles
    particles.forEach((particle, index) => {
      setTimeout(() => {
        particle.classList.add("active");
        setTimeout(() => {
          particle.classList.remove("active");
        }, 800);
      }, index * 50);
    });
  }
});

document.addEventListener("mouseup", (e) => {
  // Only trigger on left click release
  if (e.button === 0) {
    cursor.classList.remove("click");
    // Show trails again after click
    setTimeout(() => {
      trails.forEach((trail, index) => {
        trail.style.opacity = 0.3 - index * 0.1 + "";
      });
    }, 200);
  }
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

// Random particle movement
function updateParticlePositions() {
  particles.forEach((particle) => {
    const randomX = (Math.random() - 0.5) * 30;
    const randomY = (Math.random() - 0.5) * 30;
    particle.style.setProperty("--random-x", randomX + "px");
    particle.style.setProperty("--random-y", randomY + "px");
  });
}

// Update particle positions every 2 seconds
setInterval(updateParticlePositions, 2000);