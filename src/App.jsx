import React, { useState } from 'react';
import { StateProvider } from './StateContext';
import "./root.css";

import CROSS_HAIR from "./Assets/Media/UI/crosshair.png";

import Entry from "./Components/Entry";
import Scene from "./Components/Scene";
import HUD from './Components/HUD';

const App = () => {
    window.onmousemove = (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        console.log(mouseX, mouseY);

        document.getElementById("cross-hair").style.left = `${mouseX}px`;
        document.getElementById("cross-hair").style.top = `${mouseY}px`;

        document.getElementById("x-coord").innerHTML = mouseX;
        document.getElementById("x-coord").style.left = `${mouseX + 60}px`;
        document.getElementById("x-coord").style.top = `${mouseY + 20}px`;

        document.getElementById("y-coord").innerHTML = mouseY;
        document.getElementById("y-coord").style.left = `${mouseX + 60}px`;
        document.getElementById("y-coord").style.top = `${mouseY + 40}px`;
    }


    return (
        <>
            <img id="cross-hair" src={CROSS_HAIR} />
            <p id="x-coord"></p>
            <p id="y-coord"></p>

            <main id="page">
                <StateProvider>
                    <Scene />
                    <Entry />
                    <HUD />
                </StateProvider>
            </main>
        </>
    )
}

export default App;