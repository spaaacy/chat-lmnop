import { connectToDb } from "@utils/database";
import Output from "@models/output";

export const POST = async (req, res) => {
  try {
    console.log(res);
    const { question, response, userId } = await req.json();
    await connectToDb();
    Output.create({
      question: question,
      response: response,
      userId: userId,
    });
    return new Response("Output has been remotely created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
