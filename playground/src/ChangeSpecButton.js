const setVelocity = (props) => {
    const {ChangingSpec, setChangingSpec} = props;
    const {sizeofvelocity} = ChangingSpec;
    setChangingSpec({...ChangingSpec, sizeofvelocity: sizeofvelocity + 10});
}

const ChangeSpecButton = (props) => {
    return (
        <>
            <button onClick={() => setVelocity(props)}>Set the Sphere velocity</button>
    
        </>
    );
};

export default ChangeSpecButton;