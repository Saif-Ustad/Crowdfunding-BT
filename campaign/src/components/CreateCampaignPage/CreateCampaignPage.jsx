import "./CreateCampaignPage.scss";

import { useState } from "react";
import Navbar from "../HomePage/Navbar/Navbar";
import SideNavbar from "../HomePage/SideNavbar/SideNavbar";

// import {create as IPFSHTTPClient} from 'ipfs-http-client';

import { BsRocketTakeoffFill } from "react-icons/bs";
import { RiMoonClearFill } from "react-icons/ri";

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
// import campaign from "../../ethereum/campaign";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCreatedProject } from "../../Action/UserAction";


const CreateCampaignPage = () => {

   

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [campaignDetails, setCampaignDetails] = useState({
        campaig_minimum_amount: 1,
        campaign_creator_name: "",
        campaign_title: "",
        campaign_story: "",
        campaign_goal: "",
        campaign_endDate: "",
        campaign_image: "",
        campaign_type: "reward",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaignDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const userId = useSelector((state) => state.authReducer.authData.email)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(
                    campaignDetails.campaig_minimum_amount,
                    campaignDetails.campaign_title,
                    campaignDetails.campaign_creator_name,
                    campaignDetails.campaign_story,
                    campaignDetails.campaign_goal,
                    Date.parse(campaignDetails.campaign_endDate) / 1000,
                    campaignDetails.campaign_image,
                    campaignDetails.campaign_type
                    
                )
                .send({
                    from: accounts[0],
                });

            const campaignsAddresses = await factory.methods.getDeployedCampaigns().call();    
            dispatch(addCreatedProject(userId, campaignsAddresses[campaignsAddresses.length - 1]))

            Navigate("/");

        } catch (err) {
            console.log(err);
        }

        console.log(campaignDetails);
    };

    return (
        <div className="CreateCampaign_section">
            <div className="container">
                <Navbar />
                <div className="hero" >
                    <SideNavbar />
                    <div className="Create_Campaign">
                        <div className="heading">
                            <p>Start a Campaign</p>
                            <BsRocketTakeoffFill />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="two_field_in_row">
                                <div className="input_field">
                                    <h3>Your Name</h3>
                                    <input
                                        type="text"
                                        name="campaign_creator_name"
                                        value={campaignDetails.campaign_creator_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input_field">
                                    <h3>Campaign Title</h3>
                                    <input
                                        type="text"
                                        name="campaign_title"
                                        value={campaignDetails.campaign_title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="story">
                                <h3>Story</h3>
                                <textarea
                                    name="campaign_story"
                                    value={campaignDetails.campaign_story}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="advertise">
                                <RiMoonClearFill />
                                <p>You will get 100% of raised amount</p>
                            </div>

                            <div className="two_field_in_row">
                                <div className="input_field">
                                    <h3>Amount Goal</h3>
                                    <input
                                        type="number"
                                        name="campaign_goal"
                                        value={campaignDetails.campaign_goal}
                                        onChange={handleChange}
                                        placeholder="WEI"
                                        required
                                    />
                                </div>
                                <div className="input_field">
                                    <h3>End Date</h3>
                                    <input
                                        type="date"
                                        name="campaign_endDate"
                                        value={campaignDetails.campaign_endDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="two_field_in_row">
                                <div className="input_field">
                                    <h3>Campaign Image</h3>
                                    <input
                                        type="text"
                                        name="campaign_image"
                                        value={campaignDetails.campaign_image}
                                        onChange={handleChange}
                                        required
                                        pattern="https?://.+"
                                        title="Please enter a valid URL"
                                    />
                                </div>
                                <div className="input_field">
                                    <h3>Campaign type</h3>
                                    <select
                                        name="campaign_type"
                                        value={campaignDetails.campaign_type}
                                        onChange={handleChange}
                                        required
                                   
                                    >
                                        
                                        <option value="reward">Reward Based</option>
                                        <option value="donation">Donation Based</option>
                                        <option value="sponsor">Sponsor Based</option>
                                    </select>
                                </div>

                            </div>

                            <div className="submit">

                                <div className="submit_btn">
                                    {/* <button onClick={uploadFiles}>Upload Files to IPFS</button> */}
                                    <button type="submit">Submit New Campaign</button>
                                </div>
                            </div>


                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCampaignPage
