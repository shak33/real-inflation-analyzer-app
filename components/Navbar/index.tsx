"use client";

import Image from "next/image";
import Link from "next/link";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";

import { Button } from "../ui/button";

export const Navbar = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="flex justify-between items-center h-full py-3 px-8 border-b-[2px]">
      <Image
        src="/biedronka_logo_no_claim.png"
        alt="Biedronka logo"
        width="150"
        height="50"
      />
      <ul className="flex items-center gap-8">
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
      </ul>
    </div>
  )
}