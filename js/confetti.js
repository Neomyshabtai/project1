// 🎊 Confetti Animation Script
// This script creates a soft falling confetti animation using an HTML5 canvas element.

// Get the canvas element and its 2D drawing context
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions to match the full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store all confetti particles
let confetti = [];

// Color palette for confetti pieces
const colors = ["#f6b6c0", "#f8d9da", "#fff0f2", "#ffd6de"];

// 💫 Initialize confetti particles with random properties
for (let i = 0; i < 100; i++) {
  confetti.push({
    x: Math.random() * canvas.width,                 // Random horizontal position
    y: Math.random() * canvas.height - canvas.height, // Start above the screen
    r: Math.random() * 6 + 4,                        // Size (line thickness)
    d: Math.random() * 30 + 10,                      // Density (affects falling speed)
    color: colors[Math.floor(Math.random() * colors.length)], // Random color
    tilt: Math.random() * 10 - 10,                   // Random initial tilt
    tiltAngleIncremental: Math.random() * 0.07 + 0.05, // Speed of tilt oscillation
    tiltAngle: 0                                     // Starting tilt angle
  });
}

// 🩷 Draws all confetti pieces on the canvas
function drawConfetti() {
  // Clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each confetti particle as a small colored line
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;              // Line thickness based on particle size
    ctx.strokeStyle = p.color;        // Set particle color
    ctx.moveTo(p.x + p.tilt + p.r / 3, p.y); // Starting point of line
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 5); // Ending point of line
    ctx.stroke();
  });

  // Update position and movement of confetti
  updateConfetti();
}

// 🎈 Updates the position and tilt of each confetti particle
function updateConfetti() {
  confetti.forEach(p => {
    // Increase tilt angle to simulate rotation
    p.tiltAngle += p.tiltAngleIncremental;

    // Move confetti downward with variation in speed and direction
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.tilt = Math.sin(p.tiltAngle) * 15; // Oscillate left and right

    // Reset position if particle moves below screen
    if (p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = -20; // Respawn above the screen
    }
  });
}

// 🚀 Animation loop — continuously redraws confetti frames
function animate() {
  drawConfetti();
  requestAnimationFrame(animate); // Recursively calls itself for smooth animation
}

// Start the confetti animation
animate();

// ⏰ Automatically hide confetti after 4 seconds
setTimeout(() => {
  canvas.style.display = "none";
}, 4000);
