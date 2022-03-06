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
                        <a href="https://discord.com/invite/edjf8ms5Wn" target="_blank" rel="noreferrer"><img src={discord} alt=""/></a>
                        <a href="https://twitter.com/CinSityDAO" target="_blank" rel="noreferrer"><img className="twitter" src={twitter} alt=""/></a>
                    </div>
                </div>
            </header> 
        </section>
    );
}

export default Header;