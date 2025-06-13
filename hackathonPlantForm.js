//CHOOSING PLANTS//

//icon is set to first one by default
var selectedIcon = document.getElementById("plant1");
var imgs = document.querySelectorAll(".plant");
var selectedImage;


imgs.forEach((img) => {
    img.addEventListener("click", async(e) => {
        e.preventDefault();

        var lastSelectedIcon = selectedIcon;
        var clickedID = img.id;

        lastSelectedIcon.style.borderColor = "#ffffff";
    
        selectedIcon = document.getElementById(clickedID);
        selectedIcon.style.borderColor = "#0689aa"
        //console.log(selectedIcon);

        //store the image link
        selectedImage = "images/" + clickedID + ".png";

    });
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//SETTING UP FIREBASE AND FIRESTORE//

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {

    apiKey: "AIzaSyCy_tqUSARUIvaD9lyuJk4LZDwaa_zjC9Y",
    authDomain: "mudsock-hackathon.firebaseapp.com",
    projectId: "mudsock-hackathon",
    storageBucket: "mudsock-hackathon.appspot.com",
    messagingSenderId: "511083006715",
    appId: "1:511083006715:web:8ec4d98a6ea5fe0f9f7e5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//SUBMITTING DATA//


const submitBtn = document.getElementById("subBtn");

submitBtn.addEventListener("click", async(e) => {
    e.preventDefault();



    nameInput = document.getElementById("nameInput").value;
    waterInput = document.getElementById("waterInput").value;


    // var namesList = [];
    // var waterList = [];

    // namesList.push(nameInput);
    // waterList.push(waterInput);


    try {
        const docRef = await addDoc(collection(db, "Preferences"), {
          name: nameInput,
          time: waterInput,
          link: selectedImage
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
    }

    location.href = "garden.html";
  
    
});




var nameInput = "";
var waterInput = "";