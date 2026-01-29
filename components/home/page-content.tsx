'use client';

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { CalendarDays, Fuel, IdCardLanyard, TicketsPlane } from "lucide-react";

export default function PageContent() {
  const containerVariants ={
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  }
  const itemVariants ={
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  return(
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6 max-w-7xl h-full"
      >
        {/* 2 Card layout */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card - Left */}
          <Card className="border-0 bg-gradian-to-br from-background backdrop-blur-xs to-muted/20 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-center">Planning &Eacute;vènements et Activtés</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground text-center flex-1">
                Découvrez notre calendrier d&apos;événements sportifs et d&apos;activités extrêmes. Consultez les prochaines sessions, compétitions et expériences à sensations fortes que nous organisons pour vous.
              </p>
              <div className="flex justify-center">
                <Image
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  src="/placeholder.svg"
                  alt="Envent planning"
                  width={500}
                  height={375}
                />
              </div>
              <div className="flex justify-center mt-auto pt-4">
                <Link href="/discover">
                  <Button size="sm" className="gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Consultez le planning
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Card - Right */}
          <Card className="border-0 bg-gradian-to-br from-background backdrop-blur-s to-muted/20 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-center">&Eacute;vènements / Activités sur demande</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground text-center flex-1">
                Réservez vos activités sportives et événements extrêmes sur mesure. Personnalisez votre expérience selon vos préférences et créez des moments inoubliables adaptés à vos besoins.
              </p> 
              <div className="flex justify-center">
                <Image
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  src="/home-page/sprunk-karting.png"
                  alt="Book Activity"
                  width={500}
                  height={375}
                />
              </div>
              <div className="flex justify-center mt-auto pt-4">
                <Link href="/discover">
                  <Button size="sm" className="gap-2">
                    <TicketsPlane className="w-4 h-4" />
                    Consulté le catalogue
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="border-0 mt-4 bg-gradian-to-br from-background backdrop-blur-s to-muted/50 h-full">
            <CardContent className="justify-items-center">
              <div className="content-center">
                <CardTitle>Partagez l&apos;essence de la vie avec les distributeurs Sprunk Fuel</CardTitle>
              </div>
              <div className="py-4">
                <Link href="dispensers-report">
                  <Button>
                    <Fuel />
                    Consultez vos distributeurs
                  </Button>
                </Link>
              </div>
              <div className="text-xs text-center">
                Passez sur notre Radio D pour demander votre distributeur dès maintenant
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 mt-4 bg-gradian-to-br from-background backdrop-blur-s to-muted/50 h-full">
            <CardContent className="justify-items-center">
              <div className="justify-items-center content-center">
                <CardTitle>Rejoignez le Sprunk Crew</CardTitle>
              </div>
              <div className="py-4">
                <Link href="/crew-pass">
                  <Button>
                    <IdCardLanyard />
                    Vers le Sprunk Pass
                  </Button>
                </Link>
              </div>
              <div className="text-xs text-center">
                Passez la vitesse supérieur sur nos events avec des récompenses Sprunk surchargé d&apos;adrénaline
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}