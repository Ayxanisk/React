const UpdateCountClick = ({countClick,setCountClick}) => {
    return (
        <button onClick={() => {
            setCountClick(countClick + 1);
            setCountClick(countClick + 1);
            setCountClick(countClick + 1);
            console.log(countClick);
        }}>Click me
        </button>
    )
}
export default UpdateCountClick;