const Loader = () => {
  return (
    <div className="w-fit mx-auto">
        <svg
        className="size-20 lg:size-30 animate-spin text-techmart-color"
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
