/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const themeToggle =
  document.querySelector("#themeToggle");

const menuToggle =
  document.querySelector("#menuToggle");

const navLinks =
  document.querySelector("#navLinks");


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

themeToggle.addEventListener("click", () => {

  body.classList.toggle("light");

  const isLight =
    body.classList.contains("light");

  themeToggle.textContent =
    isLight ? "☀" : "☾";

  localStorage.setItem(
    "portfolio-theme",
    isLight ? "light" : "dark"
  );

});


/* Load saved theme */

if (
  localStorage.getItem("portfolio-theme") ===
  "light"
) {

  body.classList.add("light");

  themeToggle.textContent = "☀";

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

menuToggle.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

});


/* Close mobile menu after clicking a link */

document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        }

      });

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    revealObserver.observe(element);

  });


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navAnchors =
  document.querySelectorAll(
    ".nav-links a"
  );


window.addEventListener(
  "scroll",
  () => {

    let currentSection = "home";

    sections.forEach((section) => {

      if (
        window.scrollY >=
        section.offsetTop - 140
      ) {

        currentSection =
          section.id;

      }

    });


    navAnchors.forEach((anchor) => {

      anchor.classList.toggle(
        "active",
        anchor.getAttribute("href") ===
        `#${currentSection}`
      );

    });

  }
);


/* =========================================================
   PROJECT MODALS
========================================================= */

const projectModals =
  document.querySelectorAll(
    ".project-modal"
  );

const modalOpenButtons =
  document.querySelectorAll(
    ".modal-open"
  );


/* Close modal function */

function closeProjectModal(modal) {

  if (!modal) {
    return;
  }

  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  body.classList.remove(
    "modal-open"
  );

}


/* Open modal */

modalOpenButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const modalId =
        button.dataset.modal;

      const modal =
        document.getElementById(
          modalId
        );

      if (!modal) {
        return;
      }

      modal.classList.add(
        "active"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      body.classList.add(
        "modal-open"
      );


      /* Focus close button */

      const closeButton =
        modal.querySelector(
          ".modal-close"
        );

      if (closeButton) {

        closeButton.focus();

      }

    }
  );

});


/* =========================================================
   CLOSE BUTTON
========================================================= */

projectModals.forEach((modal) => {

  const closeButton =
    modal.querySelector(
      ".modal-close"
    );

  const backdrop =
    modal.querySelector(
      ".modal-backdrop"
    );


  /* Close using X */

  closeButton.addEventListener(
    "click",
    () => {

      closeProjectModal(
        modal
      );

    }
  );


  /* Close by clicking outside */

  backdrop.addEventListener(
    "click",
    () => {

      closeProjectModal(
        modal
      );

    }
  );

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }

    const activeModal =
      document.querySelector(
        ".project-modal.active"
      );

    closeProjectModal(
      activeModal
    );

  }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
  document.querySelector(
    "#contactForm"
  );


contactForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    const status =
      document.querySelector(
        "#formStatus"
      );


    status.textContent =
      "Demo submitted successfully. Connect this form to a backend or email service before production.";


    contactForm.reset();

  }
);


/* =========================================================
   FOOTER YEAR
========================================================= */

document.querySelector(
  "#year"
).textContent =
  new Date().getFullYear();