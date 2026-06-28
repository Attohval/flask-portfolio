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
    const href = link.getAttribute("href");
    if (href && window.location.pathname === href) {
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

  const revealElements = document.querySelectorAll(".animate-up");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

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
