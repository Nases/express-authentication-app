const CardHeader = ({ children }) => {
  return (
    <div className="bg-white px-6 py-5 border-b border-gray-100">
      <div className="flex items-center justify-between flex-wrap sm:flex-no-wrap">
        {children}
      </div>
    </div>
  )
}

export default CardHeader