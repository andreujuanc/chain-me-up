import { createContext, ReactNode, useContext, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

export interface IAccountHook {
    account: string | undefined
    isDeployed: boolean | undefined
}

const AccountContext = createContext<IAccountHook>({
    account: undefined,
    isDeployed: undefined
});

interface IAccountContextProviderProps {
    children: ReactNode;
}

export function AccountContextProvider({ children }: IAccountContextProviderProps) {
    const { address } = useAccount()
    const { data } = useContractRead({
        addressOrName: '',
        contractInterface: '',
        functionName: ''
    })

    return (
        <AccountContext.Provider value={{ account: address, isDeployed: (data?.length ?? 0) > 0 }}>
            {children}
        </AccountContext.Provider>
    );
}

export function useFrenProfile() {
    return useContext(AccountContext);
}
