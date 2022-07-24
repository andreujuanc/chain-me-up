import LitSdk, {
  IAccessControlCondition,
  IAuthSignature,
  ILitClient,
  TChain,
} from 'lit-js-sdk';
import { createContext, ReactNode, useContext, useState } from 'react';
import toast from 'react-hot-toast';

type TDataURI = string;

interface IEncryptStringResult {
  encryptedData: TDataURI;
  encryptedSymmetricKey: string;
  accessControlConditions: IAccessControlCondition[];
}

export interface ILitHook {
  initialiseLit?: () => Promise<void>;
  encryptString?: (str: string, profileAddress: string) => Promise<IEncryptStringResult>;
}

const LitContext = createContext<ILitHook>({});

interface ILitContextProviderProps {
  children: ReactNode;
}

export function LitContextProvider({ children }: ILitContextProviderProps) {
  const [litClient, setLitClient] = useState<ILitClient>();
  const [authSignature, setAuthSignature] = useState<IAuthSignature>();
  const chain: TChain = 'mumbai';

  async function initialiseLit() {
    if (!litClient) {
      const client = new LitSdk.LitNodeClient();
      await client.connect();

      setLitClient(client);
    } else {
      console.log('Lit is already initialised.', litClient);
    }
  }

  async function encryptString(str: string, profileAddress: string): Promise<IEncryptStringResult> {
    if (litClient === undefined) {
      toast.error('No lit client found - have you initialised it?');
      throw new Error('No lit client found - have you initialised it?');
    }

    const retrievedAuthSignature = await LitSdk.checkAndSignAuthMessage({
      chain,
    });

    setAuthSignature(retrievedAuthSignature);

    if (retrievedAuthSignature === undefined) {
      toast.error('Could not get an auth signature.');
      throw new Error('Could not get an auth signature.');
    }

    console.log('test test test => ', str);
    const { encryptedString, symmetricKey } = await LitSdk.encryptString(str);

    const accessControlConditions: IAccessControlCondition[] = [
      {
        chain: 'mumbai',
        standardContractType: '', // 'ERC1155',
        contractAddress: '0x0b9FD334938B039324ad40DC69B99c73C67bc93C',
        method: 'hasAccessToProfile',
        parameters: [':userAddress', profileAddress],
        returnValueTest: {
          comparator: '>',
          value: '0',
        },
      },
    ];

    const encryptedSymmetricKey = await litClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig: retrievedAuthSignature,
      chain,
    });

    const encryptedData = await blobToDataURI(new Blob([encryptedString]));

    return {
      encryptedData,
      encryptedSymmetricKey,
      accessControlConditions,
    };
  }

  return (
    <LitContext.Provider value={{ initialiseLit, encryptString }}>
      {children}
    </LitContext.Provider>
  );
}

async function blobToDataURI(blob: Blob): Promise<TDataURI> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = event?.target?.result;

      if (data) {
        if (typeof data === 'string') {
          resolve(data);
        }
      }
    };

    reader.readAsDataURL(blob);
  });
}

export function useLit() {
  return useContext(LitContext);
}
