import "./RewardBasedCampaignPage.scss";

import Navbar from "../HomePage/Navbar/Navbar";
import SideNavbar from "../HomePage/SideNavbar/SideNavbar";


// import RewardCampaignImg from "../../Assets/Images/RewardCampaignImg.png";
import Eth_Small_Logo from "../../Assets/Icons/etherium_small_logo.svg";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import campaign from "../../ethereum/campaign";

import { useParams } from "react-router-dom";
import web3 from "../../ethereum/web3";
import { useDispatch, useSelector } from "react-redux";
import { addDonatedProject } from "../../Action/UserAction";

const RewardBasedCampaignPage = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { campaignId } = useParams();

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

  const [daysRemaining, setDaysRemaining] = useState();
  const [progressbarLength, setProgressbarLength] = useState(0)

  useEffect(() => {
    campaign(campaignId).methods.getSummary().call()
      .then(result => {
        // console.log(result);
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

        });

      })
      .catch(error => {
        console.error('Error fetching campaign details:', error);
      });

    campaign(campaignId).methods.getDaysRemaining().call()
      .then(result => {
        // console.log(result);
        setDaysRemaining(result);

      })
      .catch(error => {
        console.error('Error fetching campaign remaining days:', error);
      });

      setProgressbarLength((Number(campaignDetails.receivedAmount) / Number(campaignDetails.goal)) * 100);


  }, [campaignId, campaignDetails.receivedAmount, campaignDetails.goal]);


  const [donationAmount, setDonationAmount] = useState();

  // console.log(donationAmount)
  // console.log(web3.utils.toWei(donationAmount, "ether"))


  const userId = useSelector((state) => state.authReducer.authData.email)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const accounts = await web3.eth.getAccounts();
      await campaign(campaignId).methods.contribute()
        .send({
          from: accounts[0],
          // value: web3.utils.toWei(donationAmount, "ether"),
          value: donationAmount
        });
    
      dispatch(addDonatedProject(userId, campaignId ));
      window.location.reload();

    } catch (err) {
      console.log(err);
    }

    // console.log(campaignDetails);
  };





  return (
    <div className='SingleCampaignSection'>
      <div className='container'>
        <Navbar />
        <div className="hero">
          <SideNavbar />
          <div className="CampaignDetails">
            <div className="upper">
              <div className="campaign_img">
                <img src={campaignDetails?.image} alt="campaign_img" />
                <div className="progressbar">
                <div style={{ width: `${progressbarLength}%` }}></div>

                </div>
              </div>
              <div className="campaignDetailsCards">
                <div className="campaignDetailsCard">
                  <div className="up">
                    <p>{Number(daysRemaining)}</p>
                  </div>
                  <div className="down">
                    <p>Days Left</p>
                  </div>
                </div>

                <div className="campaignDetailsCard">
                  <div className="up">
                    <p>{Number(campaignDetails?.receivedAmount)}</p>
                  </div>
                  <div className="down">
                    <p>Raised of {Number(campaignDetails?.goal)}</p>
                  </div>
                </div>

                <div className="campaignDetailsCard">
                  <div className="up">
                    <p>{Number(campaignDetails?.approverseCount)}</p>
                  </div>
                  <div className="down">
                    <p>Total Backers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lower">
              <div className="left">
                <div className="creater">
                  <h3>Creator</h3>
                  <div className="creater_address">
                    <img src={Eth_Small_Logo} alt="logo" />
                    <p>by {campaignDetails?.manager.substring(0, 25) + "..."}</p>
                  </div>
                </div>
                <div className="story">
                  <h3>Story</h3>
                  <p>{campaignDetails?.story.substring(0, 20) + "..."}</p>

                </div>
                <div className="request_text">
                  <p>Number of requests <span>{Number(campaignDetails?.requestsLength)}</span></p>
                </div>
                <div className="request_btn">
                  <div onClick={() => Navigate(`/${campaignId}/requests`)}>View Requests</div>
                </div>
              </div>
              <div className="right">
                <h3>Fund</h3>
                <div className="payment_card">
                  <h4>Pledge with rewards</h4>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="number"
                      placeholder="WEI"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                    <div className="quotes">
                      <h2>back it because you belive in it.</h2>
                      <p>Support the project for no rewards. Just because it speaks to you</p>
                    </div>
                    <button type="submit" >Fund Campaign</button>
                  </form>
                </div>
              </div>
            </div>
          </div>



        </div>

      </div>

    </div>
  )
}

export default RewardBasedCampaignPage
