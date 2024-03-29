import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { useFrenProfile } from '../../account.context';
import { useBundlr } from '../../bundlr.context';
import { useLit } from '../../lit.context';
import { formatAmount } from '../../utils';
import { UploadImage } from '../upload-image';
import { SimpleButton } from '../SimpleButton';

export function WalletManagement() {
  const { connect, connectors, error, pendingConnector } = useConnect()
  const { initialiseBundlr, bundlrInstance, balance, fundWallet } = useBundlr();
  const { initialiseLit } = useLit();
  const { account, isDeployed, createAccount } = useFrenProfile()
  const { isConnected } = useAccount();
  const [value, setValue] = useState('0.05');
  const router = useRouter();
  console.log('isDeployed', isDeployed)
  const bundlrFunder = bundlrInstance?.funder;

  if (isConnected && bundlrFunder === undefined) {
    return (
      <>
        <p className="mb-4 text-center">Please sign the message to login</p>
        <div>
          <SimpleButton
            onClick={async () => {
              await initialiseBundlr();
              if (initialiseLit) {
                initialiseLit();
              }
            }}
          >
            Login
          </SimpleButton>
        </div>
      </>
    );
  }
  else if (isDeployed == false) {
    return (
      <>
        <div>
          {connectors.map((connector) => (
            <SimpleButton
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}

            </SimpleButton>
          ))}
        </div>
        <p className="mb-4 text-center">Seems like this is your first time here, welcome!</p>
        <div>
          <SimpleButton onClick={() => createAccount()}>Create Account</SimpleButton>
        </div>
      </>
    )
  } else if (isConnected && bundlrFunder !== undefined) {
    return (
      <>
        <p className="mb-4 text-center">
          Your current balance is: {formatAmount(balance || 0, 4)} $BNDLR
        </p>
        <div className="flex flex-col items-center justify-center">
          <SimpleButton onClick={() => fundWallet(+value)}>
            💸 Add Funds
          </SimpleButton>
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
