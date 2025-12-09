// Product Data
let products = [
    { id: 1, name: "Adult Toothbrush", price: 199 },
    { id: 2, name: "Natural Toothpaste", price: 149 },
    { id: 3, name: "Chewing Gum", price: 99 },
    { id: 4, name: "Mouthwash", price: 249 },
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart UI in Navbar
function updateCartUI() {
    let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    let cartElement = document.querySelector(".cart");
    if (cartElement) {
        cartElement.innerText = `Cart (${totalItems}) - ₹${totalPrice}`;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

updateCartUI();

// Add to cart event
document.querySelectorAll(".add-cart")?.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let product = products[index];

        let item = cart.find(p => p.id === product.id);
        if (item) {
            item.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        updateCartUI();
        alert(`${product.name} added to cart!`);
    });
});

// CART PAGE DISPLAY
if (window.location.pathname.includes("cart.html")) {
    let cartTableBody = document.querySelector("#cartTable tbody");
    let cartTotal = document.getElementById("cartTotal");

    let totalPrice = 0;
    cartTableBody.innerHTML = "";

    cart.forEach(item => {
        cartTableBody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>₹${item.price}</td>
            <td>₹${item.price * item.qty}</td>
        </tr>`;
        totalPrice += item.price * item.qty;
    });

    cartTotal.innerText = `Total Amount: ₹${totalPrice}`;
}

// Navigation
function goTo(page) {
    window.location.href = page;
}
// BUY NOW BUTTON
if (document.getElementById("buyNowBtn")) {
    document.getElementById("buyNowBtn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Clear the cart
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));

        // Go to success page
        goTo("success.html");
    });
}
