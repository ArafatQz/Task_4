const Button = () => {
  return (
    <button
      className="mb-6 px-4 py-1.5 text-sm rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-all duration-200"
    >
      <svg
        className="w-4 h-4 mr-1.5 inline-block align-middle"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Log in
    </button>  
  )

}

export default Button;