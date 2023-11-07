import mongoose from "mongoose";

const TeamsSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true },
    team_description: { type: String, required: false },
    team_members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teams", TeamsSchema);
