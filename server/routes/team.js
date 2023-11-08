import express from "express";
import * as TeamController from "../controllers/team.js"; // Import the team controller

const router = express.Router();

// POST / - Create a new team
router.post("/", TeamController.createTeam);
// GET / - Get all teams
router.get("/", TeamController.getTeams);
// GET /:id - Retrieve team details by ID
router.get("/:id", TeamController.getTeamById);

export default router;
