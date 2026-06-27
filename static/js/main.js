document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }

    link.addEventListener("click", (event) => {
      const target = link.getAttribute("href");
      if (target && target.startsWith("#")) {
        event.preventDefault();
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        event.preventDefault();
        alert("Please fill in all fields before sending your message.");
      }
    });
  }
});
