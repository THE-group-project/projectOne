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


// sign into google account using firebase authentication. 
googleSignIn=() => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function(result){
        console.log(result);
        console.log('Success')
    }).catch(function(err){
        console.log(err);
        console.log('Failed Log in');
    })
}










