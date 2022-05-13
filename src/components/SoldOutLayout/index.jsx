const SoldOutLayout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Sold Out
            </h2>
            <p className="wave-info">
                All our immigrants have been sold out! You can check out the OpenSea Collection to buy it.
            </p>
            <button onClick={() => {window.open(`https://opensea.io/collection/the-immigrant-col`, "_blank")}}>
                GO TO OPENSEA
            </button>
        </div>
    );
}

export default SoldOutLayout;