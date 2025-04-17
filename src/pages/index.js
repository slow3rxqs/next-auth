import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { MainContext as authContext, useContext as useAuthContext } from "../context/user.js";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const { userInfo, userGuilds } = useAuthContext(authContext);
  let user = session?.user;
  const router = useRouter(); 

  const getGuildAvatarUrl = (guildId, iconHash) => {
    return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.png`;
  };

  useEffect(() => console.log(user), [])
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-4 justify-center ">
      <h1 className="font-bold text-4xl text-blue-600 ">GİRİŞ YAP</h1>
      {(user) ? (
        <div className="flex items-center gap-2  py-2 px-4 rounded">
          <img src={user?.image} className="w-12 h-12 bg-[rgba(24,24,24,0.72)] rounded-xl"/>{user?.name}
          <div>
            <button className="px-4 py-3 text-base text-white bg-red-700 rounded-xl" onClick={() => signOut("discord")}>Çıkış Yap</button>
          </div>
        </div>
      ) : (
        <>
          <button className="px-4 py-3 text-base text-white bg-green-600 rounded-xl" onClick={() => signIn("discord")}>Giriş Yap</button>
        </>
      )}
    </div>
  );
}
