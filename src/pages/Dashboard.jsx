// Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import ProfilePic from "../assets/pics/profile.jpg";
import Card from "../components/ui/Card";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts"); // ✅ relative path (baseURL handled in API.js)
        setPosts(res.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Hero / Header */}
      <header className="relative">
        <h2 className="text-xl lg:text-4xl w-[85vw] font-mono font-bold text-black p-6">
          Engage with ideas{" "}
          <span className="text-gray-300">
            that spark change and creativity. Stay informed on{" "}
          </span>
          what's shaping the world around you.{" "}
          <span className="text-gray-300">
            Discover the stories that
          </span>{" "}
          fuel inspiration and connection.
        </h2>

        {/* User profile */}
        <div className="absolute bottom-6 right-0 flex items-center gap-2 p-4">
          <img
            src={ProfilePic}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="font-semibold">Petyr</p>
        </div>
      </header>

      {/* Posts Section */}
      <section className="p-4">
        <div className="flex mx-auto justify-center items-center p-2">
          <h1 className="text-2xl lg:text-3xl font-bold">Latest Posts</h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                image={post.image_url || "https://via.placeholder.com/300"}
                title={post.title}
                content={post.content}
                author={post.user?.username}
                date={new Date(post.created_at).toDateString()}
                imgStyle="h-60"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
