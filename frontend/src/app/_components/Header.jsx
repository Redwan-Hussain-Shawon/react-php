"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContex";
import axios from "../_utils/GlobalApi";

function Header() {
  const [navStatus, setNavStatus] = useState(false);
  const session = useSession();
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const getCartItem = async () => {
      if (session.data != null) {
        const email = session?.data?.user.email;
        try {
          const response = await axios.post("cartGet.php", { email });
          setCart(response?.data?.data);
        } catch (error) {
          console.error("Error fetching cart items", error);
        }
      }
    };
    getCartItem();
  }, [session.data]);
  return (
    <header className="bg-white py-2 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8px-4  ">
        <img src="/logo.svg" alt="logo" width={80} height={90} />

        <div className="flex flex-1 items-center justify-end md:justify-between ml-8">
          <nav aria-label="Global" className="">
            <ul
              className={`flex md:items-center gap-6 duration-300 text-sm ${
                navStatus
                  ? " w-full top-[80px] max-w-[300px]  bg-white border-r  h-full"
                  : " -top-80"
              } fixed md:static  left-0 flex-col md:flex-row  items-start justify-start px-5 py-8 md:py-0 md:px-0`}
            >
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Explore
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {session.data ? (
              <Link href="/cart" className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                ({cart?.length})
              </Link>
            ) : (
              <div className="h-[20px] animate-pulse rounded-sm w-[50px] bg-slate-200"></div>
            )}
            {session.data === null ? (
              <div className="sm:flex sm:gap-4">
                <Link
                  href="/login"
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                >
                  Login
                </Link>

                <Link
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-blue-600 sm:block"
                  href="/registration"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div
                onClick={() => signOut("google")}
                className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 cursor-pointer"
              >
                Logout
              </div>
            )}

            <button
              onClick={() => setNavStatus(true)}
              className={`${
                navStatus ? "hidden" : "block"
              }  rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setNavStatus(false)}
              className={`${
                navStatus ? "block" : "hidden"
              }  rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
