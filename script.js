// Additional futuristic theme JavaScript enhancements

const statusMessages = document.getElementById("status-messages");
const sendCommandBtn = document.getElementById("send-command-btn");

// Function to add status messages with timestamps
function addStatusMessage(message) {
  const li = document.createElement("li");
  const timestamp = new Date().toLocaleTimeString();
  li.textContent = `[${timestamp}] ${message}`;
  statusMessages.appendChild(li);
  statusMessages.scrollTop = statusMessages.scrollHeight;
}

// Satellite spinning animation for satellite icons
function animateSatellites() {
  const sats = document.querySelectorAll('.satellite i');
  sats.forEach((sat, index) => {
    const rotation = (Date.now() / 1000 * 60 + index * 180) % 360;
    sat.style.transform = `rotate(${rotation}deg)`;
  });
  requestAnimationFrame(animateSatellites);
}
animateSatellites();

// Sound effect for sending command
const sendSound = new Audio('assets/send-command.mp3');

function sendCommand() {
  const commandInput = document.getElementById("command");
  const command = commandInput.value.trim();
  if (!command) return;
  sendSound.play();
  addStatusMessage(`SAT-001 received command: ${command}`);
  addStatusMessage(`SAT-001 response: Executing...`);
  document.getElementById("response").textContent = `Command "${command}" sent to satellite.`;
  commandInput.value = '';
  sendCommandBtn.setAttribute('aria-pressed', 'true');
  setTimeout(() => {
    sendCommandBtn.setAttribute('aria-pressed', 'false');
  }, 200);
}

// Satellite card 3D parallax effect on mouse move
const satellitesContainer = document.querySelector('.earth-container');
satellitesContainer.addEventListener('mousemove', (e) => {
  const sats = document.querySelectorAll('.satellite');
  sats.forEach(sat => {
    const rect = sat.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    sat.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
  });
});

satellitesContainer.addEventListener('mouseleave', () => {
  const sats = document.querySelectorAll('.satellite');
  sats.forEach(sat => {
    sat.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
