"use client";

import { getChatResponse } from "@hooks/gpt_service";
import { capitalizeFirstLetter } from "@utils/helpers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SaveModal = ({ modal }) => (
  <div>
    {modal && (
      <div className="w-full h-full fixed flex-center">
        <div className="flex-center shadow-xl rounded-xl bg-white w-[300px] h-[100px] p-4">
          <p className="text-lg">Conversation has been saved!</p>
        </div>
      </div>
    )}
  </div>
);

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [modal, setModal] = useState(false);
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
    setShowSave(true);
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

  const handleSave = () => {
    setShowSave(false);
    setModal(true);
    saveOutput();
  };

  useEffect(() => {
    if (!modal) return;
    setTimeout(() => {
      setModal(false);
    }, 2000);
  }, [modal]);

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
            <Image
              src={"assets/icons/backspace.svg"}
              className="hover:cursor-pointer filter_white"
              alt="save"
              width={25}
              height={25}
              onClick={(e) => setConversation([])}
            />
            {showSave && (
              <Image
                src={"assets/icons/save.svg"}
                className="hover:cursor-pointer filter_white"
                alt="save"
                width={25}
                height={25}
                onClick={(e) => handleSave()}
              />
            )}
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
      {createPortal(<SaveModal modal={modal} />, document.body)}
    </section>
  );
};

export default Home;
