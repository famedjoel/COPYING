// Get all the header elements
const headers = document.querySelectorAll('header');

// Add click event listeners to each header
headers.forEach(header => {
  header.addEventListener('click', () => {
    // Remove 'active' class from all headers
    headers.forEach(header => {
      header.classList.remove('active');
    });
    // Add 'active' class to the clicked header
    header.classList.add('active');
  });
});


// Function to update the alternating text
function updateAlternatingText() {
  const textSpan = document.getElementById('textSpan');
  
  if (textSpan.innerHTML === 'create') {
    textSpan.style.opacity = 0;
    setTimeout(() => {
      textSpan.innerHTML = getCurrentTime();
      textSpan.style.opacity = 1;
    }, 1000);
  } else {
    textSpan.style.opacity = 0;
    setTimeout(() => {
      textSpan.innerHTML = 'create';
      textSpan.style.opacity = 1;
    }, 1000);
  }
}

// Function to get the current time in the format "HH:MM"
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Function to handle device motion
function handleMotion(event) {
  const alternatingTextElement = document.getElementById('alternatingText');
  const accelerationX = event.accelerationIncludingGravity.x;
  const accelerationY = event.accelerationIncludingGravity.y;

  // Adjust the rotation and translation values as per your preference
  const maxRotation = 30;
  const maxTranslation = 20;

  const rotateX = accelerationY / 9.8 * maxRotation;
  const rotateY = accelerationX / 9.8 * maxRotation;
  const translateX = accelerationX / 9.8 * maxTranslation;
  const translateY = accelerationY / 9.8 * maxTranslation;

  alternatingTextElement.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Event listener for device motion
window.addEventListener('devicemotion', handleMotion);

// Update the alternating text every 5 seconds
setInterval(updateAlternatingText, 2000);


// ... (previous JavaScript code remains the same) ...

// Function to update the expiration time
function updateExpirationTime() {
  const expirationTimeElement = document.getElementById('expirationTime');
  const expirationTime = new Date().getTime() + (22 * 60 * 60 * 1000); // 22 hours from now

  const countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = expirationTime - currentTime;

    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    expirationTimeElement.innerHTML = `${hours}h: ${minutes}m: ${seconds}s`;

    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      expirationTimeElement.innerHTML = 'Ticket expired';
    }
  }, 1000);
}

// Call the updateExpirationTime function when the page loads
window.onload = updateExpirationTime;

// ... (previous JavaScript code remains the same) ...