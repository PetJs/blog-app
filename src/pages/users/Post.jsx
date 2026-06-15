import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

function parseJSON(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

function blocksToBody(blocks) {
  return [...blocks]
    .sort((a, b) => a.position - b.position)
    .map((block) => {
      switch (block.type) {
        case "text":
          return { type: "paragraph", content: block.content };
        case "image": {
          const d = parseJSON(block.content, { src: block.content, caption: "" });
          return { type: "image", src: d.src, caption: d.caption };
        }
        case "audio": {
          const d = parseJSON(block.content, { label: "AUDIO", caption: "" });
          return { type: "audio", label: d.label, caption: d.caption };
        }
        case "gallery":
          return { type: "gallery", images: parseJSON(block.content, []) };
        case "list":
          return { type: "list", items: parseJSON(block.content, []) };
        case "blockquote":
          return { type: "blockquote", content: block.content };
        default:
          return null;
      }
    })
    .filter(Boolean);
}

function estimateReadTime(blocks) {
  const words = blocks
    .filter((b) => b.type === "text")
    .reduce((sum, b) => sum + (b.content || "").split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200)) + " MIN";
}

const AudioPlayer = ({ label, caption }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="border border-[var(--primary)] p-4 flex items-center gap-4 my-6">
      <button
        onClick={() => setPlaying(!playing)}
        className="w-10 h-10 bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center shrink-0 border-0 text-sm"
        style={{ minWidth: "2.5rem" }}
      >
        {playing ? "▐▐" : "▶"}
      </button>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wide mt-0.5">{caption}</p>
      </div>
    </div>
  );
};

const PostBody = ({ body }) => (
  <div className="space-y-6 text-sm leading-relaxed">
    {body.map((block, i) => {
      if (block.type === "paragraph") return <p key={i}>{block.content}</p>;

      if (block.type === "image")
        return (
          <div key={i} className="my-6">
            <img src={block.src} alt={block.caption} className="w-full object-cover" />
            {block.caption && (
              <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] mt-2">
                {block.caption}
              </p>
            )}
          </div>
        );

      if (block.type === "audio")
        return <AudioPlayer key={i} label={block.label} caption={block.caption} />;

      if (block.type === "gallery")
        return (
          <div key={i} className="grid grid-cols-2 gap-1 my-6">
            {block.images.map((img, j) => (
              <img key={j} src={img.src} alt={img.alt} className="w-full h-44 object-cover" />
            ))}
          </div>
        );

      if (block.type === "list")
        return (
          <ul key={i} className="space-y-1 pl-0">
            {block.items.map((item, j) => (
              <li key={j} className="text-sm">{item}</li>
            ))}
          </ul>
        );

      if (block.type === "blockquote")
        return (
          <blockquote key={i} className="border-l-4 border-[var(--primary)] pl-5 my-6">
            <p className="text-base font-bold italic leading-snug">{block.content}</p>
          </blockquote>
        );

      return null;
    })}
  </div>
);

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/posts/${slug}`)
      .then((res) => setPost(res.data))
      .catch(() => setError("POST_NOT_FOUND."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20">
        <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
          LOADING_POST...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-6xl mx-auto py-20">
        <p className="text-xs uppercase tracking-widest text-[var(--error)]">
          {error || "POST_NOT_FOUND."}
        </p>
      </div>
    );
  }

  const body = blocksToBody(post.blocks || []);
  const readTime = estimateReadTime(post.blocks || []);
  const publishedDate = post.created_at
    ? new Date(post.created_at).toISOString().slice(0, 10).replace(/-/g, ".")
    : "—";

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-3">
        <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
          PUBLISHED // {publishedDate}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs uppercase tracking-widest">EST. READ: {readTime}</p>
          <button className="text-xs uppercase tracking-widest px-3 py-1 border border-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]">
            READ ALOUD
          </button>
        </div>
      </div>

      <h1 className="font-black uppercase tracking-tight mb-4" style={{ lineHeight: 1.05 }}>
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="italic text-[var(--on-surface-variant)] text-sm mb-10 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      {post.cover_image && (
        <div className="mb-8">
          <img src={post.cover_image} alt={post.title} className="w-full object-cover" />
        </div>
      )}

      <PostBody body={body} />

      <hr className="border-[var(--primary)] my-10" />

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-6">
          <button className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 hover:underline">
            SHARE_LINK
          </button>
          <button className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 hover:underline">
            DOWNLOAD_PDF
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-widest font-bold">TAGS //</span>
          {["BRUTALISM", "CODE", "LOG_CORE"].map((tag) => (
            <span key={tag} className="bg-[var(--primary)] text-[var(--on-primary)] text-xs px-2 py-0.5 uppercase tracking-wide font-bold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
