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

// Complete color definitions based on your CSS variables
const GREEN_COLORS = [
  '#247e0c',  // --primary-green
  '#1a5c09',  // --primary-green-dark
  '#2d9610',  // --primary-green-light
  '#d3e585',  // --accent-light-green
  '#bdd470',  // --accent-light-green-dark
  '#e8f299',  // --accent-light-green-light
  '#389342',  // --accent-dark-green
  '#2e7a38',  // --accent-dark-green-dark
  '#42a64c'   // --accent-dark-green-light
];

const YELLOW_COLORS = [
  '#cdb82d',  // --secondary-yellow
  '#a6942a',  // --secondary-yellow-dark
  '#e6d142'   // --secondary-yellow-light
];

// Function to convert any color to hex
function colorToHex(color) {
  // Create a temporary div to compute the color
  const div = document.createElement('div');
  div.style.color = color;
  document.body.appendChild(div);
  
  const computedColor = window.getComputedStyle(div).color;
  document.body.removeChild(div);
  
  // Convert RGB to hex
  const rgb = computedColor.match(/\d+/g);
  if (rgb && rgb.length >= 3) {
    const hex = "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
    return hex.toLowerCase();
  }
  
  return null;
}

// Function to get opacity from rgba color
function getOpacity(color) {
  const rgbaMatch = color.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,?\s*([01]?\.?\d*)\s*\)/);
  if (rgbaMatch && rgbaMatch[1]) {
    return parseFloat(rgbaMatch[1]);
  }
  return 1; // Default to fully opaque if no alpha specified
}

// Function to check if color is in green family (with opacity consideration)
function isGreenColor(color) {
  if (!color) return false;
  
  // Skip very low opacity colors (less than 0.3) as they don't affect visual appearance much
  const opacity = getOpacity(color);
  if (opacity < 0.3) return false;
  
  const hex = colorToHex(color);
  if (!hex) return false;
  
  // Check exact matches first
  if (GREEN_COLORS.includes(hex)) return true;
  
  // Parse RGB values for broader green detection
  const rgb = hex.match(/[a-f\d]{2}/gi);
  if (!rgb || rgb.length < 3) return false;
  
  const r = parseInt(rgb[0], 16);
  const g = parseInt(rgb[1], 16);
  const b = parseInt(rgb[2], 16);
  
  // Green detection logic - green component is dominant AND color is vibrant enough
  return (g > r && g > b && g > 100) || 
         (g > 150 && r < 150 && b < 150) || 
         (g > r + 50 && g > b + 50 && g > 80);
}

// Function to check if color is in yellow family (with opacity consideration)
function isYellowColor(color) {
  if (!color) return false;
  
  // Skip very low opacity colors
  const opacity = getOpacity(color);
  if (opacity < 0.3) return false;
  
  const hex = colorToHex(color);
  if (!hex) return false;
  
  // Check exact matches first
  if (YELLOW_COLORS.includes(hex)) return true;
  
  // Parse RGB values for broader yellow detection
  const rgb = hex.match(/[a-f\d]{2}/gi);
  if (!rgb || rgb.length < 3) return false;
  
  const r = parseInt(rgb[0], 16);
  const g = parseInt(rgb[1], 16);
  const b = parseInt(rgb[2], 16);
  
  // Yellow detection logic - red and green high, blue low AND color is vibrant enough
  return (r > 150 && g > 150 && b < 100) || 
         (r > 180 && g > 180 && b < 120) || 
         (r > 120 && g > 120 && b < 80 && (r + g) > 240);
}

// Function to extract colors from gradients and prioritize them
function extractGradientColors(backgroundImage) {
  if (!backgroundImage || !backgroundImage.includes('gradient')) return [];
  
  // Match CSS color formats including variables
  const colorPattern = /(?:var\([^)]+\)|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|#[0-9a-f]{3,6}|\b[a-z]+\b)/gi;
  const matches = backgroundImage.match(colorPattern) || [];
  
  const colors = matches.filter(match => 
    !match.includes('gradient') && 
    !match.includes('deg') && 
    !match.includes('%') &&
    match !== 'to' && 
    match !== 'from'
  );
  
  // Sort colors by opacity/prominence - higher opacity first
  return colors.sort((a, b) => {
    const opacityA = getOpacity(a);
    const opacityB = getOpacity(b);
    return opacityB - opacityA;
  });
}

// Main function to determine cursor color
function adjustCursorColor(x, y) {
  const element = document.elementFromPoint(x, y);
  if (!element) return;
  
  // Remove existing color classes
  cursor.classList.remove('on-green', 'on-yellow', 'on-light', 'on-dark');
  
  // console.log('🎯 Checking element:', element.tagName, element.className);
  
  const computedStyle = window.getComputedStyle(element);
  let priorityColors = []; // High priority colors (backgrounds)
  let secondaryColors = []; // Lower priority colors (text, borders)
  
  // 1. Check gradient backgrounds first (highest priority)
  const backgroundImage = computedStyle.backgroundImage;
  if (backgroundImage && backgroundImage !== 'none') {
    const gradientColors = extractGradientColors(backgroundImage);
    // Only add gradient colors with significant opacity to priority
    gradientColors.forEach(color => {
      if (getOpacity(color) >= 0.5) {
        priorityColors.push(color);
      } else {
        secondaryColors.push(color);
      }
    });
    // console.log('📐 Gradient colors found:', gradientColors);
  }
  
  // 2. Check background color (high priority)
  let backgroundColor = computedStyle.backgroundColor;
  
  // If transparent, check parent elements
  let currentElement = element;
  let depth = 0;
  while (currentElement && depth < 5 && 
         (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent')) {
    currentElement = currentElement.parentElement;
    if (currentElement) {
      const parentStyle = window.getComputedStyle(currentElement);
      backgroundColor = parentStyle.backgroundColor;
      
      // Also check parent's gradient (but lower priority since it's inherited)
      const parentBgImage = parentStyle.backgroundImage;
      if (parentBgImage && parentBgImage !== 'none') {
        const parentGradientColors = extractGradientColors(parentBgImage);
        parentGradientColors.forEach(color => {
          if (getOpacity(color) >= 0.3) {
            secondaryColors.push(color);
          }
        });
      }
    }
    depth++;
  }
  
  if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
    if (getOpacity(backgroundColor) >= 0.5) {
      priorityColors.push(backgroundColor);
    } else {
      secondaryColors.push(backgroundColor);
    }
  }
  
  // 3. Check text color (lower priority)
  const textColor = computedStyle.color;
  if (textColor) {
    secondaryColors.push(textColor);
  }
  
  // 4. Check border colors (lowest priority)
  const borderColors = [
    computedStyle.borderTopColor,
    computedStyle.borderRightColor,
    computedStyle.borderBottomColor,
    computedStyle.borderLeftColor
  ].filter(color => color && color !== 'rgba(0, 0, 0, 0)');
  secondaryColors.push(...borderColors);
  
  const allColors = [...priorityColors, ...secondaryColors];
  // console.log('🎨 Priority colors:', priorityColors);
  // console.log('🎨 Secondary colors:', secondaryColors);
  // console.log('🎨 All colors to check:', allColors);
  
  // Check priority colors first
  for (const color of priorityColors) {
    if (isGreenColor(color)) {
      cursor.classList.add('on-green');
      // console.log('✅ Green detected in priority colors, cursor → yellow');
      return;
    } else if (isYellowColor(color)) {
      cursor.classList.add('on-yellow');
      // console.log('✅ Yellow detected in priority colors, cursor → green');
      return;
    }
  }
  
  // If no priority colors match, check secondary colors
  for (const color of secondaryColors) {
    if (isGreenColor(color)) {
      cursor.classList.add('on-green');
      // console.log('✅ Green detected in secondary colors, cursor → yellow');
      return;
    } else if (isYellowColor(color)) {
      cursor.classList.add('on-yellow');
      // console.log('✅ Yellow detected in secondary colors, cursor → green');
      return;
    }
  }
  
  // Default: make cursor green for neutral/white backgrounds
  cursor.classList.add('on-light');
  // console.log('⚪ No significant green/yellow detected, cursor → default green');
}

// Mouse movement with throttling
let isThrottled = false;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (!isThrottled) {
    adjustCursorColor(e.clientX, e.clientY);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 16);
  }
});

// Smooth cursor follow
function updateCursor() {
  const speed = 0.15;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  
  cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
  
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

// Click effects - RED CURSOR AND TRAILS
document.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    cursor.classList.add("click");
    // Make trails red
    trails.forEach((trail) => {
      trail.classList.add("red");
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
  if (e.button === 0) {
    cursor.classList.remove("click");
    // Remove red class from trails
    trails.forEach((trail) => {
      trail.classList.remove("red");
    });
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

setInterval(updateParticlePositions, 2000);