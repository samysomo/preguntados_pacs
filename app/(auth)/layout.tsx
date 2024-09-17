import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full bg-gradient-to-r from-[#300d66] to-[#fc466b] text-white justify-between items-center p-8">
          {children}
          <div className="auth-asset">
            <div className="">
              <Image
                src="/assets/2701045.jpg"
                alt="Designed by freepik"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
      </main>
    );
  }