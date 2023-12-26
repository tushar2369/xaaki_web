importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyC3cYULP6o5saMHO7NCYWhYZT0nAO8-K68",
  authDomain: "xaaki-ed889.firebaseapp.com",
  databaseURL: "https://xaaki-ed889-default-rtdb.firebaseio.com",
  projectId: "xaaki-ed889",
  storageBucket: "xaaki-ed889.appspot.com",
  messagingSenderId: "634917945082",
  appId: "1:634917945082:web:d030bf026b8e4922655343",
  measurementId: "G-FKPD82Q4SR"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});