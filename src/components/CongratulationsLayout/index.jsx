const CongratulationsLayout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Successfully Minted
            </h2>
            <p className="wave-info">
                Congratulations! You have successfully minted your Immigrant.
            </p>
            <p className="mint-counter">
                {props.mintQuantity} minted
            </p>
            <button onClick={() => {window.open(`https://opensea.io/collection/the-immigrant`, "_blank")}}>
                GO TO OPENSEA
            </button>
        </div>
    );
}

export default CongratulationsLayout;