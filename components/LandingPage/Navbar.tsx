'use client'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FileText, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function Navbar() {
  const {data:session,status} = useSession();
  
  const userImg = session?.user?.image || undefined;
  
  return (
    <>
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF9494] to-[#FFD1D1]">
            <span className="text-sm font-bold text-white">F</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">FormAI</span>
        </div>
        <div className="flex items-center space-x-3">
          {status === "authenticated" ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={userImg} 
                    alt={session?.user?.name || "User"} 
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{session.user?.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>My Forms</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="">
                <Link className="flex items-center" href={"/api/auth/signout"}>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="ml-2 ">Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <Link href="/signin" className="text-gray-600 hover:text-gray-900">
              <Button variant="ghost">Sign In</Button>
            </Link>
          )}
           <Button className={`bg-gray-900 hover:bg-gray-800 text-white rounded-md ${status === "authenticated" ? "hidden" : ""}`}>Get started</Button>
        </div>
      </div>
    </nav>
    </>
  )
}
