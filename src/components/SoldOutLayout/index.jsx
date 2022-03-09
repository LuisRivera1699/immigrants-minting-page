import { FOUNDERS_PASS_CONTRACT } from "../../utils/constants/constants";

const SoldOutLayout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Sold Out
            </h2>
            <p className="wave-info">
                CinSity DAO Founders Passes for Wave 1, Wave 2 and Wave 3 have been sold out! You can check out the OpenSea Collection to buy it.
            </p>
            <button onClick={() => {window.open(`https://opensea.io/collection/${FOUNDERS_PASS_CONTRACT}`, "_blank")}}>
                GO TO OPENSEA
            </button>
        </div>
    );
}

export default SoldOutLayout;