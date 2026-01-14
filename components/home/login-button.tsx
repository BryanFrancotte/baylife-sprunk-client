"use client";

import { SiDiscord } from "@icons-pack/react-simple-icons"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function LoginButton() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter()
  
  useEffect(() => {
    fetch("/api/auth/discord/me", {
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
      <Button variant="outline" onClick={() => router.push("/dispensers")}>
        <LayoutDashboard />
        Dashboard
      </Button>
    )
  }

  return(
    <Button asChild variant="outline">
      <a href="/api/auth/discord">
        <SiDiscord className="mr-2" />
        Login
      </a>
    </Button>
  )
}