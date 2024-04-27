"use client";
import { Menu, Transition } from '@headlessui/react'
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react'
import { TbLogout2, TbUserCircle } from "react-icons/tb";

const UserDropDown = (session: { session: Session }) => {
  const user = session.session.user;
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center gap-4 rounded-md px-4 py-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <div data-test-id = "username" className='text-nowrap text-white'>{user.name}</div>
            <img src={user.picture} alt="profile" className="w-10 h-10 rounded-full" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-secondary text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <TbUserCircle className="mr-2 h-7 w-7 fill-primary" />
                    {`${user.email} (${user.role})`}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-secondary text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                  >
                    <TbLogout2 className="mr-2 h-5 w-5 fill-primary" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default UserDropDown;