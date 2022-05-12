import twitter from "../../assets/twitter.png";
import discord from "../../assets/discord.png";

const Header = (props) => {
    return(
        <section>
            <header>
                <div className="flex-space-between">
                    <h1>The Immigrant</h1>
                    <div className="flex-space-between">
                        <a href="https://discord.gg/GMchFFJJ" target="_blank" rel="noreferrer"><img src={discord} alt=""/></a>
                        <a href="https://twitter.com/TheImmigrantCol" target="_blank" rel="noreferrer"><img className="twitter" src={twitter} alt=""/></a>
                    </div>
                </div>
            </header> 
        </section>
    );
}

export default Header;