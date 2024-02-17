import "./RequestsPage.scss";

import SideNavbar from "../HomePage/SideNavbar/SideNavbar";
import RequestCard from "./RequestCard/RequestCard";


import Left_Logo from "../../Assets/Icons/logo.svg";
import Right_Logo from "../../Assets/Icons/etherium_logo.svg";
import { FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import campaign from "../../ethereum/campaign";

const RequestsPage = () => {

    const Navigate = useNavigate();
    const { campaignId } = useParams();

    const [requests, setRequests] = useState([]);


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const requestCount = await campaign(campaignId).methods.getRequestsCount().call();
                if (Number(requestCount) > 0) {
                    const requestsData = await Promise.all(
                        Array(parseInt(requestCount))
                            .fill()
                            .map((element, index) => {
                                return campaign(campaignId).methods.requests(index).call();
                            })
                    );
                    setRequests(requestsData);

                }
            } catch (error) {
                console.error('Error fetching campaign requests:', error);
            }
        };

        fetchRequests();

    }, [campaignId]);

    // console.log(requests)


    return (
        <div className='homeSection'>
            <div className='container'>

                <div className="navbar-section">
                    <div className="left">
                        <div className="left_logo_background">
                            <img src={Left_Logo} alt="left_logo" />
                        </div>
                    </div>

                    <div className="middle">
                        <div className="Search_bar">
                            <input placeholder="Search for Campaigns" />
                            <span><FaSearch /></span>
                        </div>
                        <div className="create_btn">
                            <button onClick={() => Navigate(`/${campaignId}/requests/create`)}>Create a Request</button>
                        </div>
                    </div>

                    <div className="right">
                        <div className="right_logo_background">
                            <img src={Right_Logo} alt="right_logo" />
                        </div>
                    </div>
                </div>


                <div className="hero">
                    <SideNavbar />
                    <div className="requests_section">

                        <div className="campaings" style={{ "overflow": "visible" }}>
                            {requests.length === 0 && <h3 className="no_requests" style={{ color: 'white' }}>No requests found</h3>}

                            {requests?.map((request, index) => (
                                <RequestCard key={index} requestDetails={{ request, index }} />
                            ))
                            }

                            {/* <RequestCard />
                            <RequestCard />
                            <RequestCard />
                            <RequestCard /> */}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestsPage
