import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useBundlr } from '../../bundlr.context';
import { UploadImage } from '../upload-image';

export function WalletManagement() {
  const { initialiseBundlr, bundlrInstance, balance, fundWallet } = useBundlr();
  const { isConnected } = useAccount();
  const [value, setValue] = useState('0.05');
  const router = useRouter();

  useEffect(() => {
    if (isConnected && bundlrInstance === undefined) {
      // router.push('/home');
      initialiseBundlr();
    }
  }, [isConnected, bundlrInstance]);

  if (isConnected) {
    return (
      <>
        <p className="mb-4 text-center"></p>Your current balance is:{' '}
        {balance || 0} $BNDLR
        <div className="flex items-center justify-center">
          <button onClick={() => fundWallet(+value)}>💸 Add Fund</button>
          <UploadImage />
        </div>
      </>
    );
  } else {
    return (
      <>
        <p className="mb-4 text-center">
          Supporting your favourite creators is one connection away 😏
        </p>
        <div className="flex items-center justify-center">
          <ConnectButton
            accountStatus="full"
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </>
    );
  }
}
