// Variables globales
let users = [
    { username: 'Isra', fullName: 'Isra Admin', phone: '1234567890', password: 'Isra2025', userType: 'Admin', clientType: null, discount: 0 }
];
let currentUser = null;
let products = [
    { productKey: 'P001', title: 'Acuario 20L', description: 'Acuario de 20 litros', price: 500, stock: 10, image: 'product1.jpg', category: 'Acuario' },
    { productKey: 'P002', title: 'Comida Perros', description: 'Comida balanceada para perros', price: 150, stock: 30, image: 'product2.jpg', category: 'Perro' },
    { productKey: 'P003', title: 'Jaula para Gato', description: 'Jaula de acero inoxidable para gatos', price: 250, stock: 5, image: 'product3.jpg', category: 'Gato' },
    { productKey: 'P004', title: 'Terrario para Reptiles', description: 'Terrario de vidrio para reptiles', price: 450, stock: 8, image: 'product4.jpg', category: 'Reptiles' },
    { productKey: 'P005', title: 'Comida para Roedores', description: 'Comida especial para roedores', price: 100, stock: 25, image: 'product5.jpg', category: 'Roedores' },
    { productKey: 'P006', title: 'Cama para Gato', description: 'Cama cómoda para gatos', price: 200, stock: 15, image: 'product6.jpg', category: 'Gato' },
    { productKey: 'P007', title: 'Jaula para Aves', description: 'Jaula de acero para aves', price: 300, stock: 12, image: 'product7.jpg', category: 'Aves' },
    { productKey: 'P008', title: 'Comida para Reptiles', description: 'Comida especial para reptiles', price: 180, stock: 22, image: 'product8.jpg', category: 'Reptiles' }
];
let cart = [];

// Función para registrar usuarios
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    // Verificar que el usuario no esté registrado
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("El nombre de usuario ya está registrado.");
        return;
    }

    // Crear un nuevo usuario
    const newUser = { username, fullName, phone, password, userType: 'Cliente', clientType: 'Menudeo', discount: 0 };
    users.push(newUser);

    alert("Usuario registrado con éxito.");

    // Iniciar sesión automáticamente
    currentUser = newUser;
    toggleScreens("catalog");
    loadProducts();
});

// Función para iniciar sesión
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Verificar credenciales
    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        alert("Inicio de sesión exitoso.");
        toggleScreens("catalog");
        loadProducts();
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    }
});

// Función para cambiar entre pantallas
function toggleScreens(screen) {
    const screens = document.querySelectorAll(".container");
    screens.forEach(s => s.classList.add("hidden"));

    if (screen === "register") {
        document.getElementById("register-container").classList.remove("hidden");
        // Mostrar el botón "Iniciar sesión" en el contenedor de registro
        document.getElementById("go-to-login").classList.remove("hidden");
    } else if (screen === "login") {
        document.getElementById("login-container").classList.remove("hidden");
    } else if (screen === "catalog") {
        document.getElementById("catalog-container").classList.remove("hidden");
    }
}

// Función para cargar los productos en el catálogo
function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.productKey}')">Añadir al carrito</button>
        `;
        productList.appendChild(productItem);
    });
}

// Función para añadir productos al carrito
function addToCart(productKey) {
    const product = products.find(p => p.productKey === productKey);
    if (product) {
        cart.push(product);
        alert(`${product.title} añadido al carrito.`);
    }
}

// Función para cerrar sesión
document.querySelectorAll(".logout-button").forEach(button => {
    button.addEventListener("click", function () {
        currentUser = null;
        cart = [];
        toggleScreens("register");  // Redirigir a la pantalla de registro
    });
});

// Función para redirigir a la pantalla de inicio de sesión desde la página de registro
document.getElementById("go-to-login").addEventListener("click", function() {
    toggleScreens("login");
});
