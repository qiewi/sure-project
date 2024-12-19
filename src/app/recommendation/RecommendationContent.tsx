'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Researcher from '@Images/researcher.png';
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
import Navbar from '@/components/layout/Navbar';

const RecommendationContent = () => {
  const [user, setUser] = useState(null);
  const [majorType, setMajorType] = useState<string | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const selectedMajor = searchParams.get('major'); // Get the major name
  const router = useRouter();

  const getDynamicFields = (type: string) => {
    if (type === 'humanities') {
      return ['economy', 'sosiology', 'history', 'geography', 'pu', 'ppu', 'pk', 'pbm'];
    }
    return ['biology', 'physics', 'chemistry', 'mathematics', 'pu', 'ppu', 'pk', 'pbm'];
  };

  const dynamicFields = getDynamicFields(majorType || 'Science');

  const formSchema = z.object(
    dynamicFields.reduce((schema, field) => {
      schema[field] = z
        .union([z.number(), z.string().refine((val) => val === '', { message: '' })])
        .refine(
          (value) =>
            value === '' || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 1000),
          {
            message: 'Score must be between 0 and 1000',
          }
        );
      return schema;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const defaultValues = dynamicFields.reduce((values, field) => {
    values[field] = '';
    return values;
  }, {} as Record<string, string | number>);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user', { method: 'GET', credentials: 'include' });
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

    const fetchMajorType = async () => {
      try {
        if (selectedMajor) {
          const response = await fetch(`/api/majors?q=${selectedMajor}`);
          const data = await response.json();
          const major = data.find(
            (major: { name: string; type: string }) => major.name === selectedMajor
          );
          setMajorType(major?.type || null);
        }
      } catch (error) {
        console.error('Error fetching major type:', error);
      }
    };

    fetchUser();
    fetchMajorType();
  }, [router, selectedMajor]);

  const onSubmit = async (values: Record<string, string | number>) => {
    const totalScore = dynamicFields.reduce(
      (sum, field) => sum + (Number(values[field]) || 0),
      0
    );
    const average = totalScore / dynamicFields.length;
    setAverageScore(average);

    try {
      const response = await fetch(
        `/api/universities?major_name=${selectedMajor}&type=${majorType}&average=${average}`
      );
      if (!response.ok) throw new Error('Failed to fetch universities');
      const universities = await response.json();

      // Navigate back to home with the required data
      router.push(
        `/home?major_name=${encodeURIComponent(selectedMajor || '')}&universities=${encodeURIComponent(
          JSON.stringify(universities)
        )}&average_score=${average}&major_type=${majorType}&saved=true`
      );

    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  if (!user || !majorType) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Navbar Section */}
      <Navbar />

      <div className="relative flex flex-col items-center justify-center flex-grow text-center py-16 px-4 bg-neutral-50 overflow-hidden">
        <div className="relative flex flex-col justify-center py-8 px-8 text-start bg-white my-4 mb-0 border-2 rounded-3xl w-[70vw] overflow-visible">
          <h1 className="relative text-2xl font-bold text-gray-900 leading-normal">
            {selectedMajor || 'No Major Selected'}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <h1 className="font-semibold text-[1.2rem] ">
              Major Type |{' '}
              <span className="text-gray-400 font-normal">{majorType || 'Not Found'}</span>
            </h1>
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
                <h1 className="font-bold text-2xl ">TRYOUT SCORE</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {dynamicFields.map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">{fieldName.toUpperCase()}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="border rounded-lg max-w-[160px]"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === '' ? '' : Number(value));
                            }}
                            value={field.value || ''}
                          />
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

export default RecommendationContent;
