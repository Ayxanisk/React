const RadioButton = ({ label, value, name }) => {
    return (
        <label>
            <input type='radio' value={value} name={name} />
            <span>{label}</span>
        </label>
    )
}

export default RadioButton;