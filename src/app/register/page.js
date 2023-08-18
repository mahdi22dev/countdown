import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};
export default function Page() {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 '>
      <SignupForm />
    </div>
  );
}
