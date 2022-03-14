import Header from "../Header";
import Title from "../Title";

import slotMachineVideo from "../../assets/wave2.mp4"

const MainLayout = (props) => {
    return(
        <div className="main-layout">
            <Header/>
            <Title
                blue="Mint your"
                pink=" Founders Pass"
            />
            <div className="flex-m">
                <div className="gif-container">
                    <video className="gif" autoPlay={true} loop={true} muted={true} playsInline={true}>
                        <source src={slotMachineVideo} type="video/mp4"/>
                    </video>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default MainLayout;