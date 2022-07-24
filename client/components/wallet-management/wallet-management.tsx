import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { useBundlr } from '../../bundlr.context';
import { useLit } from '../../lit.context';
import { formatAmount } from '../../utils';
import { UploadImage } from '../upload-image';

function SimpleButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button className="w-full h-10 bg-primary-600 text-gray-50 rounded-lg hover:bg-primary-500 hover:bg-opacity-60 hover:text-primary-600"
      onClick={onClick}>{children}
    </button>
  );
}

export function WalletManagement() {
  const { initialiseBundlr, bundlrInstance, balance, fundWallet } = useBundlr();
  const { initialiseLit } = useLit();
  const { isConnected } = useAccount();
  const [value, setValue] = useState('0.05');
  const router = useRouter();

  const bundlrFunder = bundlrInstance?.funder

  if (isConnected && bundlrFunder !== undefined) {
    return (
      <>
        <p className="mb-4 text-center">
          Your current balance is:{' '}
          {formatAmount(balance || 0, 4)} $BNDLR
        </p>
        <div className="flex flex-col items-center justify-center">
          <SimpleButton onClick={() => fundWallet(+value)}>💸 Add Funds</SimpleButton>
          <UploadImage />
        </div>
      </>
    );
  } else if (isConnected && bundlrFunder === undefined) {
    return (
      <>
        <p className="mb-4 text-center">Please sign the message to login</p>
        <div>
          <SimpleButton onClick={() => { initialiseBundlr(); initialiseLit() }}>Login</SimpleButton>
        </div>
      </>
    )
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
