"use client";

import { getChatResponse } from "@hooks/gpt_service";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestions([...questions, input]);
    setInput("");
    const { choices } = await getChatResponse(input);
    const gptResponse = choices[0].message.content;
    setOutput(gptResponse);
    setResponses([...responses, gptResponse]);
    setLoading(false);
  };

  const saveOutput = async () => {
    await fetch("/api/output/create", {
      method: "POST",
      body: JSON.stringify({
        question: questions[questions.length - 1],
        response: output,
        userId: session?.user.id,
      }),
    });
  };

  return (
    <section className="padding-x flex flex-col flex-auto mb-4 w-full">
      <div className="bg-translucent rounded-lg p-4 flex-auto flex flex-col justify-between">
        <p className="text-white font-montserrat">{loading ? "Thinking..." : output ? output : "Ask me anything..."}</p>

        {output && (
          <div className="self-end flex gap-2">
            <button className="text-white font-bold" onClick={(e) => setOutput("")}>
              Clear
            </button>
            <button className="text-white font-bold" onClick={(e) => saveOutput()}>
              Save
            </button>
          </div>
        )}
      </div>

      <form
        className="rounded-lg p-2 mt-4 flex-center gap-2 bg-translucent border border-transparent hover:border-white"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="flex-auto bg-transparent p-2 text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="font-palanquin font-bold text-white bg-transparent p-2">
          Enter
        </button>
      </form>
    </section>
  );
};

export default Home;
