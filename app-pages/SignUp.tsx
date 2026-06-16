import BackgroundOverlay from "@/components/wrapper/Background";
import Image from "next/image";
import SignUpForm from "@/components/auth/signUpForm";

function SignUpPage() {
  return (
    <section className="flex h-screen flex-col items-center justify-center my-auto">
      <BackgroundOverlay />
      <div className="flex gap-2 z-10 h-3/4 2xl:w-1/4 md:w-1/2 sm:w-full rounded-2xl p-6">
        <section className="w-full my-auto">
          <Image src="/logoa.png" alt="logo" width={200} height={200} />
          <SignUpForm />
        </section>
      </div>
    </section>  
  );
}

export default SignUpPage;