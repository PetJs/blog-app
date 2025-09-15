import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import API from "../api/axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/posts", {
        title,
        image_url: imageUrl,
        content,
      });
      navigate("/myposts"); // 👈 redirect back
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Write a New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-4 bg-white shadow-md rounded-lg p-6"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Image URL</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-gray-400"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Content</label>
          <textarea
            className="border border-gray-300 rounded-lg p-2 h-40 resize-none focus:outline-none focus:ring focus:ring-gray-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-black text-white rounded-lg hover:bg-gray-800 w-fit px-6 py-2"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
