import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};
export default function Page() {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 '>
      <LoginForm />
    </div>
  );
}
