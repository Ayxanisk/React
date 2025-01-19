
import { useState } from 'react';

const TextInput = ({label, name, validationRegexp}) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(null);

    const handleChange = e => {
        const text = e.target.value;
        const regexp = new RegExp(`^${validationRegexp.slice(1, -1)}$`, 'gi');
        const passedValidation = regexp.test(text);

        e.target.setCustomValidity(passedValidation ? '' : 'Error');
        e.target.reportValidity();

        setIsValid(text === '' ? null : passedValidation);
        setValue(text);
    };

    return (
        <fieldset>
            <legend>{label}</legend>
            <input
                type="text"
                name={name}
                autoComplete={'off'}
                value={value}
                onChange={handleChange}
                placeholder={' '}
                data-is-valid={isValid}
            />
        </fieldset>
    );
};

export default TextInput;
