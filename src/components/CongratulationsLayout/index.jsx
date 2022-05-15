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
            <button onClick={() => {window.open(`https://looksrare.org/collections/0x5583651fD633cEd5439F923bc0510Ea1A121542C`, "_blank")}}>
                GO TO LOOKSRARE
            </button>
        </div>
    );
}

export default CongratulationsLayout;