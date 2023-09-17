import Link from "next/link";

const NotFoundUi = ({ errorMessage }) => {
  return (
    <div className='flex justify-center items-center flex-col min-h-screen w-full'>
      <h2>Not Found</h2>
      <p>{errorMessage}</p>
      <Link className='btn btn-link' href='/'>
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundUi;
