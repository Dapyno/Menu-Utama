function openModal(imageSrc) {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = imageSrc;
}

function closeModal(event) {
  if (event) event.stopPropagation();
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  document.getElementById("modalImage").src = "";
}

function openContactModal() {
  const contactModal = document.getElementById("contactModal");
  contactModal.style.display = "flex";

  const form = document.getElementById("contactForm");
  form.reset();

  [...form.elements].forEach(el => el.classList.remove("invalid"));

  form.style.display = "block";
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("nameModal").focus();
}

function closeContactModal(event) {
  if (event) event.stopPropagation();
  document.getElementById("contactModal").style.display = "none";
}

function toggleSidebar() {
  const menu = document.getElementById("sideMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function validateForm(form) {
  let isValid = true;
  [...form.elements].forEach(el => {
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (!el.value.trim()) {
        el.classList.add("invalid");
        isValid = false;
      } else {
        el.classList.remove("invalid");
      }
    }
  });
  return isValid;
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  if (!validateForm(this)) {
    const firstInvalid = this.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }
  this.style.display = "none";
  document.getElementById("successMessage").style.display = "block";
});

document.getElementById("successCloseBtn").addEventListener("click", function() {
  closeContactModal();
});

document.addEventListener("click", function(event) {
  const sidebar = document.getElementById("sideMenu");
  const toggleButton = event.target.id === "toggleBtn";
  const isInside = sidebar.contains(event.target);

  if (!isInside && !toggleButton && sidebar.style.display === "block") {
    sidebar.style.display = "none";
  }
});

const formElements = document.querySelectorAll("#contactForm input, #contactForm textarea");
formElements.forEach((el, index) => {
  el.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (index < formElements.length - 1) {
        formElements[index + 1].focus();
      } else {
        document.getElementById("contactForm").requestSubmit();
      }
    }
  });
});