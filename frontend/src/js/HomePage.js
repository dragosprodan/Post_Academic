import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import Orar from "./Orar.js"
import '../css/home.css'

export default function HomePage() {
    fetchCall();

    return (
        <div id="homePage">
            <div id="homeLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>
            <div id="homeRight"> 
                <Orar />
            </div>
        </div>
    );
}

function fetchCall() {
    fetch('http://localhost:3000/api/authority')
        .then(response => response.text())
        .then(alo => alert(alo))
        .catch( e => alert(e));
}