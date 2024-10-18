// Sample faculty data (replace with actual data later)
const facultyData = [
  {
      name: "Dr. John Doe",
      experience: "15 years",
      expertise: "Machine Learning, Data Science",
      availableSlots: ["Monday 2-3 PM", "Wednesday 4-5 PM", "Friday 1-2 PM"]
  },
  {
      name: "Prof. Jane Smith",
      experience: "20 years",
      expertise: "Artificial Intelligence, Robotics",
      availableSlots: ["Tuesday 3-4 PM", "Thursday 2-3 PM", "Friday 3-4 PM"]
  },
  // Add more faculty members here
];

// Function to populate faculty profiles
function populateFacultyProfiles() {
  const profilesContainer = document.getElementById('profiles-container');
  facultyData.forEach(faculty => {
      const profileElement = document.createElement('div');
      profileElement.classList.add('faculty-profile');
      profileElement.innerHTML = `
          <h3>${faculty.name}</h3>
          <p><strong>Experience:</strong> ${faculty.experience}</p>
          <p><strong>Expertise:</strong> ${faculty.expertise}</p>
          <p><strong>Available Slots:</strong></p>
          <ul>
              ${faculty.availableSlots.map(slot => `<li>${slot}</li>`).join('')}
          </ul>
      `;
      profilesContainer.appendChild(profileElement);
  });
}

// Function to populate booking system
function populateBookingSystem() {
  const bookingContainer = document.getElementById('booking-container');
  facultyData.forEach(faculty => {
      faculty.availableSlots.forEach(slot => {
          const slotElement = document.createElement('div');
          slotElement.classList.add('time-slot');
          slotElement.textContent = `${faculty.name}: ${slot}`;
          slotElement.addEventListener('click', () => bookSlot(faculty, slot, slotElement));
          bookingContainer.appendChild(slotElement);
      });
  });
}

// Function to book a slot
function bookSlot(faculty, slot, element) {
  if (!element.classList.contains('booked')) {
      element.classList.add('booked');
      element.textContent += " (Booked)";
      alert(`You have booked a session with ${faculty.name} on ${slot}`);
  } else {
      alert("This slot is already booked.");
  }
}

// Function to handle contact form submission
function handleContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      alert(`Thank you for your message, ${name}! We will get back to you soon.`);
      form.reset();
  });
}

// Initialize the website
function init() {
  populateFacultyProfiles();
  populateBookingSystem();
  handleContactForm();
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);