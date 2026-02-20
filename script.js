document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMobileOverlay = document.querySelector(".nav-mobile-overlay");
  const navMobileLinks = document.querySelectorAll(".nav-mobile-content a");

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    navMobileOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  navMobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navMobileOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Handle Active Link on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-desktop a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });

    // Header background change on scroll
    const header = document.querySelector(".main-header");
    if (window.scrollY > 50) {
      header.style.background = "rgba(255, 255, 255, 1)";
      header.style.boxShadow = "0 5px 20px rgba(16, 41, 131, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(16, 41, 131, 0.05)";
    }
  });

  // Form Submission
  const bookingForm = document.getElementById("pestBookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = bookingForm.querySelector(".btn-submit");
      const originalText = submitBtn.innerHTML;

      // UI Feedback
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert(
          "Thank you! Your booking request for SPAHI Pest Control has been received. Our team will contact you shortly.",
        );
        bookingForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-reveal");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".service-card, .benefit-item, .why-image, .booking-info, .booking-form-area",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s ease-out";
      observer.observe(el);
    });

  // Add custom class for animations
  const style = document.createElement("style");
  style.innerHTML = `
        .animate-reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);
});
// Script for pop up form
// Popup Booking Form Logic

const bookBtn = document.querySelector(".get-call-tab");
const modal = document.getElementById("bookingModal");
const closeBtn = document.getElementById("closeModal");

bookBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Close when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Form Submit
document
  .getElementById("popupBookingForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Thank you! Our team will contact you soon.");

    modal.classList.remove("active");
    this.reset();
  });
