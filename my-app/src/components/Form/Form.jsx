
import './Form.css';

const formDataIntoJSON = formData => {
    const body = {};

    for (const [key, value] of formData) {
        if (Array.isArray(body[key])) {
            body[key].push(value);

            continue;
        }

        if (key in body) {
            body[key] = [body[key], value];

            continue;
        }

        body[key] = value;
    }

    return body;
};

const Form = ({children, onValidate}) => {
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (!onValidate?.(formData)) return;

        console.log(formDataIntoJSON(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            {children}
        </form>
    );
};

export default Form;
