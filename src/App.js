import './App.css';
import React, {useReducer, useState} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return state + action.payload;
        case 'decrement':
            if (state === 0) return state;
            return state - action.payload;
    }
}
const reducer2 = (state, action) => {
    switch (action.type) {
        case 'increment':
            return state + action.payload;
        case 'decrement':
            if (state === 0) return state;
            return state - action.payload;
    }
}


const App = () => {
    const [count, dispatchCount] = useReducer(reducer, 0);
    const [count2, dispatchCount2] = useReducer(reducer2, 0);

    return (
        <>
            <button
                onClick={() => dispatchCount({
                    type: 'decrement',
                    payload: 1
                })}
            >-
            </button>
            <span>Step: {count}</span>
            <button
                onClick={() => dispatchCount({
                    type: 'increment',
                    payload: 1
                })}
            >+
            </button>
            <br/>
            <button
                onClick={() => dispatchCount2({
                    type: 'decrement',
                    payload: count
                })}
            >-
            </button>
            <span>Count: {count2}</span>
            <button
                onClick={() => dispatchCount2({
                    type: 'increment',
                    payload: count
                })}
            >+
            </button>
        </>

    )
}

export default App;