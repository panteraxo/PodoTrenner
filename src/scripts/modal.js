document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#modal");
  const modalContent = document.querySelector("#modal-content");
  const openButtons = document.querySelectorAll(".column");
  const closeButton = document.querySelector("#close-modal");

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.querySelector(".card").innerHTML;
      modalContent.innerHTML = content.replace(/\n/g, '<br>');
      modal.classList.remove("hidden");
    });
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
