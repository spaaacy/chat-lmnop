import Output from "@models/output";
import { connectToDb } from "@utils/database";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    await Output.deleteOne({ _id: params.id });
    return new Response(`Post ${params.id} has been deleted`, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
