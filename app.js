// Data
const products = [
    { id: 1, category: 'bebidas', name: "Café Tostado Natural", description: "Grano pequeño seleccionado de altura con notas florales.", price: 20.00, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, category: 'bebidas', name: "Mezcla Cloud Coffe", description: "Cremoso, suave y con un toque de dulzor orgánico.", price: 45.00, image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, category: 'bebidas', name: "Grano Moka Premium", description: "Intensidad media con notas a chocolate y miel.", price: 70.00, image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, category: 'bebidas', name: "Kit Degustación Pequeño", description: "Perfecto para probar nuestra selección especial.", price: 100.00, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 5, category: 'postres', name: "Surtido de Reposterías", description: "Dulces clásicos horneados diariamente para acompañar tu café.", price: 60.00, image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 6, category: 'postres', name: "Galletas de Avena", description: "Crujientes, caseras y llenas de fibra. Receta tradicional.", price: 65.00, image: "./img/galletas-de-avena-1536x1152.webp" },
    { id: 7, category: 'postres', name: "Galletas de Avena con Pasas", description: "El toque dulce de las pasas en nuestra clásica galleta de avena.", price: 75.00, image: "./img/Captura%20de%20pantalla%202026-03-30%20162743.png" },
    { id: 8, category: 'postres', name: "Brownies de Chocolate", description: "Esponjosos por dentro, crujientes por fuera. Irresistibles.", price: 90.00, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 9, category: 'postres', name: "Sándwich Fresco", description: "Perfecto para un almuerzo ligero, natural y lleno de energía.", price: 150.00, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 10, category: 'postres', name: "Pastel de Zanahoria", description: "Con suave cubierta de queso crema y un toque de canela espectacular.", price: 120.00, image: "./img/Captura%20de%20pantalla%202026-03-30%20162042.png" },
    { id: 11, category: 'postres', name: "Pastel de Chocolate", description: "Triple chocolate, húmedo y decorado artesanalmente para endulzar el día.", price: 130.00, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 12, category: 'postres', name: "Pastel de Nueces", description: "Una mezcla perfecta de masa suave y nueces tostadas.", price: 125.00, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 13, category: 'postres', name: "Pastel de Tres Leches", description: "El clásico latino, dulce, húmedo y bañado en deliciosa crema.", price: 140.00, image: "./img/Captura%20de%20pantalla%202026-03-30%20162158.png" },
    { id: 14, category: 'postres', name: "Pan de Maíz", description: "Esponjoso pan de maíz al estilo casero, dorado a la perfección.", price: 80.00, image: "./img/Captura%20de%20pantalla%202026-03-30%20162434.png" },
    { id: 15, category: 'postres', name: "Patty Costeño", description: "Empanada tradicional con masa dorada, crujiente y relleno exquisito.", price: 90.00, image: "./img/Captura%20de%20pantalla%202026-03-30%20162536.png" }
];

// State
let cart = JSON.parse(localStorage.getItem('cloud_cart')) || [];

function saveCart() {
    localStorage.setItem('cloud_cart', JSON.stringify(cart));
}

// DOM Elements
const cartBadge = document.getElementById('cart-badge');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnGoCheckout = document.getElementById('btn-go-checkout');

// Navigation
const views = document.querySelectorAll('.view-section');
window.switchView = (id) => {
    views.forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.body.classList.remove('cart-open');
    if(id === 'section-checkout') renderCheckout();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.getElementById('btn-home').addEventListener('click', () => switchView('section-home'));
document.getElementById('btn-shop').addEventListener('click', () => switchView('section-catalog'));
document.getElementById('btn-about').addEventListener('click', () => switchView('section-about'));
document.getElementById('nav-logo').addEventListener('click', () => switchView('section-home'));
btnGoCheckout.addEventListener('click', () => switchView('section-checkout'));

// Render Products
function getProductHTML(p) {
    return `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" class="prod-img">
            <div class="prod-info">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="price-row">
                    <span class="price">C$ ${p.price.toFixed(2)}</span>
                    <button class="icon-btn" onclick="addToCart(${p.id})"><i class="ph-fill ph-plus-circle" style="color:var(--cloud-pink); font-size:32px;"></i></button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts() {
    const bebidas = products.filter(p => p.category === 'bebidas');
    const postres = products.filter(p => p.category === 'postres');
    
    document.getElementById('grid-bebidas').innerHTML = bebidas.map(getProductHTML).join('');
    document.getElementById('grid-postres').innerHTML = postres.map(getProductHTML).join('');
}

// Cart Logic
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const exists = cart.find(c => c.id === id);
    if(exists) exists.qty++;
    else cart.push({ ...product, qty: 1 });
    updateCartUI();
    
    cartBadge.classList.add('pop');
    setTimeout(() => cartBadge.classList.remove('pop'), 300);

    showToast(`${product.name} añadido al carrito`, true);
};

window.removeFromCart = (id) => {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
};

window.changeQty = (id, delta) => {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(c => c.id !== id);
        }
        updateCartUI();
    }
};

function updateCartUI() {
    const totalQty = cart.reduce((acc, c) => acc + c.qty, 0);
    const subtotal = cart.reduce((acc, c) => acc + (c.price * c.qty), 0);
    
    cartBadge.textContent = totalQty;
    cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío</div>';
        btnGoCheckout.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(c => `
            <div class="cart-item">
                <img src="${c.image}" alt="${c.name}" class="ci-img">
                <div class="ci-details">
                    <div class="ci-title">${c.name}</div>
                    <div class="ci-price">C$ ${(c.price * c.qty).toFixed(2)}</div>
                    <div class="ci-qty-control">
                        <button class="qty-btn" onclick="changeQty(${c.id}, -1)"><i class="ph ph-minus"></i></button>
                        <span>${c.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${c.id}, 1)"><i class="ph ph-plus"></i></button>
                    </div>
                </div>
                <button class="ci-remove" onclick="removeFromCart(${c.id})"><i class="ph ph-trash"></i></button>
            </div>
        `).join('');
        btnGoCheckout.disabled = false;
    }
    cartTotalPrice.textContent = `C$ ${subtotal.toFixed(2)}`;
    saveCart();
}

// Checkout Logic
function renderCheckout() {
    const subtotal = cart.reduce((acc, c) => acc + (c.price * c.qty), 0);
    const delivery = 150.00;
    const total = subtotal + delivery;

    document.getElementById('checkout-items-list').innerHTML = cart.map(c => `
        <div class="checkout-item-row">
            <span>${c.qty}x ${c.name}</span>
            <span>C$ ${(c.price * c.qty).toFixed(2)}</span>
        </div>
    `).join('');
    
    document.getElementById('checkout-subtotal').textContent = `C$ ${subtotal.toFixed(2)}`;
    document.getElementById('checkout-delivery').textContent = `C$ ${delivery.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `C$ ${total.toFixed(2)}`;
}

document.getElementById('btn-confirm-order').addEventListener('click', () => {
    const form = document.getElementById('delivery-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    showToast(`¡Pedido confirmado con éxito! Gracias por comprar.`, true);
    cart = [];
    updateCartUI();
    setTimeout(() => switchView('section-home'), 3000);
});

// Sidebar & Modals
document.getElementById('btn-cart-open').addEventListener('click', () => document.body.classList.add('cart-open'));
document.getElementById('btn-cart-close').addEventListener('click', () => document.body.classList.remove('cart-open'));

const loginModal = document.getElementById('login-modal');
document.getElementById('btn-login-open').addEventListener('click', () => loginModal.classList.add('modal-open'));
document.getElementById('btn-login-close').addEventListener('click', () => loginModal.classList.remove('modal-open'));

let isLoginMode = true;
const authToggleBtn = document.getElementById('auth-toggle-btn');
const authSubmitBtn = document.getElementById('auth-submit-btn');

authToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    const registerField = document.querySelector('.register-field');
    const title = document.getElementById('modal-auth-title');
    const desc = document.getElementById('modal-auth-desc');
    const nameInput = document.getElementById('l-name');
    
    if(isLoginMode) {
        registerField.style.display = 'none';
        nameInput.required = false;
        authSubmitBtn.textContent = 'Ingresar';
        document.getElementById('auth-toggle-text').textContent = '¿No tienes cuenta?';
        authToggleBtn.textContent = 'Regístrate aquí';
        title.innerHTML = 'Bienvenido a <span class="brand-text">Cloud</span> <span class="brand-text-dark">Coffe</span>';
        desc.textContent = 'Inicia sesión para una experiencia más dulce.';
    } else {
        registerField.style.display = 'block';
        nameInput.required = true;
        authSubmitBtn.textContent = 'Registrarse';
        document.getElementById('auth-toggle-text').textContent = '¿Ya tienes cuenta?';
        authToggleBtn.textContent = 'Inicia sesión';
        title.innerHTML = 'Crear <span class="brand-text">Cuenta</span>';
        desc.textContent = 'Únete para pedir de la forma más rápida.';
    }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    loginModal.classList.remove('modal-open');
    showToast(isLoginMode ? 'Sesión iniciada correctamente' : 'Cuenta creada correctamente', true);
});

// Toasts
function showToast(msg, isSuccess = false) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = isSuccess ? 'var(--success)' : 'var(--text-dark)';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Chatbot Logic
const chatToggleBtn = document.getElementById('btn-chat-toggle');
const chatWindow = document.getElementById('chat-window');
const btnChatClose = document.getElementById('btn-chat-close');
const chatForm = document.getElementById('chat-form');
const chatInputText = document.getElementById('chat-input-text');
const chatMessages = document.getElementById('chat-messages');

chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('chat-open'));
btnChatClose.addEventListener('click', () => chatWindow.classList.remove('chat-open'));

const knowledgeBase = [
    { keywords: ['historia', 'nacieron', 'comenzaron', 'empezaron', 'origen', 'crearon'], response: 'Nuestra historia comenzó con un gran sueño: crear una cafetería sostenible y con tecnología verde para revolucionar la forma en que el campus consume café.' },
    { keywords: ['motivo', 'razon', 'existencia', 'por que', 'mision'], response: 'Existimos porque creemos que la tecnología verde y un buen café pueden ir de la mano. Nuestro motivo principal es ser una cafetería sostenible, cuidando la huella de carbono y apoyando el comercio justo.' },
    { keywords: ['sostenible', 'tecnologia verde', 'ecologico', 'ambiental', 'planeta'], response: '¡Somos 100% ecológicos! Usamos tecnología verde, empaques biodegradables y tratamos directamente con pequeños agricultores que no usan agroquímicos dañinos.' },
    { keywords: ['hola', 'buenos', 'tardes', 'dias', 'saludos'], response: '¡Hola! Soy CloudBot. ¿Te gustaría conocer sobre nuestra historia sostenible, nuestro enfoque de tecnología verde o sobre un producto?' },
    { keywords: ['precio', 'costo', 'valen'], response: 'A pesar de nuestros procesos ecológicos, mantenemos precios accesibles (C$ 20.00 a C$ 150.00) para toda la comunidad universitaria.' },
    { keywords: ['gracias', 'amable', 'excelente', 'perfecto'], response: '¡De nada! Recuerda, cada taza que tomas aquí, ayuda un poquito a nuestro planeta.' }
];

function getBotResponse(input) {
    const text = input.toLowerCase();
    for (let pkg of knowledgeBase) {
        if (pkg.keywords.some(kw => text.includes(kw))) {
            return pkg.response;
        }
    }
    return '¡Esa es una pregunta interesante! En Cloud Coffe somos soñadores natos. Existimos para darte lo mejor en cada taza. Si quieres saber más sobre nuestra historia, solo pregúntame.';
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = chatInputText.value.trim();
    if (!txt) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'msg-user';
    userMsg.textContent = txt;
    chatMessages.appendChild(userMsg);
    
    chatInputText.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg-bot';
        botMsg.textContent = getBotResponse(txt);
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
});

// Init
renderProducts();
updateCartUI();
