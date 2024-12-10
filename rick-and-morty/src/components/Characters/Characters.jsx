import React, { useState, useEffect } from "react";
import "./Characters.css";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [info, setInfo] = useState({});
    const [counter, setCounter] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCharacters(data.results);
                setInfo(data.info.next);
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            {!loading && characters.map((character) => (
                <div key={character.id} className="card">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="image"
                        onClick={() => {
                            const fullscreenContainer = document.getElementById('fullscreen-container');
                            const fullscreenImage = document.getElementById('fullscreen-image');
                            fullscreenImage.src = character.image;
                            fullscreenContainer.style.display = 'flex';
                        }}
                    />
                    <h3 className="name">{character.name}</h3>
                </div>
            ))}
            <div className="container2">
                <div id="fullscreen-container" onClick={() => {
                    const fullscreenContainer = document.getElementById('fullscreen-container');
                    fullscreenContainer.style.display = 'none';
                }}>
                    <img id="fullscreen-image" src="" alt="Fullscreen"/>
                </div>
                <button className="backButton" onClick={() => {
                    if (counter > 1) {
                        setLoading(true);
                        setCounter(counter - 1);
                        fetch(`https://rickandmortyapi.com/api/character?page=${counter - 1}`)
                            .then((response) => response.json())
                            .then((data) => {
                                setCharacters(data.results);
                                setInfo(data.info.next);
                            })
                            .catch((error) => {
                                console.error("Error: ", error);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    }}} disabled={loading || counter === 1}>
                    {loading ? "Loading..." : "<"}
                </button>

                <button className="nextButton" onClick={() => {
                    setLoading(true);
                    setCounter(counter + 1);
                    fetch(info)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            setCharacters(data.results);
                            setInfo(data.info.next);
                        })
                        .catch((error) => {
                            console.error("Error: ", error);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }} disabled={loading}>
                    {loading ? "Loading..." : ">"}
                </button>
                <span>: {counter}</span>
            </div>
        </div>
    );
};
export default Characters;
