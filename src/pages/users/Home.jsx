import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import API from "../../api/axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("FAILED_TO_LOAD_POSTS."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="mb-12">
        <h1
          className="font-black uppercase tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1 }}
        >
          LATEST_LOGS
        </h1>
        <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] max-w-lg leading-relaxed">
          SYSTEM STATUS: NOMINAL. EXPLORING THE INTERSECTION OF ENGINEERING RIGOR AND MINIMALIST
          DESIGN. UPDATED INTERMITTENTLY FROM THE VOID.
        </p>
      </div>

      <div>
        {loading && (
          <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] py-10">
            LOADING_LOGS...
          </p>
        )}

        {error && (
          <p className="text-xs uppercase tracking-widest text-[var(--error)] py-10">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] py-10">
            NO_ENTRIES_FOUND.
          </p>
        )}

        {posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title || "UNTITLED"}
            desc={post.excerpt}
            date={
              post.created_at
                ? new Date(post.created_at).toISOString().slice(0, 10)
                : "—"
            }
            image={post.cover_image}
          />
        ))}

        {!loading && posts.length > 0 && <hr className="border-[var(--primary)]" />}
      </div>

      {!loading && posts.length > 0 && (
        <div className="flex justify-between items-center mt-8">
          <button className="flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest border-0 bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]">
            &#8592; PREV
          </button>
          <span className="text-xs font-bold uppercase tracking-widest">
            {posts.length} {posts.length === 1 ? "ENTRY" : "ENTRIES"}
          </span>
          <button className="flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest border-0 bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]">
            NEXT &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
