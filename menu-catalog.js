const foods = [
  { id: "chicken-burger", name: "Chicken Burger", category: "Snacks", price: 350, time: "~10 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", fallback: "🍔", quantity: 2 },
  { id: "veg-fried-rice", name: "Veg Fried Rice", category: "Meals", price: 400, time: "~12 min", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80", fallback: "🍚" },
  { id: "iced-tea", name: "Iced Tea", category: "Drinks", price: 150, time: "~3 min", unavailable: true, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&h=400&q=80", fallback: "🧋" },
  { id: "samosa", name: "Samosa", category: "Snacks", price: 80, time: "~5 min", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", fallback: "🥟" },
  { id: "chicken-momo", name: "Chicken Momo", category: "Snacks", price: 220, time: "~12 min", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80", fallback: "🥟" },
  { id: "chowmein", name: "Chowmein", category: "Meals", price: 250, time: "~10 min", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80", fallback: "🍜" },
  { id: "lemon-soda", name: "Lemon Soda", category: "Drinks", price: 100, time: "~3 min", image: "https://images.unsplash.com/photo-1585422394134-281cb73c35db?auto=format&fit=crop&w=800&h=400&q=80", fallback: "🍋" },
  { id: "veg-sandwich", name: "Veg Sandwich", category: "Snacks", price: 180, time: "~8 min", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80", fallback: "🥪" }
];

const grid = document.querySelector("#menu-grid");
const searchInput = document.querySelector("#food-search");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
let selectedCategory = "All";
let toastTimer;

function cardMarkup(food) {
  const art = food.emoji
    ? `<div class="food-art emoji" role="img" aria-label="${food.name}"><span class="food-emoji" aria-hidden="true">${food.emoji}</span></div>`
    : `<div class="food-art"><img class="food-photo" src="${food.image}" alt="${food.name}" loading="lazy" referrerpolicy="no-referrer" data-fallback="${food.fallback}"></div>`;
  const action = food.unavailable
    ? `<span class="unavailable"><span aria-hidden="true">●</span> &nbsp;Unavailable</span>`
    : food.quantity > 0
      ? `<div class="quantity" aria-label="Quantity of ${food.name}"><button type="button" data-step="-1" data-id="${food.id}" aria-label="Remove one ${food.name}">−</button><span>${food.quantity}</span><button type="button" data-step="1" data-id="${food.id}" aria-label="Add one ${food.name}">+</button></div>`
      : `<button class="button add-button" type="button" data-add="${food.id}">Add</button>`;

  return `<article class="food-card">
    ${art}
    <h2 class="food-name">${food.name}</h2>
    <p class="food-meta">${food.category} · ${food.time}</p>
    <div class="card-bottom"><span class="price">Rs ${food.price}</span>${action}</div>
  </article>`;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleFoods = foods.filter((food) =>
    (selectedCategory === "All" || food.category === selectedCategory) &&
    food.name.toLowerCase().includes(query)
  );
  grid.innerHTML = visibleFoods.map(cardMarkup).join("");
  emptyState.hidden = visibleFoods.length > 0;
}

function updateCart() {
  const units = foods.reduce((sum, food) => sum + food.quantity, 0);
  const total = foods.reduce((sum, food) => sum + food.quantity * food.price, 0);
  document.querySelector("#cart-summary-text").textContent = `Cart: ${units} ${units === 1 ? "item" : "items"} - Rs ${total}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll(".filter").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    render();
  });
});

searchInput.addEventListener("input", render);
grid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const stepButton = event.target.closest("[data-step]");
  if (addButton) {
    const food = foods.find((item) => item.id === addButton.dataset.add);
    food.quantity += 1;
    updateCart();
    render();
    showToast(`${food.name} added to your cart`);
  }
  if (stepButton) {
    const food = foods.find((item) => item.id === stepButton.dataset.id);
    food.quantity = Math.max(0, food.quantity + Number(stepButton.dataset.step));
    updateCart();
    render();
  }
});

grid.addEventListener("error", (event) => {
  const image = event.target.closest(".food-photo");
  if (!image) return;
  const art = image.parentElement;
  art.classList.add("image-failed");
  art.setAttribute("role", "img");
  art.setAttribute("aria-label", image.alt);
  art.innerHTML = `<span class="food-emoji" aria-hidden="true">${image.dataset.fallback}</span>`;
}, true);

document.querySelectorAll("[data-view-cart]").forEach((button) => {
  button.addEventListener("click", () => showToast("Your cart is ready to review."));
});

document.querySelectorAll(".sidebar nav a, .logout").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") !== "#catalog") {
      event.preventDefault();
      showToast(`${link.textContent.trim()} is part of the CampusBite prototype.`);
    }
  });
});

render();
updateCart();
