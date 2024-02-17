// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CampaignFactory {
    address payable[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed endDateTimestamp,
        string indexed category
    );

    function createCampaign(
        uint minimum, 
        string memory campaign_title, 
        string memory campaign_creator_name, 
        string memory campaign_story, 
        uint campaign_goal, 
        uint campaign_endDate,
        string memory campaign_image,
        string memory category ) public 
        {
        
        address newCampaign = address(new Campaign(minimum, msg.sender, campaign_title, campaign_creator_name, campaign_story, campaign_goal, campaign_endDate, campaign_image, category ));
        
        deployedCampaigns.push(payable(newCampaign));


        emit campaignCreated(
            campaign_title, 
            campaign_goal, 
            msg.sender, 
            newCampaign,
            campaign_image,
            campaign_endDate,
            category
        );
    }

    function getDeployedCampaigns() public view returns (address payable[] memory) {
        return deployedCampaigns;
    }
}





contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string public campaignTitle;
    string public campaignCreatorName;
    string public campaignStory; 
    uint public campaignGoal; 
    uint public campaignEndDate;
    string public campaignImage;
    uint public receivedAmount;
    string public campaignCategory;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator, string memory campaign_title, string memory campaign_creator_name, string memory campaign_story, uint campaign_goal, uint campaign_endDate, string memory campaign_image, string memory campaign_category) {
        manager = creator;
        minimumContribution = minimum;
        campaignTitle = campaign_title;
        campaignCreatorName = campaign_creator_name;
        campaignStory = campaign_story;
        campaignGoal = campaign_goal;
        campaignEndDate = campaign_endDate;
        campaignImage = campaign_image;
        campaignCategory = campaign_category;

    }

    event contributed(address indexed donar, uint indexed amount, uint indexed timestamp);

    function contribute() public payable {
        require(msg.value > minimumContribution);
        require(campaignGoal > receivedAmount, "required amount fullfilled");

        if (!approvers[msg.sender]) {
        approvers[msg.sender] = true;
        approversCount++;
        }
        
        receivedAmount += msg.value;

        emit contributed(msg.sender, msg.value, block.timestamp);
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests.push(); 
        newRequest.description = description;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (
      uint, uint, uint, uint, address, string memory, string memory, string memory, uint, uint, string memory, string memory
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager,
          campaignTitle,
          campaignCreatorName,
          campaignStory,
          campaignGoal,
          campaignEndDate,
          campaignImage,
          campaignCategory
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    function getDaysRemaining() public view returns (uint) {
        uint currentTime = block.timestamp; // current timestamp

        // Ensure campaignEndDate is in the future
        require(campaignEndDate > currentTime, "Campaign has already ended.");

        // Calculate the difference in days
        uint daysRemaining = (campaignEndDate - currentTime) / (1 days);

        return daysRemaining+1;
    }

}