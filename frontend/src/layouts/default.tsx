import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow pt-8 sm:pt-16 px-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
