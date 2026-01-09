"use client";

import Link from "next/link"
import { Button } from "../../shared/shadcn/components/ui/button"
import { SiDiscord } from "@icons-pack/react-simple-icons"
import { useEffect, useState } from "react"
import { Spinner } from "../../shared/shadcn/components/ui/spinner"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { LayoutDashboard } from "lucide-react";

export function LoginButton() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter()
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/discord/me`, {
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      setAuthenticated(data.authenticated);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err)
      toast.error("An issue occured while checking for user session")
      setAuthenticated(false);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <Button variant="outline" disabled>
        <Spinner />
    </Button>
  );

  if(authenticated) {
    return (
      <Button variant="outline" onClick={() => router.push("/dispenser")}>
        <LayoutDashboard />
        Dashboard
      </Button>
    )
  }

  return(
    <Link href={`/api/auth/discord`}>
      <Button variant="outline">
        <SiDiscord />
        Login
      </Button>
    </Link>
  )
}