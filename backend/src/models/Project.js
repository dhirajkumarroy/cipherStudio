import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  content: { type: String, default: "" }
});

const projectSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, unique: true },
    name: { type: String, default: "Untitled Project" },
    description: { type: String, default: "" },
    files: [fileSchema],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ new
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
