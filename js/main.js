document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var name = form.querySelector("#name");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (status) {
        var firstName = name && name.value ? name.value.split(" ")[0] : "there";
        status.textContent =
          "Thank you, " +
          firstName +
          ". Your message has been noted — since this is a preview site, no message was actually sent. Connect a form backend (e.g. Formspree, or a simple mail API) to make this live.";
        status.classList.remove("is-error");
        status.classList.add("is-visible");
      }

      form.reset();
    });
  }
});
