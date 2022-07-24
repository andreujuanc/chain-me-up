declare module 'lit-js-sdk' {
  export interface ILitSdk {
    LitNodeClient: any;
    checkAndSignAuthMessage: (config: ICheckAndSignAuthMessageConfig) => Promise<IAuthSignature>;
    encryptString: (str: string) => Promise<IEncryptStringResult>;
  }

  const LitSdk: ILitSdk;
  export default LitSdk;

  export type TStandardContractType = 'ERC20' | 'ERC721' | 'ERC1155' | '';

  export type TChain = 'ethereum' |
    'polygon' |
    'fantom' |
    'xdai' |
    'bsc' |
    'arbitrum' |
    'avalanche' |
    'fuji' |
    'harmony' |
    'kovan' |
    'mumbai' |
    'goerli' |
    'ropsten' |
    'rinkeby' |
    'cronos' |
    'optimism' |
    'celo' |
    'aurora' |
    'eluvio' |
    'alfajores' |
    'xdc' |
    'evmos' |
    'evmosTestnet' |
    'solana' |
    'solanaDevnet' |
    'solanaTestnet' |
    'cosmos' |
    'kyve';
  
  export interface IEncryptStringResult {
    encryptedString: string;
    symmetricKey: string;
  }

  export type TComparator = string; // TODO: '>', '<' etc.
  
  export interface IReturnValueTest {
    comparator: TComparator;
    value: string | number;
  }

  export interface ICheckAndSignAuthMessageConfig {
    chain: TChain;
  }

  export interface IAccessControlCondition {
    contractAddress: string;
    chain: TChain;
    standardContractType: TStandardContractType;
    method: string;
    parameters: any[];
    returnValueTest: IReturnValueTest;
  }

  export interface ISaveEncryptionKeyConfig {
    accessControlConditions: IAccessControlCondition[],
    symmetricKey: string,
    authSig: IAuthSignature,
    chain: TChain,
  }

  export interface ILitClient {
    saveEncryptionKey: (config: ISaveEncryptionKeyConfig) => Promise<string>;
  }

  export interface IAuthSignature {

  }
}