import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard/CampaignCard";
import "./HomePage.scss";
import Navbar from "./Navbar/Navbar";
import SideNavbar from "./SideNavbar/SideNavbar";

// import { useNavigate } from "react-router-dom";

import factory from "../../ethereum/factory";
import campaign from "../../ethereum/campaign";


const HomePage = () => {

  

  const [campaignAddresses, setCampaignAddresses] = useState([]);
  const [campaignCategory, setCampaignCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsAddresses = await factory.methods.getDeployedCampaigns().call();

        const filteredAddresses = await Promise.all(
          campaignsAddresses.map(async (SingleCampaignAddress) => {
            const category = await campaign(SingleCampaignAddress).methods.campaignCategory().call();
            return category === campaignCategory || campaignCategory === "all"
              ? SingleCampaignAddress
              : null;
          })
        );

        // Remove null values and set the filtered addresses
        setCampaignAddresses(filteredAddresses.filter((address) => address !== null));
      } catch (error) {
        console.error('Error fetching campaign addresses:', error);
      }
    };

    fetchData();
  }, [campaignCategory]);




  return (
    <div className='homeSection'>
      <div className='container'>
        <Navbar />
        <div className="hero">
          <SideNavbar />
          <div className="campaign_and_filters">
            <div className="totalCampaigns_and_filters">
              <div className="total_campaigns" >
                <span>All Campaigns ({campaignAddresses.length})</span>
              </div>
              <div className="filters" >
                <div class="dropbtn">Filters</div>
                <div class="dropdown-content">
                  <h6 onClick={() => setCampaignCategory("all")}>All Campaigns</h6>
                  <h6 onClick={() => setCampaignCategory("reward")}>Reward Based Campaigns</h6>
                  <h6 onClick={() => setCampaignCategory("donation")}>Donation Based Campaigns</h6>
                  <h6 onClick={() => setCampaignCategory("sponsor")}>Sponsorship Based Campaigns</h6>
                </div>
              </div>
            </div>

            <div className="campaings">
              {campaignAddresses.length === 0 && <h3 className="no_requests" style={{ color: 'white' }}>No requests found</h3>}
              {campaignAddresses?.map((address, index) => (
                <CampaignCard key={index} campaignAddress={address} />
              ))
              }

              {/* <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard /> */}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default HomePage
