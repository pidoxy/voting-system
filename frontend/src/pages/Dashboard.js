import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FaWallet } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import Polls from "./DashboardPages/Polls";
import CreatePolls from "./DashboardPages/CreatePolls";
import { useState } from "react";
import { useEffect } from "react";
import OngoingPolls from "./DashboardPages/onGoingPoll";

const Dashboard = (props) => {
  const { currentAccount, contract, admin, disconnectWallet } = props;
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/", current: true },
    { name: "Create A Poll", href: "/dashboard/create-poll", current: false },
    { name: "Polls", href: "/dashboard/polls", current: false },
  ]);

  const poll = { number: 14 };

  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  useEffect(() => {
    !admin
      ? setNavigation([
          { name: "Dashboard", href: "/", current: true },
          { name: "Polls", href: "/dashboard/polls", current: false },
        ])
      : setNavigation([
          { name: "Dashboard", href: "/", current: true },
          {
            name: "Create A Poll",
            href: "/dashboard/create-poll",
            current: false,
          },
          { name: "Polls", href: "/dashboard/polls", current: false },
        ]);
    
  }, [admin]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <div className="hidden md:flex self-center  md:ml-10 md:pr-4 md:space-x-8">
                        <button className="font-medium outline-none text-gray-500 hover:text-gray-900 flex">
                          <FaWallet className="h-6 w-6 mr-2" />
                          {`${currentAccount.slice(
                            0,
                            4
                          )}... ${currentAccount.slice(-4)}`}
                          {/* {console.log(currentAccount)} */}
                        </button>
                        <button onClick={disconnectWallet} className="font-medium outline-none text-indigo-500 hover:text-gray-900 flex">
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="bg-white shadow">
                  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Dashboard
                    </h1>
                  </div>
                </header>
                <main>
                  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                      <div className="border-4 flex items-center text-2xl justify-center border-dashed border-gray-200 rounded-lg h-96" >
                          There's no ongoing voting
                          </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </main>
              </>
            }
          />
          <Route path="/polls" element={<Polls />} />
          <Route path="/poll/:poll" element={<OngoingPolls />} />
          <Route path="/create-poll" element={<CreatePolls />} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
