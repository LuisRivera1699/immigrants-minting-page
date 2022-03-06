import MainLayout from "../../components/MainLayout";
import Wave1Layout from "../../components/Wave1Layout";

const Wave1 = (props) => {
    return(
        <MainLayout>
            <Wave1Layout
                setViewWave1Holders={props.setViewWave1Holders}
            />
        </MainLayout>
    );
}

export default Wave1;