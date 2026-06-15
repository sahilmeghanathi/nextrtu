import SignInForm from "@/pages/auth/signInPage";

import BackgroundOverlay from "@/components/wrapper/Background";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center my-auto">
      <BackgroundOverlay />
      <div className="flex gap-2 h-3/4 w-2/4 rounded-2xl p-6">
        <section className="w-1/2 my-auto">
        <SignInForm />
        </section>
        <section className="w-1/2 my-auto">
        <Image src="/assets/images/signin-illustration.png" alt="signin-illustration" width={400} height={400} className="object-contain" />
        </section>
      </div>
    </section>
  );
}
