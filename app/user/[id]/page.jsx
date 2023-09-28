"use client";

import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const { question, response } = post;
  return (
    <div>
      <p>{question}</p>
      <p>{response}</p>
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
