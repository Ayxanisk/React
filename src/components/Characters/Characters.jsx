
import React, { useState, useEffect } from "react";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Получение данных с помощью fetch
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCharacters(data.results); // Сохраняем персонажей
                setLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div style={styles.container}>
            {characters.map((character) => (
                <div key={character.id} style={styles.card}>
                    <img src={character.image} alt={character.name} style={styles.image} />
                    <h3 style={styles.name}>{character.name}</h3>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
    },
    card: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "10px",
        textAlign: "center",
        width: "150px",
        backgroundColor: "#fff",
    },
    image: {
        borderRadius: "8px",
        width: "100%",
    },
    name: {
        fontSize: "1rem",
        marginTop: "10px",
    },
};

export default Characters;
