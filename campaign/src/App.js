import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "./pages/Auth/LogIn/LogIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Home from "./pages/Home/Home";
import CreateCampaign from "./pages/CreateCampaign/CreateCampaign";
import CreateRequest from "./pages/CreateRequest/CreateRequest";
import RewardBasedCampaign from "./pages/Capaign/RewardBasedCampaign";
import DonationBasedCampaign from "./pages/Capaign/DonationBasedCampaign";
import SponsorBasedCampaign from "./pages/Capaign/SponsorBasedCampaign";
import Requests from "./pages/Requests/Requests";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/auth/login" element={<LogIn />} />
          <Route path="/auth/signup" element={<SignUp />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/:campaignId/requests/create" element={<CreateRequest />} />
          <Route path="/rewardbased/:campaignId" element={<RewardBasedCampaign />} />
          <Route path="/donationbased/:campaignId" element={<DonationBasedCampaign />} />
          <Route path="/sponsorbased/:campaignId" element={<SponsorBasedCampaign />} />
          <Route path="/:campaignId/requests" element={<Requests />} />


          <Route path="/"
            element={
              user ? (
                <Home />
              ) : (
                <LogIn />
              )
            }
          />

          <Route path="/auth/login"
            element={
              user ? (
                <Navigate to="../../" />
              ) : (
                <LogIn />
              )
            }
          />

          <Route path="/auth/signup"
            element={
              user ? (
                <Navigate to="../../" />
              ) : (
                <SignUp />
              )
            }
          />

          <Route path="/profile"
            element={
              user ? (
                <Profile />
              ) : (
                <LogIn />
              )
            }
          />

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
