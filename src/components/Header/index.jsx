import logo from "../../assets/logo.jpeg";
import twitter from "../../assets/twitter.png";
import discord from "../../assets/discord.png";

const Header = (props) => {
    return(
        <section>
            <header>
                <div className="flex-space-between">
                    <img src={logo} alt=""/>
                    <div className="flex-space-between">
                        <img src={discord} alt=""/>
                        <img className="twitter" src={twitter} alt=""/>
                    </div>
                </div>
            </header> 
        </section>
    );
}

export default Header;