const Loader = () => {
  return (
    <div className="w-fit mx-auto flex items-center">
        <svg
        className="size-10 lg:size-20 animate-spin text-techmart-color"
        viewBox="0 0 24 24"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="60"
                strokeDashoffset="20"
            />
        </svg>
    </div>
  )
}

export default Loader
