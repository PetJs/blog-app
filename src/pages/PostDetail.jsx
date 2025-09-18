import { useLocation, useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { image, title, date, content, author } = state || {};

  if (!state) {
    return <p className="text-center text-red-500">Post not found.</p>;
  }

  return (
    <div className=" p-6">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
        <p>By <span className="font-semibold">{author}</span></p>
        <span>•</span>
        <p>{date}</p>
      </div>

      <p className="text-lg leading-relaxed mb-12">{content}</p>
    </div>
  );
};

export default PostDetail;
