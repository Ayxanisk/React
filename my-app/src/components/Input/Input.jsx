
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    return <input ref={ref} type="text"/>;
});

// After 19 version of React
// const Input = ({ ref }) => {
//     return <input ref={ref} type="text" />
// }

export default Input;