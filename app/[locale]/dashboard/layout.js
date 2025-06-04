import Ipadsidebar from "@/app/components/ipadsidebar";
import Sidebar from "@/app/components/sidebar";
import Sidebar2 from "@/app/components/sidebar2";

export default function RootLayout({ children }) {
  return (
    <div className=" flex w-[100vw]   ">
      <div className=" hidden lg:block xl:w-[16.5rem] w-[12rem] 2xl:min-w-[17.2rem] min-w-[13rem] max-w-[13rem] xl:min-w-[16.5rem] xl:max-w-[16.5rem]  h-[100svh] sticky  top-0">
        <Sidebar />
      </div>
      {/* <div className=" lg:hidden block w-[7rem]  h-[100svh] sticky left-0 z-[100]  top-0 ">
        <Sidebar2 />
      </div> */}
      <div className="lg:hidden bottom-5 fixed w-[100vw] z-[50] ">
        <Ipadsidebar />
      </div>

      <div className=" w-full max-w-full overflow-x-hidden h-full ">
        {children}
      </div>
    </div>
  );
}
