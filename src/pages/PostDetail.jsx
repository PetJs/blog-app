import { useLocation, useParams } from "react-router-dom";
import { usePosts } from "../context/postContext";

const PostDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { posts } = usePosts(); // 👈 unpack correctly from context

  // Try location state first (from navigation), fallback to context
  const post = state || posts.find((p) => String(p.id) === id);

  if (!post) {
    return <p className="text-center text-red-500">Post not found.</p>;
  }

  // Map API fields to UI props
  const {
    image,
    title,
    date,
    content,
    author,
  } = post;

  console.log(post)

  return (
    <div className="p-6">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
        <p>
          By <span className="font-semibold">{author || "Unknown"}</span>
        </p>
        <span>•</span>
        <p>{date}</p>
      </div>

      <p className="text-lg leading-relaxed mb-12">{content}</p>
    </div>
  );
};

export default PostDetail;
