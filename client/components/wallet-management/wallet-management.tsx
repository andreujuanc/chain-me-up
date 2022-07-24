import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { useBundlr } from '../../bundlr.context';
import { useLit } from '../../lit.context';
import { UploadImage } from '../upload-image';

export function WalletManagement() {
  const { initialiseBundlr, bundlrInstance, balance, fundWallet } = useBundlr();
  const { initialiseLit } = useLit();
  const { isConnected } = useAccount();
  const [value, setValue] = useState('0.05');
  const router = useRouter();

  const bundlrFunder= bundlrInstance?.funder
  const initItAll = useMemo(() => () => {
    
    if (isConnected && bundlrFunder === undefined) {
      // router.push('/home');
      initialiseBundlr();
    }
  }, [isConnected, bundlrInstance, bundlrFunder]);
  
  useEffect(()=>{
    initItAll()
  }, [])
  
  useEffect(() => {
    if (isConnected) {
      //initialiseLit();
    }
  }, [isConnected]);

  if (isConnected) {
    return (
      <>
        <p className="mb-4 text-center"></p>Your current balance is:{' '}
        {balance || 0} $BNDLR
        <div className="flex flex-col items-center justify-center">
          <button className="w-full bg-primary-600 text-gray-50 rounded-lg hover:bg-primary-500 hover:bg-opacity-60 hover:text-primary-600" onClick={() => fundWallet(+value)}>💸 Add Funds</button>
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
