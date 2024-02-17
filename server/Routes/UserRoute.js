import express from "express";
import { addCreatedProject, addDonatedProject, getAllCreatedProjects, getAllDonatedProjects } from "../Controllers/UserController.js";

const router = express.Router();

router.get("/:userId/createdProjects", getAllCreatedProjects);
router.get("/:userId/donatedProjects", getAllDonatedProjects);
router.put("/:userId/add/createdProjects", addCreatedProject);
router.put("/:userId/add/donatedProjects", addDonatedProject);
export default router;