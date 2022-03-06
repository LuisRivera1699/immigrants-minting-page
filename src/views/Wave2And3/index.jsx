import MainLayout from "../../components/MainLayout";
import Wave2And3Layout from "../../components/Wave2And3Layout";

const Wave2And3 = (props) => {
    return(
        <MainLayout>
            <Wave2And3Layout
                wave={props.wave}
                totalMinted={props.totalMinted}
            />
        </MainLayout>
    );
}

export default Wave2And3;