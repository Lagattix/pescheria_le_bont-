// Firebase Configuration
// Replace with your actual Firebase config from Firebase Console

const firebaseConfig = {
    apiKey: "AIzaSyA8A9d_-TM6mjimtp9eXi0QN3RSUWWYqOY",
    authDomain: "pescherie-le-bonta.firebaseapp.com",
    projectId: "pescherie-le-bonta",
    storageBucket: "pescherie-le-bonta.firebasestorage.app",
    messagingSenderId: "84578968603",
    appId: "1:84578968603:web:cb03020ef7f33d967a44be"
};

// Initialize Firebase
// Uncomment when you have Firebase credentials
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const analytics = firebase.analytics();

// Example: Save contact form to Firestore
async function saveContact(formData) {
    try {
        const docRef = await db.collection('contacts').add({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'new'
        });
        console.log('Contact saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving contact:', error);
        return { success: false, error: error.message };
    }
}

// Example: Get products from Firestore
async function getProducts() {
    try {
        const snapshot = await db.collection('products').get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
        return [];
    }
}

// Example: Analytics tracking
function trackEvent(eventName, params = {}) {
    if (typeof analytics !== 'undefined') {
        analytics.logEvent(eventName, params);
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveContact,
        getProducts,
        trackEvent
    };
}
