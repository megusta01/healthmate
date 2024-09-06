import React from 'react';
import HeaderLP from '../components/home/HeaderLP';
import Welcome from '@/components/home/Welcome';
import Features from '@/components/home/Features';
import Guide from '@/components/home/Guide';
import Benefits from '@/components/home/Benefits';
import Future from '@/components/home/Future';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="">
        {/* Header */}
        <HeaderLP />

        {/* Hero Section */}
        <Welcome />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <Guide />

        {/* Benefits Section */}
        <Benefits />

        {/* Future Features Section */}
        <Future />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
