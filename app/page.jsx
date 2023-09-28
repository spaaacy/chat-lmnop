"use client";

import { getChatResponse } from "@hooks/gpt_service";
import { capitalizeFirstLetter } from "@utils/helpers";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput("");
    setLoading(true);

    const query = { role: "user", content: input };
    await setConversation([...conversation, query]);
    const { choices } = await getChatResponse([...conversation, query]);
    await setConversation([...conversation, query, { role: "system", content: choices[0].message.content }]);
    setLoading(false);
  };

  const saveOutput = async () => {
    await fetch("/api/output/create", {
      method: "POST",
      body: JSON.stringify({
        conversation: conversation,
        userId: session?.user.id,
      }),
    });
  };

  return (
    <section className="padding-x flex flex-col flex-auto mb-4 w-full">
      <div className="bg-translucent rounded-lg p-4 flex-auto flex flex-col justify-between">
        {Array.isArray(conversation) && conversation.length > 0 ? (
          <ul>
            {conversation.map((message, index) => (
              <li key={index}>
                <p className="prompt_text">
                  <span className="font-bold ">{`${capitalizeFirstLetter(message.role)}: `}</span>
                  {message.content}
                </p>
              </li>
            ))}
            {loading && (
              <li className="prompt_text">
                <span className="font_bold">{`System: `}</span>...
              </li>
            )}
          </ul>
        ) : (
          <p className="prompt_text">Ask me anything...</p>
        )}

        {Array.isArray(conversation) && conversation.length > 0 && !loading && (
          <div className="self-end flex gap-2">
            <button className="text-white font-bold" onClick={(e) => setConversation([])}>
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
