import React, { useContext, useState } from "react";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import "./index.css";

import ENTRY_UI from "../../Assets/Media/UI/enter_ui.png";

const Entry = () => {
    const { updateEntry } = useContext(StateContext);
    const { updateHUD } = useContext(StateContext);

    const [entryUIScale, setEntryUIScale] = useState(1);
    const [uniqueId, setUniqueId] = useState("000000000");

    const handleEntryMouseDown = () => {
        let entryPass = true;
        updateEntry(entryPass);

        setEntryUIScale(0);
        generateUniqueId();
    }

    const generateUniqueId = () => {
        const min = 100000000;
        const max = 999999999;

        let uuId = Math.floor(Math.random() * (max - min + 1)) + min;
        setUniqueId(uuId.toString());

        generateId();
    }

    const generateId = () => {
        const element = document.getElementById("id-text");
        const letters = "1234567890";
        let interval = null,
          iteration = 0,
          counter = 0,
          timer = 30,
          flag = 30;
      
        clearInterval(interval);
      
        interval = setInterval(() => {
            counter++;
      
            let endText = element.dataset.stringValue;
        
            element.innerText = element.innerText.split("").map((letter, index) => {
                iteration = -10;
        
                if (index < iteration) {
                    return element.dataset.stringValue[index];
                }
        
                if (counter === flag) {
                    iteration = flag;
                    element.dataset.stringValue = endText;
                    return element.dataset.stringValue[index];
                }

                return letters[Math.floor(Math.random() * 9)];
            }).join("");
        
            if (iteration >= element.dataset.stringValue.length) {
                element.innerText = "Welcome astronaut No." + element.innerText.replace(/(.{3})/g, "$1-").slice(0, -1);
                clearInterval(interval);
                counter = counter;

                $(".enter-website-container").fadeOut(2000);
                let entryScreen = document.getElementById("entry-screen");
                let entryBlur = getComputedStyle(document.getElementById("entry-screen")).getPropertyValue("--entry-screen-blur");
                let blurVal = parseFloat(entryBlur);
                
                let blurInterval = setInterval(() => {
                    blurVal -= 1;
                    if (blurVal <= 0) clearInterval(blurInterval);
        
                    entryScreen.style.setProperty("--entry-screen-blur", blurVal + "px");
                }, 50);

                updateHUD(true);
            }
      
            iteration += 1 / 5;
        }, timer);
    };
      

    const entryUIstyles = {
        transform: `scale(${entryUIScale})`,
        transition: "transform 0.9s ease",
    };

    return (
        <>
            <div id="entry-screen">
                <div className="logo-container"></div>
                <div className="enter-website-container">
                    <img className="entry-ui" src={ENTRY_UI} style={entryUIstyles}/>
                    <button id="enter-button" onMouseDown={(e) => {handleEntryMouseDown(e)}}>
                        <p id="id-text" data-string-value={uniqueId}>Start Sequence</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Entry;