'use client';
import Image from "next/image";
import PageContent from "../components/home/page-content";
import { LoginButton } from "../components/home/login-button";
import LaserFlow from "@/components/home/LaserFlow";

export default function Home() {

  return (
    <main>
      <div className="relative min-h-screen">
        {/* Background Layer */}
        <div className="fixed inset-0 -z-10">
          <LaserFlow
            style={{ width: "100%", height: "100%" }}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.45}
            color="39DA2C"
          />
        </div>
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-screen">
          <header className="flex justify-between items-center bg-background/20 backdrop-blur-xs p-4 shrink-0">
            <Image
              src="/logos/Sprunk_Fuel_Logo.png"
              alt="logo-sprunk"
              width={150}
              height={150}
            />
            <div className="flex flex-col items-end gap-2">
              <LoginButton />
            </div>
          </header>
          <main 
            className="
              flex-1 p-4 container mx-auto overflow-auto 
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:rounded
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded
              [&::-webkit-scrollbar-thumb]:bg-primary
              dark:[&::-webkit-scrollbar-track]:bg-neutral-700
              dark:[&::-webkit-scrollbar-thumb]:bg-primary"
          >
            <PageContent />
          </main>
          <footer className="bg-background/10 backdrop-blur-xs p-2 text-center shrink-0">
            <p>&copy; 2025 Sprunk-Baylife. Tous droits réservés.</p>
          </footer>
        </div>
      </div>
      
    </main>
  );
}
