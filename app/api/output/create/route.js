import { connectToDb } from "@utils/database";
import Output from "@models/output";

export const POST = async (req, res) => {
  try {
    const { conversation, userId } = await req.json();
    await connectToDb();
    Output.create({
      conversation: conversation,
      userId: userId,
    });
    return new Response("Output has been remotely created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
