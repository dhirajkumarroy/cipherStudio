// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   path: { type: String, required: true },
//   content: { type: String, default: "" }
// });

// const projectSchema = new mongoose.Schema(
//   {
//     projectId: { type: String, required: true, unique: true },
//     name: { type: String, default: "Untitled Project" },
//     description: { type: String, default: "" },
//     files: [fileSchema],
//     owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ new
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Project", projectSchema);


// backend/models/Project.js
// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     code: { type: String, default: "" }, // 👈 for your code editor
//     owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Project", projectSchema);


import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // remove projectId or make it optional if unused
    projectId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(), // generates a unique one automatically
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    files: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
