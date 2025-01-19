
const ListItem = ({card}) => {
    return (
        <li>
            <div className="card">
                <div className="title">{card.title}</div>
                <div className="description">{card.description}</div>
            </div>
        </li>
    );
};

export default ListItem;
