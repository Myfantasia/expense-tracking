import React, { useEffect, useState } from 'react'
import api from '../libs/apiCall';
import { toast } from 'sonner';
import Loading from '../components/ui/loading';
import Info from '../components/ui/info';
import Stats from '../components/ui/stats';
import Chart from '../components/ui/chart';
import DoughnutChart from '../components/ui/piechart';
import RecentTransactions from '../components/ui/recent-transactions';
import Accounts from '../components/ui/accounts';

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
        'Something unexpected went wrong. Please try again later.'
      );
      if(error?.response?.data?.status === 'auth failed'){
        localStorage.removeItem('user');
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
      <div className='flex items-center justify-center w-full h-[80v]'>
        <Loading />
      </div>
  )
  return (
    <div className='px-0 md:px-5 2xl:px-20'>
      <Info title='Dashboard' subTitle={'Monitor your financial activities'}/>
      <Stats
        dt={{
          balance: data?.availableBalance,
          income: data?.totalIncome,
          expenses: data?.totalExpenses
        }}
      />

      <div className='flex flex-col-reverse items-center gap-10 w-full md:flex-row'>
        <Chart data={ data?.chartData}/>
        {data?.totalIncome > 0 && (
          <DoughnutChart
            dt={{
              balance: data?.availableBalance,
              income: data?.totalIncome,
              expenses: data?.totalExpenses
            }}
          />
        )}
      </div>

      <div className='flex flex-col-reverse gap-0 md:flex-row md:gap-10 2xl:gap-20'>
        <RecentTransactions data={data?.recentTransactions} />
      {data?.lastAccount?.length > 0 && <Accounts data={data?.lastAccount}/>}
      </div>
    </div>
  )
}

export default Dashboard
