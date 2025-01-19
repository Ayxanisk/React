const Checkbox = ({ label, value, name }) => {
    return (
        <label>
            <input type='checkbox' value={value} name={name} />
            <span>{label}</span>
        </label>
    )
}

export default Checkbox;