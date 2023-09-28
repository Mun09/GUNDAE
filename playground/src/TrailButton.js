
const IncreaseTrailLength = (props) => {
    const {trailLength, settrailLength} = props;
    settrailLength(trailLength + 300);
}

const decreaseTrailLength = (props) => {
    const {trailLength, settrailLength} = props;
    settrailLength(trailLength - 300 >= 0
                    ? trailLength - 300
                    : 0
        );
}

const TrailButton = (props) => {
    return (
    <>
        <button onClick={() => IncreaseTrailLength(props)}>Increase length of trail</button>
        <button onClick={() => decreaseTrailLength(props)}>decrease length of trail</button>

    </>
    );
}

export default TrailButton;