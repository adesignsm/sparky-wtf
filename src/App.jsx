import "./root.css";

import Entry from "./Components/Entry";
import Scene from "./Components/Scene";

const App = () => {
    return (
        <>
            <main id="page">
                <Scene />
                <Entry />
            </main>
        </>
    )
}

export default App;