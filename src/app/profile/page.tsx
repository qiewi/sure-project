'use client';

import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import Profile from '@Images/profile.jpg';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options); // Example: "May 14, 13:00"
};

interface User {
  name: string;
  email: string;
  picture?: string; // Optional field if the picture might not always be present
}

interface SavedResult {
  id: string;
  majorName: string;
  majorType: string;
  averageScore: number;
  createdAt: string;
  universityItems: Array<{ id: string; id_university: number; passingGrade: number; saved: boolean }>;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Fetch saved results
    const fetchSavedResults = async () => {
      try {
        const response = await fetch('/api/save-result', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setSavedResults(data);
        } else {
          console.error('Failed to fetch saved results');
        }
      } catch (error) {
        console.error('Error fetching saved results:', error);
      }
    };

    fetchUser();
    fetchSavedResults();
  }, []);

  const handleCardClick = async (savedResult: SavedResult) => {
    const { majorName, majorType, averageScore } = savedResult;
  
    try {
        const response = await fetch(
          `/api/universities?major_name=${majorName}&type=${majorType}&average=${averageScore}`
        );
        if (!response.ok) throw new Error('Failed to fetch universities');
        const universities = await response.json();
  
        // Navigate back to home with the required data
        router.push(
          `/home?major_name=${encodeURIComponent(majorName || '')}&universities=${encodeURIComponent(
            JSON.stringify(universities)
          )}&average_score=${averageScore}&major_type=${majorType}&saved=false`
        );
  
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
  };
  
  
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-6xl flex gap-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center flex-grow bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Profile</h2>
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <Image
                src={user?.picture || Profile}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full"
                width={160}
                height={160}
              />
            </div>
            <h3 className="text-xl font-semibold">{user?.name || 'User'}</h3>
            <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
            <div className="mt-6 bg-gray-50 text-black font-bold text-center text-xl rounded-xl py-4 px-8">
              {savedResults.length} University Searched
            </div>
          </div>

          {/* History Section */}
          <div className="flex-grow bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">History</h2>
            <div className="max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {savedResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl text-blue-600">📖</div>
                    <div>
                      <h3 className="font-semibold text-gray-700">{item.majorName}</h3>
                      <p className="text-sm text-gray-500">
                        {item.universityItems.length} University Recommendation
                      </p>
                      <p className="text-sm text-gray-400">{formatDateTime(item.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="text-2xl font-bold text-gray-800">{item.averageScore}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
