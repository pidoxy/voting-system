const Polls = (props) => {
  const polls = [
    { name: "Head Boy" },
    { name: "Head Of Department Science" },
    { name: "Vice Principal Academics" },
  ];

  const navigation = [
    { name: "All Polls", href: "/", current: true },
    { name: "My Polls", href: "/dashboard/create-poll", current: false },

  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Poll History</h1>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {polls.map((poll) => {
            <></>;
          })}
        </div>
      </main>
    </>
  );
};

export default Polls;
