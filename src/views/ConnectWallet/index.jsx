import ConnectWalletLayout from "../../components/ConnectWalletLayout";
import MainLayout from "../../components/MainLayout";

const ConnectWallet = (props) => {
    return (
        <MainLayout>
            <ConnectWalletLayout
                connectWallet={props.connectWallet}
            />
        </MainLayout>
    );
}

export default ConnectWallet;