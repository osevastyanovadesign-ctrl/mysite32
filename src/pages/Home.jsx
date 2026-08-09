import React from "react";
import { CartProvider } from "@/components/peek/CartContext";
import { LanguageProvider } from "@/components/peek/LanguageContext";
import RedThread from "@/components/peek/RedThread";
import Navbar from "@/components/peek/Navbar";
import Hero from "@/components/peek/Hero";
import Collection from "@/components/peek/Collection";
import BrandStory from "@/components/peek/BrandStory";
import Packaging from "@/components/peek/Packaging";
import Voice from "@/components/peek/Voice";
import Footer from "@/components/peek/Footer";
import CartDrawer from "@/components/peek/CartDrawer";

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
        <RedThread />
        <Navbar />
        <main>
          <Hero />
          <Collection />
          <BrandStory />
          <Packaging />
          <Voice />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  );
}