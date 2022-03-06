import Header from "../../components/Header";
import Title from "../../components/Title";
import Wave1Holders from "../../utils/json/Wave1Holders.json"

const Wave1HoldersLayout = (props) => {
    return(
        <div className="main-layout">
            <Header/>
            <Title
                blue="Wave 1"
                pink=" Holders"
                goBack={true}
                setViewWave1Holders={props.setViewWave1Holders}
            />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Token ID</th>
                            <th>Holder's Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...new Array(1000)].map((v, i) => {
                                return (
                                    <tr>
                                        <td>#{i+1}</td>
                                        <td>{Wave1Holders[(i+1).toString()]}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Wave1HoldersLayout;