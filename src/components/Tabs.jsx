import { MyDrawer } from "./Mydrawer";

const Tabs = ({ count }) => {
  return (
    <div className='tabs tabs-boxed flex-col md:flex-row gap-5 md:gap-0 items-center justify-between p-4 '>
      <div>
        <p className='text-primary text-xs sm:text-sm md:text-base'>
          You have {count} countdown
        </p>
      </div>

      <div>
        <button className='tab tab-active text-xs sm:text-sm md:text-base'>
          All
        </button>
        <button className='tab text-xs sm:text-sm md:text-base'>
          Ending Soon
        </button>
        <button className='tab text-xs sm:text-sm md:text-base'>Ended</button>
      </div>
      <div>
        <MyDrawer />
      </div>
    </div>
  );
};

export default Tabs;
