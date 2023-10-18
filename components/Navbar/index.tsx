"use client";

import Image from "next/image";
import Link from "next/link";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import { Button } from "../ui/button";

export const Navbar = () => {
  const registerModal = useRegisterModal();

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
        <li className="hover:underline">
          <Button onClick={registerModal.openModal}>
            Register
          </Button>
        </li>
      </ul>
    </div>
  )
}