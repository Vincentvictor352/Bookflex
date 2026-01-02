import AuthFooter from "@/component/AuthFooter";
import AuthNav from "@/component/AuthNav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#330e10] to-black flex flex-col">
      <AuthNav />
      <main className="flex-1 flex justify-center items-center px-4 md:px-0  py-12">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
