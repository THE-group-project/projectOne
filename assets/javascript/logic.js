// Initialize the Firebase
    
    var config = {
        apiKey: "AIzaSyAA5pfTDwiagC2B-wWw67H1LSlrSf8meFY",
        authDomain: "bbbproject-b637f.firebaseapp.com",
        databaseURL: "https://bbbproject-b637f.firebaseio.com",
        projectId: "bbbproject-b637f",
        storageBucket: "bbbproject-b637f.appspot.com",
        messagingSenderId: "221102547170"
     };

    firebase.initializeApp(config);
    // comment
    

// linking to button that POPS UP google sign in/auth.

function googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(result => {
        const user = result.user;
        document.write('Hello ${user.displayName}');
        console.log(user)
    })
     .catch(console.log);
};













