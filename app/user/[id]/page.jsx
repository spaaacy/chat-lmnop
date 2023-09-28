"use client";

import { capitalizeFirstLetter } from "@utils/helpers";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  //TODO: add timestamp
  const { conversation } = post;
  return (
    <div className="rounded-lg bg-white p-4 m-8 shadow-xl">
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
  const [posts, setPosts] = useState([]);

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
          <PostCard key={index} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default User;
