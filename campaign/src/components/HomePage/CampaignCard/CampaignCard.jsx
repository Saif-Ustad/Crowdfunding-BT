import "./CampaignCard.scss";

// import tempCardImage from "../../../Assets/Images/card_image.png";

import ethLogo from "../../../Assets/Icons/eth_logo.svg";
import { AiFillFolder } from "react-icons/ai";
import campaign from "../../../ethereum/campaign";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

// import factory from "../../../ethereum/factory";

const CampaignCard = ({ campaignAddress }) => {

    const Navigate = useNavigate();

    // console.log(campaignAddress)
    const [campaignDetails, setCampaignDetails] = useState({
        minimumContribution: "",
        receivedAmount: "",
        requestsLength: "",
        approverseCount: "",
        manager: "",
        title: "",
        creatorName: "",
        story: "",
        goal: "",
        endDate: "",
        image: "",
        category: ""
    });

    const [ daysRemaining, setDaysRemaining] = useState();

    useEffect(() => {
        campaign(campaignAddress).methods.getSummary().call()
            .then(result => {
                console.log(result);
                setCampaignDetails({
                    minimumContribution: result[0],
                    receivedAmount: result[1],
                    requestsLength: result[2],
                    approverseCount: result[3],
                    manager: result[4],
                    title: result[5],
                    creatorName: result[6],
                    story: result[7],
                    goal: result[8],
                    endDate: result[9],
                    image: result[10],
                    category: result[11]
                    ,
                    
                });

            })
            .catch(error => {
                console.error('Error fetching campaign details:', error);
            });

            campaign(campaignAddress).methods.getDaysRemaining().call()
            .then(result => {
                // console.log(result);
                setDaysRemaining(result);

            })
            .catch(error => {
                console.error('Error fetching campaign remaining days:', error);
            });

    }, [campaignAddress]);

    // useEffect( () => {
    //     async function fetchData() {
    //         const getAllCampaigns = campaign.filters.campaignCreated();
    //         const AllCampaigns = await campaign.queryFilter(getAllCampaigns);
    //         const AllData = AllCampaigns.map((e) => {
    //             return {
    //                 title: e.args.title,
    //                 image: e.args.imgURI,
    //                 owner: e.args.owner,
    //                 timeStamp: parseInt(e.args.timestamp),
    //                 // amount: ethers.utils.formatEther(e.args.requiredAmount),
    //                 address: e.args.campaignAddress
    //             }
    //         });
    //         console.log(AllData);
    //     }
    //     fetchData();

    // }, [campaignAddress]);




    return (
        <div className="card" onClick={()=> Navigate(`/${campaignDetails?.category}based/${campaignAddress}`)}>
            <div className="card_img">
                <img src={campaignDetails?.image} alt="card_image" />
            </div>
            <div className="card_info">
                <div className="campaign_type">
                    <AiFillFolder />
                    <p>{campaignDetails?.category.charAt(0).toUpperCase() + campaignDetails.category.slice(1)} Based</p>
                </div>
                <h3>{campaignDetails?.title}</h3>
                <h6>{campaignDetails?.story.substring(0, 20) + "..."}</h6>

                <div className="details">
                    <div className="left">
                        <h4>{Number(campaignDetails?.receivedAmount)}</h4>
                        <h5>Raised of {Number(campaignDetails?.goal)}</h5>
                    </div>
                    <div className="right">
                        <h4>{Number(daysRemaining)}</h4>
                        <h5>Days Left</h5>
                    </div>
                </div>
                <div className="creater">
                    <img src={ethLogo} alt="eth_icon" />
                    <p>by {campaignDetails?.manager.substring(0, 25) + "..."}</p>
                </div>
            </div>
        </div>
    )
}

export default CampaignCard
