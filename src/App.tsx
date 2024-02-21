import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen bg-gray-950">
      <div className="p-2">
        <header className="border-b mt-2 border-gray-700 pb-2">
          <h1 className="flex text-3xl dark:text-neutral-200 font-normal">
            In Pi<span className="block dark:text-neutral-100 origin-bottom-left rotate-12 mr-1">x</span>els we Trust
          </h1>
          <p className="text-sm dark:text-neutral-500 font-thin">My Dev Log</p>
        </header>

        <ul className="">
          <li className="mt-20">
            <h3 className="dark:text-neutral-300 font-semibold cursor-pointer"
              onClick={() => navigate("/resizable-div")}
            >Auto reload GO app with Makefile</h3>
            <span className="text-xs dark:text-neutral-500 font-thin">2024-02-21</span>
            <div className="mt-4">
              <p className="text-sm font-light dark:text-neutral-400">
                I really loved the dev experience we have with nodeJS. I wanted something similar for GO.
              </p>
            </div>
            <Link className="cursor-pointer mt-2 flex dark:text-neutral-400 dark:hover:text-neutral-300" 
              to="/makefile-for-go">
              <span className="text-sm border-b border-b-current flex gap-2">
                Continue reading
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Link>
          </li>
          <li className="mt-20">
            <h3 className="dark:text-neutral-300 font-semibold cursor-pointer"
              onClick={() => navigate("/resizable-div")}
            >Resizable DIV</h3>
            <span className="text-xs dark:text-neutral-500 font-thin">2024-02-12</span>
            <div className="mt-4">
              <p className="text-sm font-light dark:text-neutral-400">
                Learnings from Implementing a Resizable Div Element via Dragging.
              </p>
            </div>
            <Link className="cursor-pointer mt-2 flex dark:text-neutral-400 dark:hover:text-neutral-300" to="/resizable-div">
              <span className="text-sm border-b border-b-current flex gap-2">
                Continue reading
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App