'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Researcher from '@Images/researcher.png';
import { useRouter, useSearchParams } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import HomeButton from '@/components/HomeButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const formSchema = z.object({
  majorType: z.enum(['Science', 'Humanities'], {
    errorMap: () => ({ message: 'Please select a valid major type.' }),
  }),
  biology: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  physics: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  chemistry: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  mathematics: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  pu: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  ppu: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  pk: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
  pbm: z.number().min(0, 'Score must be at least 0').max(1000, 'Score must be 1000 or less'),
});

const RecommendationPage = () => {
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const selectedMajor = searchParams.get('major');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          router.push('/auth');
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/auth');
      }
    };

    fetchUser();
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      majorType: 'Science',
      biology: 0,
      physics: 0,
      chemistry: 0,
      mathematics: 0,
      pu: 0,
      ppu: 0,
      pk: 0,
      pbm: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Form Values:', values);
    router.push('/dashboard'); // Redirect to the dashboard
  };

  if (!user) {
    return <div className='flex w-[100vh] h-[100vh] text-center items-center justify-center'>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between p-6 px-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-cyan-500">SURE</h1>
        <div className="flex gap-6">
          <HomeButton />
          <SignOutButton>Logout</SignOutButton>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center flex-grow text-center py-16 px-4 bg-neutral-50 overflow-hidden">
        <div className="relative flex flex-col justify-center py-8 px-8 text-start bg-white my-4 mb-0 border-2 rounded-3xl w-[70vw] overflow-visible">
          <h1 className="relative text-2xl font-bold text-gray-900 leading-normal">
            {selectedMajor || 'No Major Selected'}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <h1 className='font-semibold text-[1.2rem] '>Major Type | <span className='text-gray-400 font-normal'>{/* Science / Humanities */}Science</span></h1>
          </div>

          <div className="relative">
            <Image
              src={Researcher}
              alt="Researcher"
              width={200}
              height={200}
              className="absolute right-4 -bottom-20 rounded-lg object-cover h-60 w-60"
            />
          </div>
        </div>

        <div className="flex justify-center py-12 px-8 pt-8 text-start bg-white my-4 border-2 rounded-3xl w-[70vw]">
          <Form {...form}>
            <form className="w-full max-w-4xl space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <h1 className='font-bold text-2xl '>TRYOUT SCORE</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {['biology', 'physics', 'chemistry', 'mathematics', 'pu', 'ppu', 'pk', 'pbm'].map((subject) => (
                  <FormField
                    key={subject}
                    control={form.control}
                    name={subject as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-semibold'>{subject.toUpperCase()}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Score" className='border rounded-lg max-w-[160px]'{...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <Button type="submit" className="w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-neutral-800">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
