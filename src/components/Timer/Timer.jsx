import React, { useState, useRef } from "react";
import "./Timer.css";
const Timer = () => {
    const [time, setTime] = useState(0);
    const interval = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            interval.current = setInterval(() => {
                setTime((prevTime) => prevTime + 100);
            }, 100);
        }
        else
        {
            setTime(0);
        }
    }
    const stop = () => {
        clearInterval(interval.current);
        setIsRunning(false);
        setTime(0);
    }
    const pauseContinue = () => {
        if (isRunning) {
            clearInterval(interval.current);
            setIsRunning(false);
        } else {
            if (formater(time) === "00:00.000")
            {
                return;
            }
            start();
        }
    }
    const formater = (time) =>
        new Date(time).toISOString().slice(14, 23);
    return (
        <div className="container">
            <span>Time: {formater(time)}</span>
            <button onClick={start} className="button">Start</button>
            <button onClick={stop} className="button">Stop</button>
            <button onClick={pauseContinue} className="button">Pause/Continue</button>
        </div>
    )
}

export default Timer;