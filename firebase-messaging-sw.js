// Importa las librerías necesarias
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-database-compat.js');

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCzMNKimcw1kaaJlMdTKj7RAdlsHyaImBk",
    authDomain: "vera-pizza-app.firebaseapp.com",
    projectId: "vera-pizza-app",
    storageBucket: "vera-pizza-app.firebasestorage.app",
    messagingSenderId: "783988757356",
    appId: "1:783988757356:web:c66d3f2571aff0f125d949",
    measurementId: "G-FNLSPHKXFW"
};

// Inicializa Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);

// Obtén el servicio de mensajería
const messaging = firebase.messaging();
const database = firebase.database(); // (Nota: `database` estaba mal escrito)

