const productsContainerElement = document.querySelector(".products-container");
const totalPriceElement = document.querySelector(".products-total");
const clearCartElement = document.querySelector(".clear-btn");
let productsList;
let totalPrice = 0;
let totalQuantity = 0;

// GET PRODUCTS FROM DATA.JSON
async function getProducts() {
  try {
    const response = await fetch("./data.json");
    productsList = await response.json();

    displayProductsCards();
  } catch (e) {
    console.error("Error while fetching data: " + e);
  }
}

// CREATE CARDS DOM
function displayProductsCards() {
  const productsCardsElement = createHtmlCardsElements();

  productsContainerElement.innerHTML = "";
  productsContainerElement.append(...productsCardsElement);

  addListeners(productsCardsElement);
  getTotalPrice();
}

function createHtmlCardsElements() {
  return productsList.map((product) => {
    const card = document.createElement("div");
    card.classList.add("products-card");

    card.innerHTML = `
    <div data-id=${product.id} class="card-like">
      ${
        product.isLiked
          ? `<i data-id=${product.id} class="fa-solid fa-heart"></i>`
          : `<i data-id=${product.id} class="fa-regular fa-heart"></i>`
      }
    </div>
    <div class="card-img">
      <img src=${product.img} alt=${product.name} />
    </div>
    <div class="card-content">
      <p class="card-name">${product.name}</p>
      <p class="card-price">${product.price.toFixed(2)} €</p>
      <div class="card-action">
        <i data-id=${product.id} class="fa-solid fa-trash delete-btn"></i>
        <input data-id=${product.id} type="number" value=${
      product.quantity
    } min="0" />
        <i data-id=${product.id} class="fa-solid fa-circle-plus add-btn"></i>
      </div>
    </div>
    `;
    return card;
  });
}

// ADD LISTENERS ON BTNS
function addListeners(productsCardsElement) {
  productsCardsElement.forEach((product) => {
    const deleteBtn = product.querySelector(".delete-btn");
    const addBtn = product.querySelector(".add-btn");
    const input = product.querySelector("input[type=number]");
    const likeBtn = product.querySelector(".card-like");

    deleteBtn.addEventListener("click", deleteCard);
    addBtn.addEventListener("click", updateQuantity);
    input.addEventListener("change", updateQuantity);
    likeBtn.addEventListener("click", toggleLike);
  });
}

// CARDS BTNS EVENTS LISTENERS
function deleteCard(event) {
  const currentCard = productsList.find(
    (product) => product.id == event.target.dataset.id
  );
  currentCard.quantity = 0;

  displayProductsCards();
}

function updateQuantity(event) {
  const currentCard = productsList.find(
    (product) => product.id == event.target.dataset.id
  );

  if (event.type === "change") {
    const inputValue = parseInt(event.target.value);
    currentCard.quantity = inputValue;
  } else if (event.type === "click") {
    currentCard.quantity += 1;
  }

  displayProductsCards();
}

function toggleLike(event) {
  const currentCard = productsList.find(
    (product) => product.id == event.target.dataset.id
  );
  currentCard.isLiked = !currentCard.isLiked;

  displayProductsCards();
}

// CALCULATE TOTAL PRICE AND UPDATE DOM
function getTotalPrice() {
  const totalHtmlElements = createSubTotalHtmlElements();

  const separator = document.createElement("hr");
  separator.classList.add("separator");

  const cartTotalElement = setTotalCartPrice();

  totalPriceElement.innerHTML = "";
  totalPriceElement.append(...totalHtmlElements, separator, cartTotalElement);
}

function createSubTotalHtmlElements() {
  return productsList.map((product) => {
    if (product.quantity > 0) {
      const cartElement = document.createElement("li");
      cartElement.classList.add("sub-total");
      cartElement.innerHTML = `${product.name} (${product.quantity}) : ${
        product.price * product.quantity
      } €`;

      return cartElement;
    } else {
      return "";
    }
  });
}

function setTotalCartPrice() {
  totalPrice = productsList.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  totalQuantity = productsList.reduce((acc, product) => {
    acc += product.quantity;
    return acc;
  }, 0);

  const cartTotalElement = document.createElement("li");
  cartTotalElement.classList.add("sum-total");

  if (totalPrice !== 0) {
    cartTotalElement.classList.add(checkTotalPrice());
  }

  cartTotalElement.innerHTML = `Total ${
    totalPrice ? `(${totalQuantity})` : ""
  } : ${totalPrice.toFixed(2)} €`;

  return cartTotalElement;
}

function checkTotalPrice() {
  if (totalPrice > 0 && totalPrice < 50) {
    return "green";
  }
  if (totalPrice >= 50 && totalPrice < 75) {
    return "orange";
  }
  if (totalPrice >= 75) {
    return "red";
  }
}

//CLEAR CART BUTTON
clearCartElement.addEventListener("click", clearCart);

function clearCart() {
  productsList = productsList.map((product) => {
    return {
      ...product,
      quantity: 0,
    };
  });

  displayProductsCards();
}

// FIRST LOAD INITIALIZATION
getProducts();
