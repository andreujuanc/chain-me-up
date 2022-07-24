import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { AppPropsWithLayout } from '../components/layout';
import { Toaster } from 'react-hot-toast';
import { BundlrContextProvider } from '../bundlr.context';
import { LitContextProvider } from '../lit.context';
import { AccountContextProvider } from '../account.context';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'Chain Me Up',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AccountContextProvider>
          <LitContextProvider>
            <BundlrContextProvider>

              <Toaster position="top-right" reverseOrder={false} />
              {getLayout(<Component {...pageProps} />)}

            </BundlrContextProvider>
          </LitContextProvider>
        </AccountContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
