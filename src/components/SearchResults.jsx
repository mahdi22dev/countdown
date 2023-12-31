import { formatDate } from "@/lib/utils";
import Link from "next/link";

const SearchResults = ({ countdowns, isPending }) => {
  return (
    <div className='min-h-[200px] max-h-[200px] overflow-y-visible w-full flex flex-col gap-1'>
      {isPending ? (
        <div className='flex justify-center items-center w-full h-full mt-5'>
          <span className='loading loading-spinner text-primary loading-sm'></span>
        </div>
      ) : (
        <>
          {countdowns.length == 0 ? (
            <div className='text-primary text-lg text-center'>
              No countdown Found
            </div>
          ) : (
            <div className='text-primary text-lg'>Search results : </div>
          )}
          {countdowns?.map((countdown) => {
            const date = formatDate(countdown.targetDate);
            return (
              <div
                key={countdown.id}
                className='p-2 bg-base-200 flex justify-between items-center rounded-md gap-1 flex-wrap'
              >
                <Link
                  className='btn btn-link'
                  href={`/user/countdowns/${countdown.id}`}
                >
                  <p className='text-xs truncate max-w-xs '>
                    {countdown.title}
                  </p>
                </Link>

                <p className='text-xs'>{date}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchResults;
