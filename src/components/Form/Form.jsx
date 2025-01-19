const formDataIntoJSON = (formData) => {
    let entries;
    entries = Array.from(formData.entries());
    return entries;
}


const Form = ({ children }) => {
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.target); // Собираем данные формы
        const checkboxData = Array.from(formData.entries()) // Преобразуем в массив пар [ключ, значение]
            .filter(([key, value]) => key === 'plugins'); // Оставляем только данные для Checkbox

        if (checkboxData.length < 2) {
            console.log("No checkboxes selected");
        } else {
            console.log(checkboxData); // Выводим выбранные чекбоксы
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    )
}


export default Form;