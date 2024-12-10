import './App.css';
import {useState} from "react";
import DisplayCountClick from "./components/DisplayCountClick/DisplayCountClick";
import UpdateCountClick from "./components/UpdateCountClick/UpdateCountClick";

const App = () => {
    const [countClick, setCountClick] = useState(0);

    return (
        <div>
            <DisplayCountClick countClick={countClick} />
            <br/>
            <UpdateCountClick countClick={countClick} setCountClick={setCountClick} />
        </div>
    )
}

export default App;