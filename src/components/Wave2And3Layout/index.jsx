import { useEffect, useState } from "react";
import minus from "../../assets/minus.png";
import plus from "../../assets/plus.png";
import { WAVE_INFO } from "../../utils/constants/constants";

const Wave2And3Layout = (props) => {

    const [title, setTitle] = useState("");
    const [waveInfo, setWaveInfo] = useState("");
    const [mintQuantity, setMintQuantity] = useState(1);
    const [totalMinted, setTotalMinted] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [ethUnitPrice, setEthUnitPrice] = useState(0);
    const [wrldUnitPrice, setWrldUnitPrice] = useState(0);
    const [tokenSymbol, setTokenSymbol] = useState('ETH');

    useEffect(() => {
        if (props.wave === 2 || props.wave === 3 || props.wave === '2WL') {
            setTitle(WAVE_INFO[props.wave].title);
            setWaveInfo(WAVE_INFO[props.wave].content);
            setTotalSupply(WAVE_INFO[props.wave].totalSupply);
            setEthUnitPrice(WAVE_INFO[props.wave].ethPrice);
            setWrldUnitPrice(WAVE_INFO[props.wave].wrldPrice);
            setTotalMinted(props.totalMinted);
        }
    }, [props.totalMinted, props.wave])  

    const handleMinusMintingQuantity = () => {
        if (mintQuantity > 1) {
            setMintQuantity(mintQuantity - 1);
        }
    }

    const handlePlusMintingQuantity = () => {
        if (mintQuantity < 10) {
            setMintQuantity(mintQuantity + 1);
        }
    }

    const switchTokenSymbol = () => {
        if (tokenSymbol === 'ETH') {
            setTokenSymbol('WRLD');
        } else {
            setTokenSymbol('ETH');
        }
    }

    const getDecimals = () => {
        if (props.wave === '2WL') {
            return 3;
        } else if (props.wave === 2 || props.wave === 3) {
            return 2;
        }
    }

    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                {title}
            </h2>
            <p className="wave-info">
                {waveInfo}
            </p>
            <p className="mint-counter">
                {totalMinted} / {totalSupply} minted
            </p>
            <div className="form">
                <div className="input-quantity">
                    <img className="quantity-mod" src={minus} alt="" onClick={handleMinusMintingQuantity}/>
                    <p>{mintQuantity}</p>
                    <img className="quantity-mod" src={plus} alt="" onClick={handlePlusMintingQuantity}/>
                </div>
                <div className="button-container">
                    <button className="mint-button">
                        {
                            totalMinted === totalSupply ?
                            'SOLD OUT' :
                            tokenSymbol === 'ETH' ?
                            `MINT ${(ethUnitPrice*mintQuantity).toFixed(getDecimals())} $ETH` :
                            `MINT ${wrldUnitPrice*mintQuantity} $WRLD`
                        }  
                    </button>
                    <p className="mint-button no-bg-button" onClick={switchTokenSymbol}>
                        {`Mint with $${tokenSymbol === 'ETH' ? 'WRLD' : 'ETH'}`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Wave2And3Layout;