import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import { PenIcon } from "lucide-react";
import Card from "../components/ui/Card";
import API from "../api/axios";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await API.get("/users/posts"); // ✅ token auto-injected
        setPosts(res.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Delete post
  async function deletePost(id) {
    try {
      await API.delete(`/posts/${id}`); // ✅ token auto-injected
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }

  if (loading) {
    return <p className="p-4">Loading your posts...</p>;
  }

  return (
    <div className="h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl lg:text-3xl font-bold">My Posts</h1>
        <Button
          className="rounded-lg flex items-center bg-black text-white hover:bg-gray-800"
          onClick={() => navigate("/create-post")} // 👈 go to create post page
        >
          <p>Write</p>
          <PenIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto h-[85vh]">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              image={post.image_url || "https://via.placeholder.com/300"}
              title={post.title}
              date={new Date(post.created_at).toDateString()}
              content={post.content}
              author={post.user?.username}
              className="m-4"
              handleClick={() => deletePost(post.id)}
            />
          ))
        ) : (
          <p className="text-gray-500">You haven’t written any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyPost;
