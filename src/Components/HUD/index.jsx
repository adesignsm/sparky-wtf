import React, { useContext, useState } from "react";
import $ from "jquery";
import { StateContext } from "../../StateContext";
import "./index.css";

import HUD_TOP from "../../Assets/Media/UI/HUD_PARTS/HUD_TOP.png";
import HUD_BOTTOM from "../../Assets/Media/UI/HUD_PARTS/HUD_BOTTOM.png";
import HUD_LEFT from "../../Assets/Media/UI/HUD_PARTS/HUD_LEFT.png";
import HUD_RIGHT from "../../Assets/Media/UI/HUD_PARTS/HUD_RIGHT.png";

const HUD = () => {
    const { HUDstate } = useContext(StateContext);

    console.log(HUDstate)

    return (
        <>
            <div id="HUD-interface-screen">
                <div className="HUD-parts-container">
                    <img className="hud-top" src={HUD_TOP} />
                    <img className="hud-bottom" src={HUD_BOTTOM} />
                    <img className="hud-left" src={HUD_LEFT} />
                    <img className="hud-right" src={HUD_RIGHT} /> 
                </div>
            </div>
        </>
    )
}

export default HUD;