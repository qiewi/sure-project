'use client';

import React, { useState, useEffect } from 'react';
import SignOutButton from '@/components/SignOutButton';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import HomeButton from '@/components/HomeButton';
import { Button } from '@/components/ui/Button';

const data = [
  {
    rank: 1,
    title: "Universitas Indonesia",
    passingScore: 740,
  },
  {
    rank: 2,
    title: "Institut Teknologi Bandung",
    passingScore: 730,
  },
  {
    rank: 3,
    title: "Universitas Gadjah Mada",
    passingScore: 690,
  },
  {
    rank: 4,
    title: "Universitas Lampung",
    passingScore: 680,
  },
  {
    rank: 5,
    title: "Institut Teknologi Sepuluh Nopember",
    passingScore: 666,
  },
];

interface Major {
  name: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Major[]>([]);
  const [error, setError] = useState('');
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

  let debounceTimer: NodeJS.Timeout;

  const fetchMajors = (search: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/majors?q=${search}`);
        if (!response.ok) throw new Error('Error fetching majors');
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }, 300); // Delay of 300ms
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setError(''); // Clear error when user types again

    if (value.length > 1) {
      fetchMajors(value);
    } else {
      setSuggestions([]);
    }
  };

  const validateAndSubmit = async () => {
    if (!query) {
      setError('Please enter a major.');
      return;
    }
  
    try {
      const response = await fetch(`/api/majors?q=${query}`);
      const data = await response.json();
  
      const major = data.find(
        (major: { name: string }) => major.name.toLowerCase() === query.toLowerCase()
      );
  
      if (major) {
        // Only pass the major to the RecommendationPage
        router.push(`/recommendation?major=${encodeURIComponent(query)}`);
      } else {
        // Show an error if the input is not valid
        setError('The entered major does not exist.');
        setSuggestions([]); // Hide suggestions
      }
    } catch (error) {
      console.error('Error validating major:', error);
      setError('An error occurred while validating your input. Please try again.');
      setSuggestions([]); // Hide suggestions
    }
  };
  
  
  
  const handleSelectMajor = (majorName: string) => {
    setQuery(majorName);
    setSuggestions([]);
    setError(''); // Clear error when a valid suggestion is selected
  };

  if (!user) {
    return <div className='w-screen h-screen items-center justify-center'>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Navbar Section */}
      <div className="flex items-center justify-between p-6 px-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-cyan-500">SURE</h1>
        <div className="flex gap-6">
          <HomeButton />
          <SignOutButton>Logout</SignOutButton>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center flex-grow text-center py-16 px-4 bg-neutral-50 overflow-hidden h-[600px]">
        {/* Background Circles */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[1000px] h-[1000px] border-8 border-blue-300 rounded-full absolute -1/2"></div>
          <div className="w-[700px] h-[700px] border-8 border-blue-300/40 rounded-full absolute -1/2"></div>
        </div>

        {/* Hero Content */}
        <h1 className="relative text-6xl font-bold text-gray-900 leading-snug">
          Explore Your Dream{' '}
          <span className="block bg-gradient-to-b from-blue-800 to-cyan-300 bg-clip-text text-transparent">
            University
          </span>
        </h1>
        <p className="relative mt-4 text-lg text-gray-600">
          Search for universities based on your major preference
        </p>
        {/* Search Input */}
        <div className="relative mt-8 w-full max-w-lg z-50">
          <div className="relative flex items-center">
            <Input
              placeholder="What's your dream major?"
              value={query}
              onChange={handleInputChange}
              className={`w-full p-6 px-8 text-lg border-2 rounded-full focus:bg-white bg-white transform transition duration-300 hover:scale-105 focus:scale-105 focus:shadow-xl ${
                error ? 'border-red-500' : ''
              }`}
            />
            <button
              onClick={validateAndSubmit}
              className="absolute right-8 text-cyan-500 hover:text-cyan-700">
              <FaSearch size={20} />
            </button>
          </div>

          {/* Error Message Below Input */}
          {error && (
            <p className="text-red-500 mt-2 text-start">{error}</p>
          )}

          {/* Suggestions Dropdown */}
          {!error && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-2 bg-white shadow-md rounded-xl z-50">
              {suggestions.map((major, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-start"
                  onClick={() => handleSelectMajor(major.name)}
                >
                  {major.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex justify-center z-0 py-8 pb-20 bg-white">
        <div className="w-full max-w-4xl -mt-20 shadow-gray-400/60 shadow-md rounded-3xl z-0 border-2">
          <div className="flex flex-row bg-white rounded-3xl p-12 pb-8 gap-2 justify-between items-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-gray-700">University Recommendation</h2>
              <p className="text-gray-500">Here are the best 5 universities we recommend for you</p>
            </div>
            <div>
              <Button className="bg-cyan-600 text-white rounded-full px-8 py-4">Save Result</Button>
            </div>
          </div>

          <div className="p-8 pt-0 flex flex-col gap-4">
            {data.map((university, index) => (
              <div
                key={index}
                className="bg-white flex flex-row justify-between border-2 p-8 rounded-3xl items-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Left Section: Rank and University Info */}
                <div className="flex flex-row items-center gap-8">
                  <div>
                    <h1 className="font-bold text-3xl">#{university.rank}</h1>
                  </div>
                  <div>
                    <h1 className="font-semibold text-xl">{university.title}</h1>
                    <h2 className="font-normal text-lg">Fakultas Kedokteran</h2>
                  </div>
                </div>

                {/* Right Section: Passing Score */}
                <div className="text-center">
                  <p className="text-gray-500">Passing Score</p>
                  <p className="text-lg font-bold text-gray-700">{university.passingScore}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
