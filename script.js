const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
const cartContent = document.querySelector(".cart-content");

addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const menuItem = event.target.closest(".menu-item");
    addToCart(menuItem);
  });
});

function addToCart(menuItem) {
  const productImgSrc = menuItem.querySelector("img").src;
  const productTitle = menuItem.querySelector(".product-title").textContent;
  const productPrice = menuItem.querySelector(".price").textContent;

  // Check for duplicates
  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      alert("This item is already in the cart.");
      return;
    }
  }

  // Create cart item box
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
    <div class="cart-detail">
      <h3 class="cart-product-title">${productTitle}</h3>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <button class="decrement">-</button>
        <span class="number">1</span>
        <button class="increment">+</button>
      </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);

  // Remove cart item
  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();

    updateCartCount(-1);
    updateTotalPrice();
  });

  // Increment quantity
  cartBox.querySelector(".increment").addEventListener("click", () => {
    const numberElement = cartBox.querySelector(".number");
    let quantity = parseInt(numberElement.textContent);
    quantity++;
    numberElement.textContent = quantity;
    updateTotalPrice();
  });

  // Decrement quantity
  cartBox.querySelector(".decrement").addEventListener("click", () => {
    const numberElement = cartBox.querySelector(".number");
    let quantity = parseInt(numberElement.textContent);
    if (quantity > 1) {
      quantity--;
      numberElement.textContent = quantity;

      updateTotalPrice();
    }
  });

  updateCartCount(1);

  // Update total for the first time
  updateTotalPrice();
}

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");

    const price = parseFloat(priceElement.textContent.replace("₱",""));
    const quantity = parseInt(quantityElement.textContent);

    total += price * quantity;
  });

  totalPriceElement.textContent = `₱${total.toFixed(2)}`;
}

let cartItemCount = 0;
const updateCartCount = change => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount; 
  }
  else{
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
}

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0 ) {
        alert(" Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();
    
    alert("Thank You for your purchase!!");
}); 
