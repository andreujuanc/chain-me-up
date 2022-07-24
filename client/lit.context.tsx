import LitSdk, { AuthSignature, LitClient } from 'lit-js-sdk';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface ILitHook {
  initialiseLit: () => Promise<void>;
}

const LitContext = createContext<ILitHook>({
  initialiseLit: async () => {},
});

interface ILitContextProviderProps {
  children: ReactNode;
}

export function LitContextProvider({ children }: ILitContextProviderProps) {
  const [litClient, setLitClient] = useState<LitClient>();
  const [authSignature, setAuthSignature] = useState<AuthSignature>();

  async function initialiseLit() {
    const client = new LitSdk.LitNodeClient();
    await client.connect();

    setLitClient(client);

    const retrievedAuthSignature = await LitSdk.checkAndSignAuthMessage({
      chain: 'mumbai',
    });

    setAuthSignature(retrievedAuthSignature);
  }

  return (
    <LitContext.Provider value={{ initialiseLit }}>
      {children}
    </LitContext.Provider>
  );
}

export function useLit() {
  return useContext(LitContext);
}
