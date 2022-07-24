import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount, useConnect, useContract, useContractRead, useContractWrite, useSigner } from 'wagmi';
import ChainMeUpProfiles from './contracts/ChainMeUpProfiles.json'

export interface IAccountHook {
    account: string | undefined
    profile: string | undefined
    createAccount: () => Promise<void>
    isDeployed: boolean | undefined
}

const AccountContext = createContext<IAccountHook>({
    account: undefined,
    profile: undefined,
    isDeployed: undefined,
    createAccount: async () => { },
});

interface IAccountContextProviderProps {
    children: ReactNode;
}
const ZeroAddress = '0x0000000000000000000000000000000000000000'
export function AccountContextProvider({ children }: IAccountContextProviderProps) {
    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, pendingConnector } = useConnect()
    const { data: signer } = useSigner()
    const [profile, setProfile] = useState<string>(ZeroAddress)

    const contract = useContract({
        addressOrName: '0x0b9FD334938B039324ad40DC69B99c73C67bc93C',
        contractInterface: ChainMeUpProfiles.abi,
        signerOrProvider: signer
    })
    const { data, isError, isLoading, write } = useContractWrite({
        addressOrName: '0x0b9FD334938B039324ad40DC69B99c73C67bc93C',
        contractInterface: ChainMeUpProfiles.abi,
        functionName: 'createProfile',
    })

    useEffect(() => {
        async function getSigner() {
            if (signer) {
                setProfile(await contract.getProfile())
            }
        }
        getSigner()
    }, [address, signer])

    async function createAccount() {
        await write()
    }
    if (isConnected) {

        return (

            <AccountContext.Provider value={{ account: address, profile, isDeployed: profile != ZeroAddress, createAccount }}>
                {children}
            </AccountContext.Provider>
        )
    }
    else {
        return (
            <>
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                        {isLoading &&
                            pendingConnector?.id === connector.id &&
                            ' (connecting)'}
                    </button>
                ))}

                {error && <div>{error.message}</div>}
            </>
        )

    }
}

export function useFrenProfile() {
    return useContext(AccountContext);
}
