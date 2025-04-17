import "@/styles/globals.css";
import { useEffect, useState } from "react";
import {SessionProvider} from 'next-auth/react'
import { MainContext as authContext } from "../context/user.js";
export default function App({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState(null);
  const [userGuilds, setUserGuilds] = useState(null);
  return (<>
    <SessionProvider session={pageProps.session}>
    <authContext.Provider value={{userInfo, setUserInfo, userGuilds, setUserGuilds}}>
      <Component {...pageProps} />
      </authContext.Provider>
    </SessionProvider>
  </>);
}
