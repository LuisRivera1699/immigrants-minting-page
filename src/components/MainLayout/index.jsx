import Header from "../Header";
import Title from "../Title";

import passGif from "../../assets/fpassgif.gif";

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
                    <img className="gif" src={passGif} alt=""/>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default MainLayout;