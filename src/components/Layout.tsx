import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PlaylistMusicPlayer from './PlaylistMusicPlayer';
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppFloat from './WhatsAppFloat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
           <WhatsAppFloat />

      <PlaylistMusicPlayer />
    </div>
  );
};

export default Layout;