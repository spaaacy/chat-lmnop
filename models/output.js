import { Schema, model, models } from "mongoose";

const OutputSchema = new Schema({
  question: {
    type: String,
    required: [true, "A question is required"]
  },
  response: {
    type: String,
    required: [true, "An output is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A user must be associated with the output"],
  },
});

const Output = models.Output || model("Output", OutputSchema);

export default Output;
