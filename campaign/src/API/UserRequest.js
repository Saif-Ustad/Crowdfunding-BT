import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

export const getAllCreatedProjects = (userId) => API.get(`/profile/${userId}/createdProjects`);
export const getAllDonatedProjects = (userId) => API.get(`/profile/${userId}/donatedProjects`);

export const addCreatedProject = (userId, newCreatedProject) => {
   return API.put(`/profile/${userId}/add/createdProjects`,{newCreatedProject} );
}

export const addDonatedProject = (userId, newDonatedProject) => {
    return API.put(`/profile/${userId}/add/donatedProjects`, {newDonatedProject});
};
  