const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A workflow must have a name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  steps: [
    {
      type: {
        type: String,
        enum: ["start", "end", "api", "email", "condition"],
        required: true,
      },
      config: {
        type: Object,
        required: true,
      },
      position: {
        x: Number,
        y: Number,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastEditedAt: {
    type: Date,
    default: Date.now,
  },
});

const Workflow = mongoose.model("Workflow", workflowSchema);
module.exports = Workflow;
