import MainLayout from "../../components/MainLayout";
import CongratulationsLayout from "../../components/CongratulationsLayout"

const Congratulations = (props) => {
    return(
        <MainLayout>
            <CongratulationsLayout
                wave={props.wave}
                mintQuantity={props.mintQuantity}
            />
        </MainLayout>
    );
}

export default Congratulations;