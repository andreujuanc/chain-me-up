import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';

const WalletManagement = dynamic(
  async () => {
    const { WalletManagement } = await import(
      '../components/wallet-management'
    );

    return WalletManagement;
  },
  { ssr: false },
);

const Login: NextPage = () => {
  return (
    <main className="fixed flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-primary-600 to-primary-50">
      <NextHead>
        <title>OnlyFrens</title>
      </NextHead>
      <section className="items-center justify-center max-w-sm p-12 bg-white rounded-lg shadow-xl">
        <div className="px-6 py-2 mb-6 bg-primary-50 flex items-center justify-center rounded-lg padding-lg">
          {// eslint-disable-next-line @next/next/no-img-element 
            <img src="/images/logo/logo.svg" alt='Logo' />
          }
        </div>
        <WalletManagement />
      </section>
    </main>
  );
};

export default Login;
