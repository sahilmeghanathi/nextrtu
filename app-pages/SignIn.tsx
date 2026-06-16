import BackgroundOverlay from "@/components/wrapper/Background";
import SignInForm from "@/components/auth/signInForm";
import Image from "next/image";

function SignInPage() {
  return (
    <section className="flex h-screen flex-col items-center justify-center my-auto">
      <BackgroundOverlay />
      <div className="flex gap-2 z-10 h-3/4 w-1/4 rounded-2xl p-6">
        <section className="w-full my-auto">
          <Image src="/logoa.png" alt="logo" width={200} height={200} />
          <SignInForm />
        </section>
      </div>
    </section>  
  );
}

export default SignInPage;