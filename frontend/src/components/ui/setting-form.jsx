import React, { Fragment, useEffect, useState } from 'react'
import useStore from '../../store';
import { useForm } from 'react-hook-form';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { BsChevronExpand } from 'react-icons/bs';
import { BiCheck, BiLoader } from 'react-icons/bi'
import { fetchCountries } from '../../libs';
import Input from './input';
import {toast} from 'sonner';
import api from '../../libs/apiCall';
import { Button } from './button';


const Settingsform = () => {
    const { user, theme, setTheme, setCredentials } = useStore((state) => state);

    const {
        register,
        handleSubmit,
        reset, // ADDED: reset function for form
        formState: { errors },
    } = useForm({
        defaultValues: { ...user }
    });

    const [selectedCountry, setSelectedCountry] = useState({
        country: user?.country || 'Search country...',
        currency: user?.currency || 'KSH'
    } );

    const [ query, setQuery ] = useState('');
    const [ countriesData, setCountriesData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = async (values) => {
      try {
        setIsLoading(true)
        const newData = {
          ...values,
          country: selectedCountry.country,
          currency: selectedCountry.currency,
        }

        const {data: res} = await api.put(`/user`, newData)

        if(res?.user) {
          const newUser = { ...res.user, token: user.token}
          localStorage.setItem('user', JSON.stringify(newUser))
          
          // FIX: Update store with new user data
          setCredentials(newUser); // This updates your Zustand store
          
          toast.success(res?.message || 'Profile updated successfully!')
        }
      } catch (error) {
        console.error('Something went wrong', error)
        toast.error(error?.response?.data?.message || error.message)
      } finally {
        setIsLoading(false)
      }
    }

     const toggleTheme = (val) => {
        setTheme(val)
        localStorage.setItem('theme', val);
        
        // Force apply theme to HTML element
        if (val === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
        
        // Force a re-render
        window.dispatchEvent(new Event('themechange'));
    }

     // FIXED: Better theme initialization
    useEffect(() => {
        // First, remove any existing dark class to ensure clean start
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            // Only add dark class if explicitly saved as dark
            setTheme('dark');
            setTimeout(() => {
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
            }, 10);
        } else {
            // Default to light mode
            setTheme('light');
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [])

    const filteredCountries = query === ""
      ? countriesData : countriesData.filter((country) =>
        country.country
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
    );

    useEffect(() => {
        const getCountriesList = async () => {
        const data = await fetchCountries();
        setCountriesData(data) 
    };
        getCountriesList();
    }, [])

const Countries = () => { 
  return (
    <div className="w-full">
      <Combobox
        value={selectedCountry}
        onChange={(value) => {
          setSelectedCountry(value);
          setQuery(""); // ← important: resets input so selected value shows
        }}
      >
        <div className="relative mt-1">

          {/* Input */}
          <div className="relative">
            <ComboboxInput
              className="
                w-full bg-transparent 
                border border-gray-300 dark:border-gray-800 
                rounded-md py-2 pl-3 pr-10
                text-sm md:text-base 
                text-gray-700 dark:text-gray-400
                placeholder-gray-400 dark:placeholder-gray-600
                focus:ring-1 ring-blue-500 
                outline-none
              "
              displayValue={(country) => (query ? query : country?.country)} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search country…"
            />

            {/* Dropdown icon */}
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
              <BsChevronExpand className="h-4 w-4 text-gray-400" />
            </ComboboxButton>
          </div>

          {/* Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ComboboxOptions
              className="
                absolute z-50 mt-2 w-full 
                max-h-60 overflow-auto 
                rounded-md bg-white dark:bg-slate-900 
                shadow-lg ring-1 ring-black ring-opacity-5
                py-2 focus:outline-none
              "
            >
              {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-3 text-gray-600 dark:text-gray-400">
                  No countries found.
                </div>
              ) : (
                filteredCountries.map((country, index) => (
                  <ComboboxOption
                    key={country.country + index}
                    value={country}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-3 flex items-center gap-3
                       ${active ? "bg-blue-600 text-white" : "text-gray-800 dark:text-gray-300"}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <img
                          src={country.flag}
                          alt={country.country}
                          className="w-6 h-4 rounded-sm object-cover"
                          loading="lazy"
                        />
                        <span className={`truncate ${selected ? "font-medium" : ""}`}>
                          {country.country}
                        </span>

                        {selected && (
                          <BiCheck className="ml-auto h-5 w-5 text-blue-500 dark:text-blue-400" />
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        
        {/* LEFT COLUMN */}
        <div className='space-y-8'>
          <div className='pb-4 border-b border-gray-200'>
            <div className='w-full'>
                <Input
               disabled={isLoading}
               id='firstname'
               label='First Name'
               type='text'
               placeholder='John'
               register={register('firstname', {
                required: 'First Name is required!'
               })}
               errors={errors.firstname ? errors.firstname.message : ''}
               className="w-full text-sm boreder dark:border=gray-800 dark:bg-transparent dark:placeholder:text-gray-700
               dark:text-gray-700 dark:outline-none"
            />
            </div>
          </div>

          <div className='pb-4 border-b border-gray-200'>
            <div className='w-full'>
                <Input
               disabled={isLoading}
               id='email'
               label='Email'
               type='text'
               placeholder='example@example.com'
               register={register('email', {
                required: 'Email is required!'
               })}
               errors={errors.email ? errors.email.message : ''}
               className="w-full text-sm boreder dark:border=gray-800 dark:bg-transparent dark:placeholder:text-gray-700
               dark:text-gray-400 dark:outline-none"
            />
            </div>
          </div>

          <div className='pb-4 border-b border-gray-200'>
            <div className='w-full'>
                <span className="block text-gray-700 dark:text-gray-800 mb-2 text-sm md:text-base">
                    Country
                </span>
                <Countries />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className='space-y-8'>
          <div className='pb-4 border-b border-gray-200'>
            <div className='w-full'>
                <Input
               disabled={isLoading}
               id='lastname'
               label='Last Name'
               type='text'
               placeholder='Doe'
               register={register('lastname', {
                required: 'Last Name is required!'
               })}
               errors={errors.lastname ? errors.lastname.message : ''}
               className="w-full text-sm boreder dark:border=gray-800 dark:bg-transparent dark:placeholder:text-gray-700
               dark:text-gray-400 dark:outline-none"
            />
            </div>
          </div>

          <div className='pb-4 border-b border-gray-200'>
            <div className='w-full'>
                <Input
               disabled={isLoading}
               id='contact'
               label='Phone'
               type='text'
               placeholder='0723592416'
               register={register('contact', {
                required: 'Phone is required!'
               })}
               errors={errors.contact ? errors.contact.message : ''}  // FIXED: errors.contact (not errors.contct)
               className="w-full text-sm boreder dark:border=gray-800 dark:bg-transparent dark:placeholder:text-gray-700
               dark:text-gray-400 dark:outline-none"
            />
            </div>
          </div>

          <div className='pb-4 border-b border-gray-200'>
            <div className='w-full'>
                <span className="block text-gray-700 dark:text-gray-800 mb-2 text-sm md:text-base">
                    Currency
                </span>
                <div className="
    bg-transparent 
    border border-gray-300 dark:border-gray-800 
    rounded w-full py-2 px-3 
    text-gray-700 dark:text-gray-500 
    outline-none 
    dark:placeholder:text-gray-700
    text-sm md:text-base
  ">
                    {selectedCountry?.currency || 'KSH'}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Section - BELOW the grid like in second picture */}
      <div className='pt-8 border-t border-gray-200'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
          <div className='mb-4 md:mb-0'>
            <div>
                <p className='text-lg text-black dark:text-gray-800 font-semibold'>
                    Appearance
                </p>
                <span className="block text-gray-700 dark:text-gray-600 mb-2 text-sm md:text-base">
                    Customize how your theme looks on your device
                </span>
            </div>
          </div>

          <div className='w-full md:w-40'>
            <select 
              className="
                bg-transparent appearance-none 
                border border-gray-300 dark:border-gray-800 
                rounded w-full py-2 px-3 
                text-gray-700 dark:text-gray-500 
                outline-none 
                focus:ring-1 ring-blue-500 
                dark:placeholder:text-gray-700
                text-sm md:text-base
              "
              defaultValue={theme || "light"}
              onChange={(e) => toggleTheme(e.target.value)}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className='w-full flex items-center justify-between pb-10'>
          <div>
            <p className='text-lg text-black dark:text-gray-800 font-semibold'>
              Language
            </p>
            <span className="block text-gray-700 dark:text-gray-600 mb-2 text-sm md:text-base">
              Customize what language to use
            </span>
          </div>

          <div className='w-28 md:w-40'>
            <select className="
                bg-transparent appearance-none 
                border border-gray-300 dark:border-gray-800 
                rounded w-full py-2 px-3 
                text-gray-700 dark:text-gray-500 
                outline-none 
                focus:ring-1 ring-blue-500 
                dark:placeholder:text-gray-700
                text-sm md:text-base
              ">
                <option value="English">English</option>
              </select>
          </div>
        </div>

        <div className='flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border=gray-700'>
          <Button 
            variant='outline'
            type='button'
            onClick={() => {
              // Reset form to original values
              reset({ ...user });
              setSelectedCountry({
                country: user?.country || 'Search country...',
                currency: user?.currency || 'KSH'
              });
              toast.info('Form reset to original values');
            }}
            disabled={isLoading}
            className='px-6 cursor-pointer text-black'
          >
            Reset
          </Button>
          <Button
            type='submit'
            loading={isLoading}
            className='px-8 bg-violet-700 text-white cursor-pointer'
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Settingsform