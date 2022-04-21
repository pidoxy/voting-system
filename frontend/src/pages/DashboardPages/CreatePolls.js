import { useState } from "react";

const CreatePolls = (props) => {
  const [checks, setChecks] = useState({
    students: false,
    teachers: false,
    boardMembers: false,
  });
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Create A Poll</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 space-y-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div>
            <label>Name Of Poll</label>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Poll Question"
              type="text"
              name="search"
            />
          </div>
          <div>
            <label className="px-3">Does This Poll Include Teachers?</label>
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="teachers"
              id="teachers"
              checked={checks.teachers}
              onClick={() =>
                setChecks({ ...checks, teachers: !checks.teachers })
              }
            />
          </div>
          <div>
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="students"
              id="students"
              checked={checks.students}
              onClick={() =>
                setChecks({ ...checks, students: !checks.students })
              }
            />
            <label className="px-3">Does This Poll Include Students?</label>
          </div>
          <div>
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="boardMembers"
              id="boardMembers"
              checked={checks.boardMembers}
              onClick={() =>
                setChecks({ ...checks, boardMembers: !checks.boardMembers })
              }
            />
            <label className="px-3">
              Does This Poll Include Board Members?
            </label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
          {/* <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div> */}
        </div>
      </main>
    </>
  );
};

export default CreatePolls;
