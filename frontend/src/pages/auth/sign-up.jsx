import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import useStore from '../../store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { SocialAuth } from '../../components/ui/social-auth'
import { Separator } from '../../components/ui/separator'
import Input from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { BiLoader } from 'react-icons/bi'
import { toast } from 'sonner'
import api from '../../libs/apiCall'

const RegisterSchema = z.object({
  email: z.string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
  firstName: z.string({ required_error: 'Name is Required'})
    .min(2, 'Name is Required')
})

const SignUp = () => {
  const { user } = useStore(state=> state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  const navigate = useNavigate();
  const [ loading, setLoading ] = useState();

  useEffect(() => {
    user && navigate('/')
  }, [user])


  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { data: res } = await api.post('/auth/sign-up', data);

      if(res?.user) {
        toast.success('Account created successfully! You can now login.');
        setTimeout(() => {
          navigate('/sign-in');
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally{
      setLoading(false);
    }
  }
  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10'>
      <Card className="w-[400px] shadow-md overflow-hidden"
        style={{
  
          backgroundColor: "hsl(var(--card))",
  
          color: "hsl(var(--card-foreground))",

      }}>
        <div className='p-6 md:-8'>
          <CardHeader  className='py-0'>
            <CardTitle className="mb-8 text-center"

              style={{
   
                color: "hsl(var(--foreground))",
             }}>
              Create an account
            </CardTitle>
          </CardHeader>

          <CardContent className='p-0'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='mb-8 space-y-6'>
                <SocialAuth isLoading={loading} setLoading={setLoading}/>
                <Separator/>

                <Input 
                  disabled={loading}
                  id='firstName'
                  label='Name'
                  name='firstName'
                  type='text'
                  placeholder='John Doe'
                  error={errors.firstName?.message}

                  {...register('firstName')} 
                 className="text-sm outline-none"

                 style={{


                  borderColor: "hsl(var(--border))",

                  backgroundColor: "transparent",

                  color: "hsl(var(--muted-foreground))",

                  "--tw-placeholder-color": "hsl(var(--muted-foreground))",

                }}


              />
              <Input 
                  disabled={loading}
                  id='email'
                  label='Email'
                  type='email'
                  placeholder='you@example.com'
                  error={errors.email?.message}

                  {...register('email')} 
                 className="text-sm outline-none"

                 style={{


                  borderColor: "hsl(var(--border))",

                  backgroundColor: "transparent",

                  color: "hsl(var(--muted-foreground))",

                  "--tw-placeholder-color": "hsl(var(--muted-foreground))",

                }}


              />
              <Input 
                  disabled={loading}
                  id='paassword'
                  label='Password'
                  type='password'
                  placeholder='Your Password'
                  error={errors.password?.message}

                  {...register('password')} 
                 className="text-sm outline-none"

                 style={{


                  borderColor: "hsl(var(--border))",

                  backgroundColor: "transparent",

                  color: "hsl(var(--muted-foreground))",

                  "--tw-placeholder-color": "hsl(var(--muted-foreground))",

                }}


              />
              </div>

              <Button
                type='submit'
                className='w-full bg-violet-600'
                disabled={loading}
              >
                {loading ? <BiLoader className='text-2xl text-white animate-spin'/> : 'Create An Account'}
              </Button>
            </form>
          </CardContent>
        </div>
        <CardFooter className='justify-center gap-2'>
          <p className='text-sm text-gray-600 '>Already have an account</p>
          <Link 
            to='/sign-in' 
            className='text-sm text-violet-600 hover:underline'
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
