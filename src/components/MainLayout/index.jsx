import Header from "../Header";
import Title from "../Title";

import video from "../../assets/video.mp4"

const MainLayout = (props) => {
    return(
        <div className="main-layout">
            <Header/>
            <div className="flex-m">
                <div className="gif-container">
                    <video className="gif" autoPlay={true} loop={true} muted={true} playsInline={true}>
                        <source src={video} type="video/mp4"/>
                    </video>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default MainLayout;