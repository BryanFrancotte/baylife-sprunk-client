'use client';
import Image from "next/image";
import LaserFlow from "./modules/shared/shadcn/components/LaserFlow";

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
        <div className="relative z-10 flex flex-col min-h-screen">
          <header className="flex bg-background/20 backdrop-blur-xs p-4">
            <Image
              src="/logos/Sprunk_Fuel_Logo.png"
              alt="logo-sprunk"
              width={150}
              height={150}
            />
          </header>
          <main className="flex-1 p-4 container mx-auto">
            test
          </main>
          <footer className="bg-background/10 backdrop-blur-xs p-2 text-center">
            <p>&copy; 2025 Sprunk-Baylife. Tous droits réservés.</p>
          </footer>
        </div>
      </div>
      
    </main>
  );
}
