const Title = (props) => {
    return(
        <div className="container-row">
            <h1 className="layer-1 orange">
                Mint your Inmigrant
            </h1>
            {
                props.goBack ?
                <p className="layer-2 t-button no-bg-button" onClick={() => {props.setViewWave1Holders(false)}}>
                    Go Back
                </p> :
                null
            }
        </div>
    );
}

export default Title;