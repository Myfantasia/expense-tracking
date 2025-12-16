// pages/dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../libs/apiCall";
import { toast } from "sonner";
import Loading from "../components/ui/loading";
import Info from "../components/ui/info";
import Stats from "../components/ui/stats";
import Chart from "../components/ui/chart";
import DoughnutChart from "../components/ui/piechart";
import RecentTransactions from "../components/ui/recent-transactions";
import Accounts from "../components/ui/accounts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchDashboardStats = async () => {
    const URL = `/transaction/dashboard`;
    try {
      const { data } = await api.get(URL);
      setData(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Something unexpected went wrong. Please try again later."
      );

      if (error?.response?.data?.status === "auth failed") {
        localStorage.removeItem("user");
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDashboardStats();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Loading />
      </div>
    );

  return (
    <div className="px-0 md:px-5 2xl:px-20">
      <Info title="Dashboard" subTitle="Monitor your financial activities" />

      <Stats
        dt={{
          balance: data?.availableBalance,
          income: data?.totalIncome,
          expenses: data?.totalExpenses,
        }}
      />

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row items-start gap-10 w-full mt-10">
        <Chart data={data?.chartData} />

        {data?.totalIncome > 0 && (
          <div className="flex-1 flex justify-center">
            <DoughnutChart
              dt={{
                balance: data?.availableBalance,
                income: data?.totalIncome,
                expenses: data?.totalExpenses,
              }}
            />
          </div>
        )}
      </div>

      {/* Transactions and Accounts */}
      <div className="flex flex-col md:flex-row gap-10 2xl:gap-20 mt-10">
        <RecentTransactions data={data?.recentTransactions} />

        {data?.lastAccount?.length > 0 && (
          <Accounts data={data?.lastAccount} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
