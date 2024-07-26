import DataForm from "@/components/TabelaDados/Form";
import SideBar from "@/components/Sidebar/Sidebar";
import FullFeaturedCrudGrid from "@/components/TabelaDados/DataTable";

export default function Home() {
  
  return (
    <main className="">
      <SideBar/>
      <div className="flex flex-col items-center mt-8 mb-32 mr-[2%] ml-32 ">
        <DataForm/>
        <FullFeaturedCrudGrid/>
      </div>
    </main>
  );
}
