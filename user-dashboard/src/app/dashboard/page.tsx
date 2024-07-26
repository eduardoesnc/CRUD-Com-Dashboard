'use client'

import SideBar from "@/components/Sidebar/Sidebar";
import FemUserCountCard from "@/components/Dashboard/FemCountCard";
import MascUserCountCard from "@/components/Dashboard/MascCountCard";
import { MonthProvider } from "@/components/Dashboard/MonthContext";
import NInformadosUserCountCard from "@/components/Dashboard/NInformCountCard";
import OutrosUserCountCard from "@/components/Dashboard/OutrosCountCard";
import GenderPieChart from "@/components/Dashboard/PieChart";
import MonthSelector from "@/components/Dashboard/SeletorMes";
import GenderChart from "@/components/Dashboard/GenderChart";
import UserCountCard from "@/components/Dashboard/UserCountCard";



export default function Dashboard() {
  return (
    <MonthProvider>
      <main className="pb-12">
        <SideBar/>
        <div className="mt-12 mr-[2%] ml-32">
          <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
          <MonthSelector />
        
          <div className="mt-4 grid grid-cols-3  gap-4">
            <UserCountCard />
            <MascUserCountCard/>
            <FemUserCountCard/>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <OutrosUserCountCard/>
            <NInformadosUserCountCard/>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <GenderChart/>
            <GenderPieChart/>
          </div>
        </div>
      </main>
    </MonthProvider>
  );
}
