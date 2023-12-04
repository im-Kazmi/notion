import Sidebar from "@/components/Sidebar";
import PageContextProvider from "@/context/pageContext";
import SidebarContextProvider from "@/context/sidebarContext";
import { getAllPages } from "@/lib/actions/page.action";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const pages = await getAllPages();

  return (
    <SidebarContextProvider>
      <PageContextProvider>
        <div className=" flex max-w-[1400px] ">
          <div>
            <Sidebar pages={pages} />
          </div>
          <div className=" ml-60 lg:p-10 pt-4 lg:min-w-[900px] max-w-fit">
            {children}
          </div>
        </div>
      </PageContextProvider>
    </SidebarContextProvider>
  );
};

export default layout;
