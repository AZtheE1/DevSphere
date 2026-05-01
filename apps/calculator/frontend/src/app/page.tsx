import { Calculator } from '@/components/Calculator';
import { AuthProvider } from '@devsphere/auth';

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-[#090a0f] text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black tracking-tighter">CALC<span className="text-cyan-400">ULATOR</span></h1>
            <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs mt-2">Part of DevSphere Tools</p>
          </div>
          <Calculator />
        </div>
      </main>
    </AuthProvider>
  );
}
