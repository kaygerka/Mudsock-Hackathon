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

//CREATING LISTS//
const plantNames = [];
const plantWateringTimes = [];
const plantLinks = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GETTING DATA//
const querySnapshot = await getDocs(collection(db, "Preferences"));
querySnapshot.forEach((doc) => {
    var plantName = doc.data().name;
    var plantWaterTime = doc.data().time;
    var plantLink = doc.data().link;


    plantNames.push(plantName);
    plantWateringTimes.push(plantWaterTime);
    plantLinks.push(plantLink);
    
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CHANGING SELECT OPTIONS//

var selects = document.querySelectorAll(".selects");

selects.forEach((select) => {
    const option = document.createElement("option");
    const node = document.createTextNode("Choose");
    option.appendChild(node);
    select.appendChild(option);

    for (var i = 0; i < plantNames.length; i++) {
        const option = document.createElement("option");
        const node = document.createTextNode(plantNames[i]);
        option.appendChild(node);
        select.appendChild(option);
    
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CHANGING PLANT IMAGES
for (var i = 0; i < selects.length; i++) {
    var select = selects[i];
    console.log(selects[i]);


    select.addEventListener("change", async(e) => {
        e.preventDefault();
        console.log('hi',e.target)
        console.log(select);
        let currentSelect = e.target
        var target = currentSelect.id;

        var num = target.slice(6);

        var query = "." + num

        var plant = currentSelect.value;
        console.log("PLANT", plant)
        var index = plantNames.indexOf(plant);
        console.log("INDEX", index)
        var link = plantLinks[index];

        console.log("LINK", link)

        let img = document.createElement("img");
        img.src = link;

        img.style.width = 150 + "px";
        img.style.height = 150 + "px";
        img.style.marginTop = 10 + "px";

        let elem = document.querySelector(query)
        elem.appendChild(img);

    });

    // for (var i = 0; i < plantNames; i++) {
    //     var time = parseInt(plantWateringTimes[i]);
    //     console.log("TIME", time*60000)
    
    //     function timer() {
    //         alert("Time to water" + plantNames[i]);
    //     }
    
    //     setInterval(timer, time);
    
    // }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CREATING TIMERS//

// let now = new Date()

// setInterval(()=>{
//     for(i=0; i<plantWateringTimes)

// }, 5000)


for (var i = 0; i < plantWateringTimes.length; i++) {
    console.log(plantNames[i])
    alert("It's time to water your " + plantNames[i] + "!");

}