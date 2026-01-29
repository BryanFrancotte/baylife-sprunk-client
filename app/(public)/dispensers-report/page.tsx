import Image from "next/image";
import Beams from "../../../components/dispensers-report/beams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function DispensersReportPage(){
  return (
    <div>
      <div className="fixed inset-0 -z-10" style={{ width: "100%", height: "100vh" }}>
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#57ff44"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="relative z-10 flex flex-col h-screen">
          <header className="flex justify-between items-center bg-background/20 backdrop-blur-xs p-4 shrink-0">
            <Link href="/">
              <Image
                src="/logos/Sprunk_Fuel_Logo.png"
                alt="logo-sprunk"
                width={150}
                height={150}
              />
            </Link>
          </header>
          <main className="flex-1 p-4 container mx-auto">
            <Card className="border-0 bg-background/30 backdrop-blur-sm mt-30 text-center">
              <CardHeader>
                <CardTitle>Entrez votre Numéro de téléphone pour afficher votre rapport</CardTitle>
              </CardHeader>
              <CardContent className="flex">
                <Input placeholder="Numero de téléphone" className="ml-4"/>
                <Button className="mx-4">
                  <Search />
                  Rechercher
                </Button>
              </CardContent>
            </Card>
          </main>
          <footer className="bg-background/10 backdrop-blur-xs p-2 text-center shrink-0">
            <p>&copy; 2025 Sprunk-Baylife. Tous droits réservés.</p>
          </footer>
        </div>
    </div>
  );
}

