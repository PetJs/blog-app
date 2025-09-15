import Button from "./button";
import { Trash2 } from "lucide-react";

const Card = ({ image, title, date, content, author, className, imgStyle, handleClick }) => {
  return (
    <div className={`flex flex-col rounded-lg shadow-md bg-white p-2 ${className}`}>
      {/* Image Section */}
      {image && (
        <div>
          <img
            src={image}
            alt={title}
            className={`${imgStyle} w-full object-cover rounded-lg`}
          />
        </div>
      )}

      {/* Text Section */}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-mono font-semibold text-lg text-black">{title}</h3>
        <p className="text-gray-500 text-sm">{date}</p>

        {/* Content Preview */}
        {content && (
          <p className="text-gray-700 text-sm line-clamp-3">
            {content}
          </p>
        )}

        {/* Author */}
        {author && (
          <p className="text-xs text-gray-400 italic mt-1">By {author}</p>
        )}
      </div>

      {/* Optional Delete Button */}
      {handleClick && (
        <Button
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 w-fit ml-auto"
          onClick={handleClick}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default Card;
