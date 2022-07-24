import { WebBundlr } from '@bundlr-network/client';
import BigNumber from 'bignumber.js';
import { providers, utils } from 'ethers';
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

export interface IBundlrHook {
  initialiseBundlr: () => Promise<void>;
  fundWallet: (_: number) => void;
  balance: string;
  uploadFile: (file: Buffer) => Promise<any>;
  bundlrInstance?: WebBundlr;
}

const log = {
  error: generateLoggerByType('error'),
  success: generateLoggerByType('success'),
};

type TLogger = (...args: string[]) => void;
type TInternalLogger = (message: string) => void;
type TLogType = 'error' | 'success';

function generateLogger(
  consoleLogger: TInternalLogger,
  toastLogger: TInternalLogger,
): TLogger {
  return (...args) => {
    const message = args.join(' ');
    consoleLogger(message);
    toastLogger(message);
  };
}

function generateLoggerByType(type: TLogType): TLogger {
  switch (type) {
    case 'error':
      return generateLogger(console.error, toast.error);
    case 'success':
      return generateLogger(console.info, toast.success);
  }
}

const BundlrContext = createContext<IBundlrHook>({
  initialiseBundlr: async () => { },
  fundWallet: (_: number) => { },
  balance: '',
  uploadFile: async (_file) => { },
  bundlrInstance: undefined,
});

interface IBundlrContextProviderProps {
  children: ReactNode;
}

export function BundlrContextProvider({
  children,
}: IBundlrContextProviderProps): ReactElement {
  const [bundlrInstance, setBundlrInstance] = useState<WebBundlr>();
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    if (bundlrInstance) {
      fetchBalance();
    }
  }, [bundlrInstance]);

  async function initialiseBundlr() {
    if (bundlrInstance) return
    const provider = new providers.Web3Provider(
      window.ethereum as providers.ExternalProvider,
    );
    await provider._ready();
    console.log('_ready')

    const bundlr = new WebBundlr(
      /**
       * In order to use the devnet, you need to use https://devnet.bundlr.network
       * as the node and set the provider url to a correct testnet/devnet RPC
       * endpoint for the given chain.
       */
      'https://devnet.bundlr.network',
      'matic',
      provider,
      {
        providerUrl: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
      },
    );
    await bundlr.ready();
    console.log('ready')
    setBundlrInstance(bundlr);
  }

  async function fundWallet(amount: number) {
    try {
      if (!bundlrInstance) {
        return;
      }

      if (!amount) {
        return;
      }

      const amountParsed = parseInput(amount);

      if (amountParsed) {
        let response = await bundlrInstance.fund(amountParsed);
        log.success('Wallet funded by: ', response.quantity);
      }

      fetchBalance();
    } catch (error) {
      log.error('Something went wrong: ', (error as Error)?.message);
    }
  }

  function parseInput(input: number) {
    const result = new BigNumber(input).multipliedBy(
      bundlrInstance!.currencyConfig.base[1],
    );

    if (result.isLessThan(1)) {
      throw new Error('Error: value is too small.');
    }

    return result;
  }

  async function fetchBalance() {
    if (bundlrInstance) {
      const fetchedBalance = await bundlrInstance.getLoadedBalance();
      const formattedBalance = utils.formatEther(fetchedBalance.toString());

      log.success('Retrieved balance is ', formattedBalance);
      setBalance(formattedBalance);
    }
  }

  async function uploadFile(file: Buffer) {
    try {
      let transaction = await bundlrInstance!.uploader.upload(file, [
        { name: 'Content-Type', value: 'image/png' },
      ]);

      return transaction;
    } catch (error) {
      log.error('Something went wrong: ', (error as Error)?.message);
    }
  }

  return (
    <BundlrContext.Provider
      value={{
        initialiseBundlr,
        fundWallet,
        balance,
        uploadFile,
        bundlrInstance,
      }}
    >
      {children}
    </BundlrContext.Provider>
  );
}

export function useBundlr() {
  return useContext(BundlrContext);
}
