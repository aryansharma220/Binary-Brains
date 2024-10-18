let facultyData = [];

// Fetch faculty data from JSON file
async function fetchFacultyData() {
  try {
    const response = await fetch('demoData.json');
    const data = await response.json();
    facultyData = data.facultyData;
  } catch (error) {
    console.error('Error fetching faculty data:', error);
  }
}
// Utility function to get faculty by ID
function getFacultyById(id) {
  return facultyData.find(faculty => faculty.id === parseInt(id));
}

// Main page functions
function populateFacultyProfiles() {
  const profilesContainer = document.getElementById("profiles-container");
  if (!profilesContainer) return;

  facultyData.forEach((faculty) => {
    const profileElement = document.createElement("div");
    profileElement.classList.add("faculty-profile", "cards");
    profileElement.innerHTML = `
      <div class="card">
        <img class="card_image" src=${faculty.image} alt="${faculty.name}">
        <div class="card__content">
          <h1 class="card__title">${faculty.name}</h1>
          <div class="card__description">
            <p><strong>Department:</strong> ${faculty.department}</p>
            <p><strong>Designation:</strong> ${faculty.designation}</p>
          </div>
          <a href="booking.html?id=${faculty.id}" class="card_button">
            Book Now
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    `;
    profilesContainer.appendChild(profileElement);
  });
}

function handleContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return; // Exit if not on the main page

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    alert(`Thank you for your message, ${name}! We will get back to you soon.`);
    form.reset();
  });
}

// Booking page functions
function populateFacultyInfo() {
  const facultyInfoSection = document.getElementById("faculty-info");
  if (!facultyInfoSection) return; // Exit if not on the booking page

  const urlParams = new URLSearchParams(window.location.search);
  const facultyId = urlParams.get('id');
  const faculty = getFacultyById(facultyId);


  facultyInfoSection.innerHTML = `
    <div class="faculty-profile">
      <img src="${faculty.image}" alt="${faculty.name}" class="faculty-image">
      <br/>
      <br/>
      
      <h2>Basic Information</h2>
      <p>${faculty.name}</p>
      <p><strong>Department:</strong> ${faculty.department}</p>
      <p><strong>Designation:</strong> ${faculty.designation}</p>
      <br/>
      <br/>

      <h2>Contact</h2>
      <p><strong>Mobile:</strong> ${faculty.contact.mobile}</p>
      <p><strong>Email:</strong> ${faculty.contact.email.join(', ')}</p>
      <p><strong>Office Contact Number:</strong> ${faculty.contact.phoneOffice}</p>
      <br/>
      <br/>
      
      <h2>Educational Details</h2>
      <p><strong>Experience:</strong> ${faculty.experience.years}</p>
      <p><strong>Expertise:</strong> ${faculty.areasOfGuidance.join(', ')}</p>
      <p><strong>Subjects Taught:</strong> ${faculty.subjectsTaught.join(', ')}</p>
    </div>
  `;

  populateAvailableSlots(faculty);
}

function populateAvailableSlots(faculty) {
  const availableSlotsContainer = document.getElementById("available-slots");
  if (!availableSlotsContainer) return; // Exit if not on the booking page

  faculty.availableTimeSlots.forEach(slot => {
    const slotElement = document.createElement("button");
    slotElement.classList.add("time-slot");
    slotElement.textContent = `${slot.day}: ${slot.time}`;
    const bookedSlot = localStorage.getItem("bookedSlot");
    if (bookedSlot === `${slot.day}: ${slot.time}`) {
      slotElement.disabled = true;
      slotElement.classList.add("booked");
      slotElement.textContent += " (Booked)";
    }

    slotElement.addEventListener("click", (e) => {
      e.preventDefault();
      selectSlot(`${slot.day}: ${slot.time}`);
    });

    availableSlotsContainer.appendChild(slotElement);
  });
}

function selectSlot(slot) {
  const selectedSlotInput = document.getElementById("selected-slot");
  if (!selectedSlotInput) return; 

  selectedSlotInput.value = slot;

  const slotButtons = document.querySelectorAll(".time-slot");
  slotButtons.forEach(button => {
    button.classList.remove("selected");
    if (button.textContent === slot) {
      button.classList.add("selected");
    }
  });
}

function handleBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return; 

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const studentName = document.getElementById("student-name").value;
    const studentEmail = document.getElementById("student-email").value;
    const selectedSlot = document.getElementById("selected-slot").value;

    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    if (!studentName || !studentEmail) {
      alert("Please fill in all fields");
      return;
    }

    alert(`Booking confirmed for ${studentName} (${studentEmail}) at ${selectedSlot}`);


    // Disable the booked slot
    const slotButtons = document.querySelectorAll(".time-slot");
    slotButtons.forEach(button => {
      if (button.textContent === selectedSlot) {
        button.disabled = true;
        button.classList.add("booked");
        button.textContent += " (Booked)";
      }
    });

    form.reset();
    slotButtons.forEach(button => button.classList.remove("selected"));
  });
}

// Scroll to top functionality
function setupScrollToTop() {
  const scrollToTopButton = document.getElementById("scroll-to-top");
  if (!scrollToTopButton) return;

  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  };

  scrollToTopButton.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
}

// Initialize the website
async function init() {
  await fetchFacultyData();
  populateFacultyProfiles();
  handleContactForm();
  populateFacultyInfo();
  handleBookingForm();
  setupScrollToTop();
}

// Run initialization when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);