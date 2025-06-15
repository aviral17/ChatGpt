// updateddd as per latest changes

import { SessionProvider } from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { getServerSession } from "next-auth";
import "../styles/globals.css";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";
import Nav from "../components/Nav";

// updateddd as per latest changes

// import Image from "next/image";
// import nav1 from "../components/assets/nav2.svg";
// import plus from "../components/assets/plus1.svg";

// updated as per latest changes

import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { RotatingLines } from "react-loader-spinner";
import { Suspense } from "react";

// updated as per latest changes
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // const [chats, loading, error] = useCollection(
  //   session &&
  //     query(
  //       collection(db, "users", session.user?.email!, "chats"),
  //       orderBy("createdAt", "asc")
  //     )
  // );

  // console.log("Session =", session);
  // console.log("chats =", chats);
  // console.log(session?.user?.email);
  // updated as per latest changes

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex h-screen  min-h-screen  overflow-hidden">
              {/*  min-h-screen above class */}
              {/* max-w-xs md:min-w-[20rem] For sidebar div, I am changing these classes  */}

              <SideBar />
              {/* <div className="bg-[#202123] md:w-[240px] lg:block  h-screen sm:h-screen-100 overflow-y-auto hidden "> */}
              {/* Sidebar */}
              {/* </div> */}

              {/* ClientProvider - Notification */}
              <ClientProvider />

              <div className="bg-[#343541] flex-1">
                {/* <Suspense fallback={<p>Loading feed...</p>}>
                  {children}
                </Suspense> */}

                <Nav />

                <div className="h-[0.5px] bg-gray-500"></div>
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}

// updated as per latest changes

// "use client";

// updated as per latest changes
// import { SessionProvider } from "../components/SessionProvider";
// import SideBar from "../components/SideBar";
// import { getServerSession } from "next-auth";
// import "../styles/globals.css";
// import { authOptions } from "../pages/api/auth/[...nextauth]";
// import Login from "../components/Login";
// import ClientProvider from "../components/ClientProvider";

// import { useCollection } from "react-firebase-hooks/firestore";
// import { useSession } from "next-auth/react";
// import { collection, orderBy, query } from "firebase/firestore";
// import { db } from "../firebase";
// import { RotatingLines } from "react-loader-spinner";

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await getServerSession(authOptions);

//   const [chats, loading, error] = useCollection(
//     session &&
//       query(
//         collection(db, "users", session.user?.email!, "chats"),
//         orderBy("createdAt", "asc")
//       )
//   );

//   return (
//     <html>
//       <head />
//       <body>
//         <SessionProvider session={session}>
//           {!session ? (
//             <Login />
//           ) : (
//             <div className="flex">
//               <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
//                 {/* Sidebar */}
//                 <SideBar />
//               </div>
//               {/* ClientProvider - Notification */}
//               <ClientProvider />

//               <div className="bg-[#343541] flex-1">
//                 {loading ? (
//                   <div className="flex justify-center items-center h-screen">
//                     <RotatingLines
//                       strokeColor="grey"
//                       strokeWidth="5"
//                       animationDuration="0.75"
//                       width="96"
//                       visible={true}
//                     />
//                   </div>
//                 ) : (
//                   children
//                 )}
//               </div>
//             </div>
//           )}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
