const Card = ({ image, title, date, className, imgStyle }) => {
  return (
    <div
      className={`flex flex-col rounded-lg  p-2 ${className}`}
    >
      {/* Image Section */}
      <div className="">
        <img
          src={image}
          alt={title}
          className={`${imgStyle} w-full object-cover rounded-lg`}
        />
      </div>

      {/* Text Section */}
      <div className="p-3 flex flex-col">
        <h3 className="font-mono font-semibold text-lg text-black">
          {title}
        </h3>
        <p className="font-mono text-gray-500">{date}</p>
      </div>
    </div>
  )
}

export default Card
