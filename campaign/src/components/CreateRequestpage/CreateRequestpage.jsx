import { useState } from "react";
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import Navbar from "../HomePage/Navbar/Navbar"
import SideNavbar from "../HomePage/SideNavbar/SideNavbar"
import "./CreateRequestpage.scss"

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreateRequestpage = () => {

    const Navigate = useNavigate();
    const { campaignId } = useParams();

    const [requestDetails, setrequestDetails] = useState({
        request_description: "",
        request_transfer_amount: "",
        request_recipient: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setrequestDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign(campaignId).methods
                .createRequest(
                    requestDetails.request_description,
                    requestDetails.request_transfer_amount,
                    requestDetails.request_recipient
                )
                .send({
                    from: accounts[0],
                });

            Navigate(`/${campaignId}/requests`);

        } catch (err) {
            console.log(err);
        }

        console.log(requestDetails);
    };



    return (
        <div className="CreateRequest_section">
            <div className="container">
                <Navbar />
                <div className="hero" >
                    <SideNavbar />
                    <div className="Create_Request">

                        <form onSubmit={handleSubmit}>
                            <div className="two_field_in_row">
                                <div className="input_field">
                                    <h3>Transfer Amount</h3>
                                    <input 
                                        type="number" 
                                        placeholder="Value in WEI" 
                                        name="request_transfer_amount"
                                        value={requestDetails.request_transfer_amount}
                                        onChange={handleChange}    
                                        />
                                </div>
                                <div className="input_field">
                                    <h3>Recipient Address</h3>
                                    <input 
                                        type="text" 
                                        name="request_recipient"
                                        value={requestDetails.request_recipient}
                                        onChange={handleChange}         
                                    />
                                </div>
                            </div>

                            <div className="story">
                                <h3>Description</h3>
                                <textarea 
                                    name="request_description"
                                    value={requestDetails.request_description}
                                    onChange={handleChange} 
                                />
                            </div>


                            <div className="submit_btn">
                                <button type="submit">Create a Request</button>
                            </div>


                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRequestpage
