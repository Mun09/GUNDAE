const Earth = () => {
    return (
        <>
            <mesh>
            <sphereGeometry args={[2, 32, 16]}></sphereGeometry>
            <meshStandardMaterial></meshStandardMaterial>
            </mesh>
        </>
    )
}


export default Earth