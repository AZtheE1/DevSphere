'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useGlobalStore } from '@/store/useGlobalStore';
import { LoginHero } from '@/components/LoginHero';
import { NavigationShell } from '@/components/NavigationShell';
import { DockBar } from '@/components/DockBar';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated, setXP, setStreakDays } = useGlobalStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setXP(data.xp || 0);
            setStreakDays(data.streakDays || 1);
          } else {
            // Initialize new user profile
            await setDoc(userRef, { 
              email: user.email, 
              xp: 0, 
              streakDays: 1, 
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp()
            });
            setXP(0);
            setStreakDays(1);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [setIsAuthenticated, setXP, setStreakDays]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-cream min-h-screen">
        <div className="w-16 h-16 rounded-full border-[4px] border-ink shadow-neo-sm overflow-hidden bg-white mb-6 relative">
           <Image src="/logo.svg" alt="Loading" fill className="object-cover animate-pulse" />
        </div>
        <Loader2 className="w-8 h-8 text-ink animate-spin" />
        <p className="mt-4 font-heading font-black text-ink">Loading Doodle Land...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginHero />;
  }

  return (
    <>
      <NavigationShell />
      <main className="flex-1 pb-24">{children}</main>
      <DockBar />
    </>
  );
};
