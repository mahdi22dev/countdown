import { MyDrawer } from "./Mydrawer";

const Tabs = () => {
  return (
    <div className='tabs tabs-boxed items-center justify-between p-4'>
      <div>
        <p className='text-primary text-xs sm:text-sm md:text-base'>
          You have 100 countdown
        </p>{" "}
      </div>
      <div>
        <button className='tab tab-active'>All</button>
        <button className='tab'>Ending Soon</button>
        <button className='tab'>Ended</button>
      </div>
      <div>
        <MyDrawer />
      </div>
    </div>
  );
};

export default Tabs;
