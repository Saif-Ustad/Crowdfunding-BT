import { useEffect, useState } from "react";
import "./RequestCard.scss";
import campaign from "../../../ethereum/campaign";

import { useParams } from "react-router-dom";
import web3 from "../../../ethereum/web3";

const RequestCard = ({ requestDetails }) => {

  const { campaignId } = useParams();

  const [approvalCount, setApprovalCount] = useState();
  const [isManager, setIsManager] = useState();
  const [isApprover, setIsApprover] = useState(false);

  useEffect(() => {

    const fetchManager = async () => {
      const accounts = await web3.eth.getAccounts();
      const manager = await campaign(campaignId).methods.manager().call(); // Add 'await' here
      setIsManager(manager === accounts[0]);

      const Approver = await campaign(campaignId).methods.approvers(accounts[0]).call();
      setIsApprover(Approver);
     
    };

    fetchManager();
    
    

    campaign(campaignId).methods.approversCount().call()
      .then(result => {
        // console.log(result);
        setApprovalCount(result);

      })
      .catch(error => {
        console.error('Error fetching campaign remaining days:', error);
      });

  }, [campaignId]);

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign(campaignId).methods.approveRequest(requestDetails.index).send({
        from: accounts[0],
      });

      window.location.reload();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleFinalize = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign(campaignId).methods.finalizeRequest(requestDetails.index).send({
        from: accounts[0],
      });

      window.location.reload();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };




  return (
    <div className="requestCard">
      <div className="floating_request_count">
        <span>{requestDetails.index + 1}</span>
      </div>
      <h3>Recipient</h3>
      <p>{requestDetails.request.recipient.substring(0, 25) + "..."}</p>
      <h3>Description</h3>
      <p>{requestDetails.request.description}</p>
      <div className="amount_and_count">
        <div className="left">
          <h6>{Number(requestDetails.request.value)}</h6>
          <h3>Amount</h3>
        </div>
        <div className="right">
          <h6>{Number(requestDetails.request.approvalCount)} / {Number(approvalCount)}</h6>
          <h3>Approval Count</h3>
        </div>

      </div>
      <div className="approve_and_finalize_btn">
        
        {!requestDetails.request.complete && (
          <div className="approve" onClick={handleApprove} style={!isApprover ? { backgroundColor: 'gray', cursor: 'not-allowed' } : {}}>
            Approve
          </div>
        )}

        {!requestDetails.request.complete && isManager &&  (
          <div className="finalize" onClick={handleFinalize}>
            Finalize
          </div>
        )}

        {requestDetails.request.complete && (
          <div className="finalize" style={{ backgroundColor: 'gray',  cursor: 'not-allowed' }}>
            Finalized
          </div>
        )}
      </div>

    </div>
  )
}

export default RequestCard
