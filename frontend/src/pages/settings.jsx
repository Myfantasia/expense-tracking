import React from 'react'
import useStore from '../store';
import Title from '../components/ui/title';
import Settingsform from '../components/ui/setting-form';
import ChangePassword from '../components/ui/change-password';

const Settings = () => {
  const { user } = useStore((state) => state);
  
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full max-w-4xl px-4 py-4 my-6 shadow-lg bg-white md:px-10 md:my-10'>
        <div className='mt-6 border-b-2 border-gray-200 dark:border-gray-700'>
          <Title title='General Settings'/>
        </div>
        
        <div className='py-10'>
          <p className='text-lg font-bold text-gray-800 dark:text-gray-700'>
            Profile Information
          </p>
          
          <div className='flex items-center gap-4 my-8'>
            <div className='rounded-full flex items-center text-black text-2xl justify-center w-12 h-12 cursor-pointer bg-violet-600'>
              <p className=''>{user?.firstname?.charAt(0)}</p>
            </div>
            <div>
              <p className='text-2xl font-semibold text-gray-800 dark:text-gray-700'>
                {user?.firstname} {user?.lastname}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-600'>
                {user?.email}
              </p>
            </div>
          </div>

          <Settingsform/>

          {!user?.provided && <ChangePassword/>}
        </div>
      </div>
    </div>
  )
}

export default Settings