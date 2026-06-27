import { useEffect, useRef, useState } from "react";
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
          return { type: "audio", label: d.label, caption: d.caption, src: block.original_audio_url };
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

const AudioPlayer = ({ label, caption, src }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <div className="border border-[var(--primary)] p-4 flex items-center gap-4 my-6">
      <button
        onClick={toggle}
        className="w-10 h-10 bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center shrink-0 border-0 text-sm"
        style={{ minWidth: "2.5rem" }}
      >
        {playing ? "▐▐" : "▶"}
      </button>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest">{label}</p>
        {caption && (
          <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wide mt-0.5">
            {caption}
          </p>
        )}
      </div>
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  );
};

// ── Voice bar shown at top when a voice mode is active ──────────────────────

const VoiceBar = ({ mode, aiUrl, creatorUrls, onClose }) => {
  const audioRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const urls = mode === "ai" ? [aiUrl] : creatorUrls;
  const currentUrl = urls[idx];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentUrl) {
      audio.src = currentUrl;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [currentUrl]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const handleEnded = () => {
    if (idx < urls.length - 1) {
      setIdx((i) => i + 1);
    } else {
      setPlaying(false);
    }
  };

  const modeLabel =
    mode === "ai"
      ? "AI_VOICE // READ_ALOUD"
      : `CREATOR_VOICE${urls.length > 1 ? ` // PART ${idx + 1} OF ${urls.length}` : ""}`;

  return (
    <div className="sticky top-0 z-10 border-b border-[var(--on-primary)] bg-[var(--primary)] text-[var(--on-primary)] px-6 py-3 flex items-center gap-4">
      <button
        onClick={toggle}
        className="w-8 h-8 shrink-0 border border-[var(--on-primary)] flex items-center justify-center text-sm bg-transparent text-[var(--on-primary)]"
      >
        {playing ? "▐▐" : "▶"}
      </button>
      <p className="flex-1 text-[10px] uppercase tracking-widest opacity-80">{modeLabel}</p>
      <button
        onClick={onClose}
        className="text-xs font-bold uppercase tracking-widest border border-[var(--on-primary)] px-3 py-1 bg-transparent text-[var(--on-primary)] hover:bg-[var(--on-primary)] hover:text-[var(--primary)]"
      >
        ✕ STOP
      </button>
      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleEnded}
      />
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
        return <AudioPlayer key={i} label={block.label} caption={block.caption} src={block.src} />;

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
  const [voiceMode, setVoiceMode] = useState(null); // null | "ai" | "creator"

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

  const creatorAudioUrls = (post.blocks || [])
    .filter((b) => b.original_audio_url)
    .sort((a, b) => a.position - b.position)
    .map((b) => b.original_audio_url);
  const hasCreatorVoice = creatorAudioUrls.length > 0;
  const hasAIVoice = !!post.elevenlabs_audio_url;

  return (
    <div className="max-w-6xl mx-auto py-10">
      {/* Voice bar — shown when a mode is active */}
      {voiceMode && (
        <VoiceBar
          mode={voiceMode}
          aiUrl={post.elevenlabs_audio_url}
          creatorUrls={creatorAudioUrls}
          onClose={() => setVoiceMode(null)}
        />
      )}

      <div className="flex justify-between items-start mb-8 flex-wrap gap-3">
        <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
          PUBLISHED // {publishedDate}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-xs uppercase tracking-widest">EST. READ: {readTime}</p>

          {/* READ ALOUD — always shown if AI audio exists, or as fallback */}
          {(hasAIVoice || (!hasAIVoice && !hasCreatorVoice)) && (
            <button
              onClick={() =>
                hasAIVoice ? setVoiceMode(voiceMode === "ai" ? null : "ai") : undefined
              }
              disabled={!hasAIVoice}
              className={`text-xs uppercase tracking-widest px-3 py-1 border border-[var(--primary)] ${
                voiceMode === "ai"
                  ? "bg-[var(--primary)] text-[var(--on-primary)]"
                  : "bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              ▶ READ ALOUD
            </button>
          )}

          {/* READ WITH CREATOR VOICE — only if post has recorded audio blocks */}
          {hasCreatorVoice && (
            <button
              onClick={() => setVoiceMode(voiceMode === "creator" ? null : "creator")}
              className={`text-xs uppercase tracking-widest px-3 py-1 border border-[var(--primary)] ${
                voiceMode === "creator"
                  ? "bg-[var(--primary)] text-[var(--on-primary)]"
                  : "bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
              }`}
            >
              ▶ READ WITH CREATOR VOICE
            </button>
          )}
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
