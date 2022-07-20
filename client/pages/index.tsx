import { NextPage } from 'next';
import dynamic from 'next/dynamic';

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
    <main className="fixed flex items-center justify-center w-full h-full bg-gradient-to-br from-primary-600 to-primary-50">
      <section className="items-center justify-center max-w-sm p-12 bg-white rounded-lg shadow-xl">
        <h1 className="mb-4 text-xl font-bold text-center text-primary-500">
          Chain Me Up
        </h1>
        <WalletManagement />
      </section>
    </main>
  );
};

export default Login;
