'use client';

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/shadcn/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../shared/shadcn/components/ui/button";
import { CalendarDays, TicketsPlane } from "lucide-react";

export default function PageContent() {
  const containerVariants ={
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }
  const itemVariants ={
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card - Left */}
          <Card className="border-0 shadow-lg bg-gradian-to-br from-background backdrop-blur-xs to-muted/20 h-full flex flex-col">
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
          <Card className="border-0 shadow-lg bg-gradian-to-br from-background backdrop-blur-s to-muted/20 h-full flex flex-col">
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
                  src="/placeholder.svg"
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
        >

        </motion.div>
      </motion.div>
    </div>
  )
}