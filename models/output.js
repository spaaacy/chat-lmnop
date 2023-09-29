import { Schema, model, models } from "mongoose";

const OutputSchema = new Schema(
  {
    conversation: {
      type: [{ role: String, content: String }],
      required: [true, "A conversation is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A user must be associated with the output"],
    },
  },
  {
    timestamps: true,
  }
);

const Output = models.Output || model("Output", OutputSchema);

export default Output;
