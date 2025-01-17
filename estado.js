import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

// Obtén la app inicializada en index.html
const app = getApp(); // Esto utiliza la instancia global inicializada
const db = getFirestore(app); // Conéctalo a Firestore

// Función para establecer el estado en Firestore
const setEstadoEnFirestore = async (estado) => {
    try {
        const docRef = doc(db, "estado", "estadoActual");
        await setDoc(docRef, { estado: estado });
        console.log("Estado actualizado en Firestore:", estado);
    } catch (error) {
        console.error("Error al actualizar el estado en Firestore:", error);
    }
};

// Función para obtener el estado desde Firestore
const getEstadoDesdeFirestore = async () => {
    try {
        const docRef = doc(db, "estado", "estadoActual");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Estado obtenido desde Firestore:", data.estado);
            return data.estado;
        } else {
            console.log("No se encontró el estado en Firestore. Se usará el valor predeterminado.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el estado desde Firestore:", error);
        return null;
    }
};

// Lógica principal para la barra de estado
window.onload = async function () {
    const statusBar = document.getElementById("status-bar");

    try {
        // Verifica si existe un estado en Firestore
        const estadoDesdeFirestore = await getEstadoDesdeFirestore();

        if (estadoDesdeFirestore) {
            // Si hay un estado manual en Firestore, úsalo
            statusBar.textContent = estadoDesdeFirestore;
            statusBar.style.backgroundColor = estadoDesdeFirestore === "ABIERTO" ? "green" : "red";
            localStorage.setItem("estadoPedido", estadoDesdeFirestore.toLowerCase());
        } else {
            // Si no hay estado en Firestore, calcula automáticamente el estado
            const currentDate = new Date();
            const currentDay = currentDate.getDay();
            const currentHour = currentDate.getHours();

            const isOpen = (
                (currentDay === 5 || currentDay === 6 || currentDay === 0) &&
                (currentHour >= 1 && currentHour < 23)
            );

            const estado = isOpen ? "ABIERTO" : "CERRADO";
            statusBar.textContent = estado;
            statusBar.style.backgroundColor = isOpen ? "green" : "red";
            localStorage.setItem("estadoPedido", estado.toLowerCase());

            // Guarda este estado en Firestore solo si no había estado manual
            await setEstadoEnFirestore(estado);
        }
    } catch (error) {
        console.error("Error al inicializar el estado:", error);
        statusBar.textContent = "ERROR";
        statusBar.style.backgroundColor = "gray";
    }
};
