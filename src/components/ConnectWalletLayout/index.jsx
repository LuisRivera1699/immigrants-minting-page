import metamask from "../../assets/metamask.png";

const ConnectWalletLayout = (props) => {
    return(
        <div className="flex-m c">
            <h2 className="subtitle">
                Your wallet is not connected
            </h2>
            <button onClick={props.connectWallet}>
                <div className="flex-button">
                    <span>CONNECT WITH METAMASK</span>
                    <img className="button-icon" src={metamask} alt=""/>
                </div>
            </button>
        </div>
    );
}

export default ConnectWalletLayout;