import Header from '@/components/Header';
import MarketsContainer from '@/components/MarketsContainer';
import SideBar from '@/components/SideBar';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex grid-cols-2 flex-wrap sm:flex-nowrap">
        <div className="m-4 w-full sm:w-1/4">
          <h1 className="py-2 pl-1 font-bold text-white">Filter by Sport</h1>
          <SideBar />
        </div>

        <div className="w-full bg-black p-4 sm:w-3/4">
          <h1 className="p-2 font-bold text-white">Upcoming Events</h1>
          <div className="flex flex-wrap">
            <MarketsContainer />
          </div>
        </div>
      </div>
    </>
  );
}
