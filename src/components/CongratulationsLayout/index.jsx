import { FOUNDERS_PASS_CONTRACT, WAVE_INFO } from "../../utils/constants/constants";

const CongratulationsLayout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Successfully Minted
            </h2>
            <p className="wave-info">
                Congratulations! You have successfully minted your {WAVE_INFO[props.wave].title} Founders Pass.
            </p>
            <p className="mint-counter">
                {props.mintQuantity} minted
            </p>
            <button onClick={() => {window.open(`https://opensea.io/collection/${FOUNDERS_PASS_CONTRACT}`, "_blank")}}>
                GO TO OPENSEA
            </button>
        </div>
    );
}

export default CongratulationsLayout;