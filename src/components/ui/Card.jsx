import { useNavigate } from "react-router-dom";
import Button from "./button";
import { Trash2 } from "lucide-react";

const Card = ({ id, image, title, date, content, author, className, imgStyle, handleClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${id}`, {
      state: { image, title, date, content, author },
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex flex-col rounded-lg shadow-md bg-white p-2 cursor-pointer hover:shadow-lg transition ${className}`}
    >
      {/* Image Section */}
      {image && (
        <div>
          <img
            src={image}
            alt={title}
            className={`${imgStyle} w-full h-64 object-cover rounded-lg`}
          />
        </div>
      )}

      {/* Text Section */}
      <div className="p-2 flex flex-col gap-2">
        <h3 className="font-mono font-semibold text-lg text-black">{title}</h3>
        <p className="text-gray-500 text-sm">{date}</p>

        {/* Content Preview */}
        {content && (
          <p className="text-gray-700 text-sm line-clamp-1">
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
          className="text-white rounded-full flex items-center justify-center ml-auto"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering card click
            handleClick();
          }}
        >
          <Trash2 className="w-4 h-4 stroke-red-400" />
        </Button>
      )}
    </div>
  );
};

export default Card;
