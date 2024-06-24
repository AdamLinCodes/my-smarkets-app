import Header from "@/components/Header";
import MarketsContainer from "@/components/MarketsContainer";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <>
      <Header/>
      <div className="flex flex-wrap grid-cols-2 sm:flex-nowrap">
        <div className="w-full sm:w-1/4 m-4">
          <h1 className="text-white font-bold py-2 pl-1">Filter by Sport</h1>
          <SideBar/>
        </div>
        
        <div className="w-full sm:w-3/4 bg-black p-4">
          <h1 className="p-2 text-white font-bold">Upcoming Events</h1>
          <div className="flex flex-wrap">
            <MarketsContainer/>
          </div>
        </div>
      </div>
    </>
  );
}
