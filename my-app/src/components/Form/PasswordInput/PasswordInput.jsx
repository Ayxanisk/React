
const PasswordInput = ({label, name}) => {
    return (
        <fieldset>
            <legend>{label}</legend>
            <input type="password" name={name}/>
        </fieldset>
    );
};

export default PasswordInput;
