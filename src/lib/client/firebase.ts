import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { browser, dev } from '$app/environment';
import type { Analytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDLCZc417qgYJAxEUnlLqWIVBS3RvHTiaU",
    authDomain: "imlargo-portfolio.firebaseapp.com",
    projectId: "imlargo-portfolio",
    storageBucket: "imlargo-portfolio.appspot.com",
    messagingSenderId: "227082810492",
    appId: "1:227082810492:web:383df50436c93fc51345f9",
    measurementId: "G-3QQS0PQCTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: Analytics;
if (browser && dev === false) {
    analytics = getAnalytics(app);
}

export { analytics, app };