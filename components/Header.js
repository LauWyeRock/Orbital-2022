/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from "next/image"

import {
    SearchIcon,
    NewspaperIcon,
    MenuIcon,
    UploadIcon,
    TemplateIcon,
    UserCircleIcon,
    ChatAltIcon,
    MoonIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRecoilState } from 'recoil'
import { modalState } from "../atoms/modalAtom" 
import Link from "next/link";
import { useState } from "react";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const [comment, setComment] = useState("")

  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment("")

    router.push("/profile/" + commentToSend)
  }

  return (
    <div className="shadow-sm border-b bg-beige sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div onClick={() => router.push("/")} className="relative hidden lg:inline-grid w-24 cursor-pointer">
            <MoonIcon className='navBtn'/>
        </div>

        <div onClick={() => router.push("/")} className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image 
              src = "https://links.papareact.com/jjm"
              layout='fill'
              objectFit='contain'
              alt = ""
          />
        </div>
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
          <form>
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            
            <button type = "submit" disabled={!comment.trim()} onClick={sendComment}>
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </button>
            </div>

            
            <input className="bg-offwhite block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" 
            type='text' 
            placeholder='Search'
            value={comment}
            onChange={e => setComment(e.target.value)}
            />
            </form>

          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn"/>
          <MenuIcon className="h-6 md:hidden cursor-pointer"/>

        {session ? (
          <>
          <div className="relative navBtn">
            <ChatAltIcon onClick={() => router.push("/")} className="navBtn" />
            <div className="absolute -top-2 -right-1 text-xs w-5 h-5
             bg-red-500 rounded-full flex items-center justify-center animate-bounce text-white">3</div>
          </div>

          <UploadIcon onClick={() => setOpen(true)} className="navBtn" />
          <UserCircleIcon onClick={() => router.push("/profile/" + session.user.username)} className="navBtn" />
          <TemplateIcon onClick={() => router.push("/maincatalogue")} className="navBtn" />
          <NewspaperIcon onClick={() => router.push("/articles")} className="navBtn" />
          <ShoppingCartIcon onClick={() => router.push("/shop")} className="navBtn" />

          <img onClick={signOut} src = {session.user.image} 
          alt = "profile pic" 
          className='h-10 w-10 rounded-full cursor-pointer'    
          />
          </>
        ): (
          <button onClick={signIn}>Sign In</button>
        )}
          
        </div>
      </div>
    </div>
  )
}

export default Header