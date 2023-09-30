"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

export const ClientSessionContext = createContext();

export default function ClientSessionProvider({ children }) {
  const session = useSession();
  const [ClientSession, setClientSession] = useState(session);

  useEffect(() => {
    setClientSession(session);
  }, [session]);

  return (
    <ClientSessionContext.Provider value={{ ClientSession }}>
      {children}
    </ClientSessionContext.Provider>
  );
}

export function useClientSessionContext() {
  const context = useContext(ClientSessionContext);
  return context;
}
