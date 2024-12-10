import './App.css';
import Characters from "./components/Characters/Characters";

const App = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Rick and Morty Characters</h1>
            <Characters />
        </div>
    );
}

export default App;