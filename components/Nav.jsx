"use client";

import { signIn, getProviders, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  const [providers, setProviders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="sticky top-0 flex justify-between items-center padding">
      <Link href="/">
        <h1 className="font-bold text-white text-3xl">ChatLMNOP</h1>
      </Link>
      {session ? (
        <div className="flex-center gap-4">
          <button type="button" className="nav_button" onClick={() => signOut()}>
            Sign Out
          </button>
          <Link href={`/user/${session?.user.id}`}>
            <Image src={session?.user.image} alt="user_image" width={45} height={45} />
          </Link>
        </div>
      ) : (
        <>
          {Object.values(providers).map((provider) => (
            <button key={provider.id} className="nav_button" type="button" onClick={() => signIn(provider.id)}>
              Sign In
            </button>
          ))}
        </>
      )}
    </nav>
  );
};

export default Nav;
