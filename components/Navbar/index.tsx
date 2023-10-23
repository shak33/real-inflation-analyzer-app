"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";

import { Role, User } from "@prisma/client";

import { AiOutlineMenu } from 'react-icons/ai';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  currentUser?: User | null;
}

export const Navbar:React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center h-full py-3 px-8 border-b-[2px]">
      <Image
        src="/biedronka_logo_no_claim.png"
        alt="Biedronka logo"
        width="150"
        height="50"
      />
      <ul className="flex items-center gap-8 relative">
        <li className="hover:underline">
          <Link href="/admin/companies">
            Companies
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/admin/products">
            Products
          </Link>
        </li>
        {currentUser?.role === Role.ADMIN ?
          <li className="hover:underline">
            <Link href="/admin/users">
              Users
            </Link>
          </li>
        : null}
        {!currentUser ?
          <div className="flex gap-2">
            <li>
              <Button onClick={registerModal.openModal}>
                Register
              </Button>
            </li>
            <li>
              <Button onClick={loginModal.openModal}>
                Login
              </Button>
            </li>
          </div>
          : <div
              className="p-4 md:py-1 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              onClick={toggleOpen}
            >
            <AiOutlineMenu />
            <Avatar>
              <AvatarImage
                src={currentUser?.image || '/user-no-image.jpg'}
                alt="User avatar"
              />
            </Avatar>
          </div>}
          {isOpen && currentUser ?
            <div
              className="absolute reounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm border-b-[1px]"
            >
              <div className="flex flex-col cursor-pointer">
                <div className="py-2 px-4 hover:bg-neutral-100 transition">
                  <button onClick={() => signOut()}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          : null}
      </ul>
    </div>
  )
}