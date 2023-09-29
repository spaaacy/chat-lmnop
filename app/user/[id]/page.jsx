"use client";

import dynamic from "next/dynamic";
const MessageModal = dynamic(() => import("@components/MessageModal"), { ssr: false });
import { capitalizeFirstLetter } from "@utils/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PostCard = ({ post, handleDelete }) => {
  const { conversation } = post;
  return (
    <div className="rounded-lg bg-white p-4 m-8 shadow-xl">
      <div className="flex justify-between items-centers">
        <p className="font-light italic">{new Date(post.createdAt).toLocaleString()}</p>
        <Image
          onClick={() => handleDelete(post._id)}
          className="hover:cursor-pointer"
          src={"../assets/icons/delete.svg"}
          alt="delete"
          width={20}
          height={20}
        />
      </div>
      <ul>
        {conversation.map((message, index) => (
          <li key={index}>
            <p className="text-lg">
              <span className="font-bold ">{`${capitalizeFirstLetter(message.role)}: `}</span>
              {message.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const User = ({ params }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!displayModal) return;
    const timeout = setTimeout(() => {
      setDisplayModal(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });

  const deletePost = async (id) => {
    await fetch(`/api/output/${id}/delete`, {
      method: "DELETE",
    });
  };

  const handleDelete = async (id) => {
    setDisplayModal(true);
    await deletePost(id);
    setPosts(posts.filter((post) => post._id !== id));
  };

  useEffect(() => {
    const getOutputs = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      setPosts(await response.json());
    };

    getOutputs();
  }, []);

  return (
    <section>
      <ul>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} handleDelete={handleDelete} />
        ))}
      </ul>
      {createPortal(<MessageModal message="Post has been deleted" isDisplayed={displayModal} />, document.body)}
    </section>
  );
};

export default User;
