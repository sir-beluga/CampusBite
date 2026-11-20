const resetForm = document.querySelector("#reset-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#form-message");

resetForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!resetForm.reportValidity()) {
    return;
  }

  formMessage.textContent = `A reset link would be sent to ${emailInput.value}. This is a prototype; no email was sent.`;
});
