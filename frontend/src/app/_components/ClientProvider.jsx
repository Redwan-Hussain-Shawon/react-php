"use client";
import { SessionProvider } from 'next-auth/react';
import React from 'react';

function ClientProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default ClientProvider;
