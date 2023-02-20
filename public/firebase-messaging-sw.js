importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAcnwA0rbfkl9xLDsKip90UQJiEhEI-Zqk",
  authDomain: "fir-auth-uicha.firebaseapp.com",
  projectId: "fir-auth-uicha",
  storageBucket: "fir-auth-uicha.appspot.com",
  messagingSenderId: "1016743172246",
  appId: "1:1016743172246:web:7fad891741810296344ab7",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
