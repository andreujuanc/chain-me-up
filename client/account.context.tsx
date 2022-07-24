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
    const { data: signer, fetchStatus } = useSigner()
    const [profile, setProfile] = useState<string>(ZeroAddress)

    const contract = useContract({
        addressOrName: '0x0b9FD334938B039324ad40DC69B99c73C67bc93C',
        contractInterface: ChainMeUpProfiles.abi,
        signerOrProvider: signer
    })
    const { isLoading, write } = useContractWrite({
        addressOrName: '0x0b9FD334938B039324ad40DC69B99c73C67bc93C',
        contractInterface: ChainMeUpProfiles.abi,
        functionName: 'createProfile',
    })

    useEffect(() => {
        console.log('signer', signer)
        async function getProfile() {
            if (signer) {
                setProfile(await contract.getProfile())
            }
            else {

            }
        }
        getProfile()
    }, [address, signer, isConnected])

    async function createAccount() {
        await write()
    }


    return (
        <AccountContext.Provider value={{ account: address, profile, isDeployed: profile != ZeroAddress, createAccount }}>
            {children}
        </AccountContext.Provider>
    )

}

export function useFrenProfile() {
    return useContext(AccountContext);
}
