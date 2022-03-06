import { WAVE_INFO } from "../../utils/constants/constants";

const CongratulationsLayout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Successfully Minted
            </h2>
            <p className="wave-info">
                Congratulations! You have successfully minted your 
                {WAVE_INFO[props.wave].title} Founder’s Pass.
            </p>
            <p className="mint-counter">
                {props.mintQuantity} minted
            </p>
            <button>
                GO TO OPENSEA
            </button>
        </div>
    );
}

export default CongratulationsLayout;