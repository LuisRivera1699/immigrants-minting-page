const Wave1Layout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Wave 1
            </h2>
            <p className="wave-info">
                Wave 1’s Founder’s Pass have already sold out, and we are 
                migrating the holders from our Polygon Contract to this 
                Ethereum Contract. We’ll let you now on discord when Wave 2 
                is launched.
            </p>
            <button onClick={() => {props.setViewWave1Holders(true)}}>
                SEE WAVE 1 HOLDERS
            </button>
        </div>
    );
}

export default Wave1Layout;