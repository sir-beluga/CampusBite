const roleButtons = document.querySelectorAll(".role-button");
const loginForm = document.querySelector("#login-form");
const message = document.querySelector("#message");

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((role) => role.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "Login details submitted.";
});
