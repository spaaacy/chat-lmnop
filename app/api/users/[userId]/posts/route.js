import Output from "@models/output";
import { connectToDb } from "@utils/database";

export const GET = async (req, res) => {
  const { params } = res;
  try {
    await connectToDb();
    const response = await Output.find({
      userId: params.userId,
    });
    console.log(response);
    return new Response(JSON.stringify(response, { status: 200 }));
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
