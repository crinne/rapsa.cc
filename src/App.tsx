import { Link } from "react-router-dom"


function App() {


  return (
    <div className="flex flex-col items-center bg-black h-screen">
      <h1 className="mt-20 text-3xl dark:text-yellow-500 font-bold">In Pixels we Trust</h1>
      <ul className="mt-32">
        <li><Link className="text-blue-600 dark:text-blue-500 hover:underline" to="/resizable-div">Resizable DIV</Link></li>
      </ul>
    </div>
  )
}

export default App