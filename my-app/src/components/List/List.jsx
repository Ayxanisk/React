import ListItem from './ListItem/ListItem';
import './List.css';
import ModalWindow from '../ModalWindow/ModalWindow';

const List = ({cards}) => {
    return (
        <>
            <ul className="list">
                {
                    cards.map((card, i) => <ListItem key={i} card={card}/>)
                }
            </ul>
            <ModalWindow isOpen={isOpen} title="Messages" onClose={() => setIsOpen(false)}>
                <form>
                    <input ref={inputRef} type="text"/>
                </form>
            </ModalWindow>
        </>
    );
};

export default List;