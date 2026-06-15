import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseJSON(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function getDefaultContent(type) {
  const defaults = {
    text: "",
    image: JSON.stringify({ src: "", caption: "" }),
    audio: JSON.stringify({ label: "", caption: "" }),
    gallery: JSON.stringify([]),
    list: JSON.stringify([""]),
    blockquote: "",
  };
  return defaults[type] ?? "";
}

async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await API.post("/upload", fd);
  return res.data.url;
}

// ─── Block editor sub-components ─────────────────────────────────────────────

const TextEditor = ({ block, onSave }) => {
  const [val, setVal] = useState(block.content);
  return (
    <textarea
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => onSave(val)}
      placeholder="START TYPING..."
      rows={3}
      className="w-full bg-transparent border-0 border-b border-dashed border-[var(--outline-variant)] text-sm leading-relaxed resize-none outline-none py-1 placeholder:text-[var(--outline-variant)]"
    />
  );
};

const ImageEditor = ({ block, onSave }) => {
  const [data, setData] = useState(() => parseJSON(block.content, { src: "", caption: "" }));
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(null);
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      const url = await uploadFile(file);
      const next = { ...data, src: url };
      setData(next);
      onSave(JSON.stringify(next));
    } catch {
      setErr("UPLOAD_FAILED.");
    } finally {
      setUploading(false);
    }
  };

  const handleCaptionBlur = () => onSave(JSON.stringify(data));

  if (!data.src) {
    return (
      <div>
        {err && <p className="text-xs text-[var(--error)] mb-2">{err}</p>}
        <input type="file" ref={fileRef} onChange={handleFile} accept="image/*" className="hidden" />
        <button
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="w-full border border-dashed border-[var(--outline)] p-10 text-xs uppercase tracking-widest text-[var(--on-surface-variant)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          {uploading ? "UPLOADING..." : "+ ADD_IMAGE"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative group/img">
        <img src={data.src} alt={data.caption} className="w-full object-cover" />
        <label className="absolute bottom-2 right-2 cursor-pointer text-xs uppercase tracking-widest px-3 py-1 bg-[var(--primary)] text-[var(--on-primary)] opacity-0 group-hover/img:opacity-100 transition-opacity">
          CHANGE
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      </div>
      <input
        type="text"
        value={data.caption}
        onChange={(e) => setData((p) => ({ ...p, caption: e.target.value }))}
        onBlur={handleCaptionBlur}
        placeholder="ADD_CAPTION_OPTIONAL"
        className="w-full text-xs uppercase tracking-widest mt-2 bg-transparent border-0 outline-none text-[var(--on-surface-variant)] placeholder:text-[var(--outline-variant)]"
      />
    </div>
  );
};

const AudioEditor = ({ block, onSave }) => {
  const [data, setData] = useState(() => parseJSON(block.content, { label: "", caption: "" }));
  const [uploading, setUploading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [err, setErr] = useState(null);
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErr(null);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const [uploadRes, transcribeRes] = await Promise.allSettled([
        API.post("/upload", fd),
        API.post("/transcribe", fd),
      ]);

      const audioUrl = uploadRes.status === "fulfilled" ? uploadRes.value.data.url : "";
      const transcript =
        transcribeRes.status === "fulfilled" ? transcribeRes.value.data.transcript : "";

      const next = { label: file.name.toUpperCase(), caption: transcript };
      setData(next);
      onSave(JSON.stringify(next), { original_audio_url: audioUrl });
    } catch {
      setErr("UPLOAD_FAILED.");
    } finally {
      setUploading(false);
      setTranscribing(false);
    }
  };

  if (!data.label) {
    return (
      <div>
        {err && <p className="text-xs text-[var(--error)] mb-2">{err}</p>}
        <input type="file" ref={fileRef} onChange={handleFile} accept="audio/*" className="hidden" />
        <button
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="w-full border border-dashed border-[var(--outline)] p-10 text-xs uppercase tracking-widest text-[var(--on-surface-variant)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          {uploading ? "UPLOADING + TRANSCRIBING..." : "+ ADD_AUDIO"}
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[var(--primary)] p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 shrink-0 bg-[var(--primary)] flex items-center justify-center text-[var(--on-primary)] text-xs">▶</div>
        <p className="text-xs font-bold uppercase tracking-widest">{data.label}</p>
      </div>
      <textarea
        value={data.caption}
        onChange={(e) => setData((p) => ({ ...p, caption: e.target.value }))}
        onBlur={() => onSave(JSON.stringify(data))}
        placeholder="TRANSCRIPT / CAPTION..."
        rows={3}
        className="w-full text-xs bg-[var(--surface-container-low)] p-3 border-0 outline-none font-mono resize-none"
      />
      <label className="mt-2 inline-block cursor-pointer text-xs uppercase tracking-widest text-[var(--on-surface-variant)] hover:underline">
        REPLACE_AUDIO
        <input type="file" accept="audio/*" onChange={handleFile} className="hidden" />
      </label>
    </div>
  );
};

const GalleryEditor = ({ block, onSave }) => {
  const [images, setImages] = useState(() => parseJSON(block.content, []));
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (f) => ({ src: await uploadFile(f), alt: f.name }))
      );
      const next = [...images, ...uploaded];
      setImages(next);
      onSave(JSON.stringify(next));
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx) => {
    const next = images.filter((_, i) => i !== idx);
    setImages(next);
    onSave(JSON.stringify(next));
  };

  return (
    <div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-1 mb-3">
          {images.map((img, i) => (
            <div key={i} className="relative group/gimg">
              <img src={img.src} alt={img.alt} className="w-full h-40 object-cover" />
              <button
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-[var(--primary)] text-[var(--on-primary)] text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover/gimg:opacity-100 border-0 leading-none"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <input type="file" ref={fileRef} onChange={handleFiles} accept="image/*" multiple className="hidden" />
      <button
        onClick={() => fileRef.current.click()}
        disabled={uploading}
        className="text-xs uppercase tracking-widest border border-dashed border-[var(--outline)] px-4 py-2 hover:border-[var(--primary)]"
      >
        {uploading ? "UPLOADING..." : "+ ADD_IMAGES"}
      </button>
    </div>
  );
};

const ListEditor = ({ block, onSave }) => {
  const [items, setItems] = useState(() => parseJSON(block.content, [""]));

  const update = (i, val) => setItems((prev) => prev.map((x, j) => (j === i ? val : x)));
  const add = () => setItems((prev) => [...prev, ""]);
  const remove = (i) => setItems((prev) => prev.filter((_, j) => j !== i));
  const flush = () => onSave(JSON.stringify(items.filter((x) => x.trim())));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-[var(--on-surface-variant)] shrink-0">-</span>
          <input
            type="text"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            onBlur={flush}
            placeholder="LIST_ITEM..."
            className="flex-1 text-sm bg-transparent border-0 border-b border-dashed border-[var(--outline-variant)] outline-none py-1 placeholder:text-[var(--outline-variant)]"
          />
          <button
            onClick={() => { remove(i); flush(); }}
            className="text-xs text-[var(--on-surface-variant)] border-0 bg-transparent p-0 hover:text-[var(--error)]"
          >
            ✕
          </button>
        </div>
      ))}
      <button onClick={add} className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 text-[var(--on-surface-variant)] hover:text-[var(--primary)]">
        + ADD_ITEM
      </button>
    </div>
  );
};

const BlockquoteEditor = ({ block, onSave }) => {
  const [val, setVal] = useState(block.content);
  return (
    <div className="border-l-4 border-[var(--primary)] pl-5">
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={() => onSave(val)}
        placeholder='"ENTER QUOTE HERE"'
        rows={2}
        className="w-full text-base font-bold italic bg-transparent border-0 outline-none resize-none leading-snug placeholder:text-[var(--outline-variant)] placeholder:not-italic"
      />
    </div>
  );
};

// ─── Block wrapper ────────────────────────────────────────────────────────────

const BLOCK_LABELS = {
  text: "TEXT",
  image: "IMAGE",
  audio: "AUDIO",
  gallery: "GALLERY",
  list: "LIST",
  blockquote: "QUOTE",
};

const BlockEditor = ({ block, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const id = block.id ?? block.tempId;

  const editors = {
    text: <TextEditor block={block} onSave={(c) => onUpdate(id, c)} />,
    image: <ImageEditor block={block} onSave={(c) => onUpdate(id, c)} />,
    audio: <AudioEditor block={block} onSave={(c, ex) => onUpdate(id, c, ex)} />,
    gallery: <GalleryEditor block={block} onSave={(c) => onUpdate(id, c)} />,
    list: <ListEditor block={block} onSave={(c) => onUpdate(id, c)} />,
    blockquote: <BlockquoteEditor block={block} onSave={(c) => onUpdate(id, c)} />,
  };

  return (
    <div className="group/block relative pt-6">
      {/* Type label */}
      <span className="absolute top-0 left-0 text-[10px] uppercase tracking-widest text-[var(--outline-variant)] opacity-0 group-hover/block:opacity-100 transition-opacity select-none">
        [{BLOCK_LABELS[block.type] ?? block.type}]
      </span>

      {/* Controls */}
      <div className="absolute top-5 -right-24 flex flex-col gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity">
        {!isFirst && (
          <button onClick={onMoveUp} className="w-7 h-7 text-xs border border-[var(--primary)] bg-[var(--on-primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] flex items-center justify-center">
            ↑
          </button>
        )}
        {!isLast && (
          <button onClick={onMoveDown} className="w-7 h-7 text-xs border border-[var(--primary)] bg-[var(--on-primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] flex items-center justify-center">
            ↓
          </button>
        )}
        <button onClick={onDelete} className="w-7 h-7 text-xs border border-[var(--error)] bg-[var(--on-primary)] text-[var(--error)] hover:bg-[var(--error)] hover:text-[var(--on-primary)] flex items-center justify-center">
          ✕
        </button>
      </div>

      {editors[block.type] ?? (
        <p className="text-xs text-[var(--on-surface-variant)]">UNKNOWN: {block.type}</p>
      )}
    </div>
  );
};

// ─── Add block toolbar ────────────────────────────────────────────────────────

const BLOCK_TYPES = ["text", "image", "audio", "gallery", "list", "blockquote"];

const AddBlockToolbar = ({ onAdd }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {BLOCK_TYPES.map((type) => (
      <button
        key={type}
        onClick={() => onAdd(type)}
        className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
      >
        + {BLOCK_LABELS[type]}
      </button>
    ))}
  </div>
);

// ─── Main Editor ──────────────────────────────────────────────────────────────

const Editor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [publishedOk, setPublishedOk] = useState(false);
  const metaTimerRef = useRef(null);

  // ── Init
  useEffect(() => {
    const init = async () => {
      try {
        if (slug === "new") {
          const res = await API.post("/posts");
          setPost(res.data);
          setBlocks([]);
          navigate(`/admin/editor/${res.data.slug}`, { replace: true });
        } else {
          const res = await API.get(`/posts/${slug}`);
          setPost(res.data);
          setBlocks((res.data.blocks || []).slice().sort((a, b) => a.position - b.position));
        }
      } catch {
        setError("FAILED_TO_LOAD_POST.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ── Debounced metadata save
  const scheduleSave = useCallback(
    (patch) => {
      if (!post?.id) return;
      clearTimeout(metaTimerRef.current);
      setSaving(true);
      metaTimerRef.current = setTimeout(async () => {
        try {
          await API.patch(`/posts/${post.id}`, patch);
        } catch {
          setError("AUTO_SAVE_FAILED.");
        } finally {
          setSaving(false);
        }
      }, 1000);
    },
    [post?.id]
  );

  const handleField = (field) => (e) => {
    setPost((p) => ({ ...p, [field]: e.target.value }));
    scheduleSave({ [field]: e.target.value });
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !post?.id) return;
    setSaving(true);
    try {
      const url = await uploadFile(file);
      setPost((p) => ({ ...p, cover_image: url }));
      await API.patch(`/posts/${post.id}`, { cover_image: url });
    } catch {
      setError("COVER_UPLOAD_FAILED.");
    } finally {
      setSaving(false);
    }
  };

  // ── Block operations
  const addBlock = async (type) => {
    const tempId = `temp_${Date.now()}`;
    const content = getDefaultContent(type);
    const position = blocks.length;
    setBlocks((prev) => [...prev, { tempId, type, content, position }]);
    try {
      const res = await API.post(`/posts/${post.id}/blocks`, { type, content, position });
      setBlocks((prev) => prev.map((b) => (b.tempId === tempId ? res.data : b)));
    } catch {
      setError("ADD_BLOCK_FAILED.");
      setBlocks((prev) => prev.filter((b) => b.tempId !== tempId));
    }
  };

  const updateBlock = useCallback(async (id, content, extra = {}) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id || b.tempId === id) ? { ...b, content, ...extra } : b)
    );
    if (String(id).startsWith("temp_")) return;
    try {
      await API.patch(`/blocks/${id}`, { content, ...extra });
    } catch {
      setError("BLOCK_SAVE_FAILED.");
    }
  }, []);

  const deleteBlock = async (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id && b.tempId !== id));
    if (String(id).startsWith("temp_")) return;
    try {
      await API.delete(`/blocks/${id}`);
    } catch {
      setError("DELETE_BLOCK_FAILED.");
    }
  };

  const moveBlock = async (id, dir) => {
    const idx = blocks.findIndex((b) => b.id === id || b.tempId === id);
    if ((dir === "up" && idx === 0) || (dir === "down" && idx === blocks.length - 1)) return;
    const next = [...blocks];
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    next.forEach((b, i) => { b.position = i; });
    setBlocks(next);
    const a = next[idx];
    const bk = next[swapIdx];
    if (a.id && bk.id) {
      try {
        await Promise.all([
          API.patch(`/blocks/${a.id}`, { position: a.position }),
          API.patch(`/blocks/${bk.id}`, { position: bk.position }),
        ]);
      } catch {
        setError("REORDER_FAILED.");
      }
    }
  };

  const handlePublish = async () => {
    if (!post?.id) return;
    try {
      await API.patch(`/posts/${post.id}/publish`);
      setPost((p) => ({ ...p, status: "published" }));
      setPublishedOk(true);
    } catch {
      setError("PUBLISH_FAILED.");
    }
  };

  // ── Render
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--on-primary)]">
        <p className="text-xs uppercase tracking-widest">INITIALIZING_EDITOR...</p>
      </div>
    );
  }

  const isPublished = post?.status === "published" || publishedOk;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--on-primary)]">
      {/* ── Top bar */}
      <div className="sticky top-0 z-10 bg-[var(--on-primary)] border-b border-[var(--primary)] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-sm font-black uppercase tracking-widest">LOG_CORE</span>
          <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-widest">
            EDITOR // V1.0.4
          </span>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
              SAVING...
            </span>
          )}
          {error && (
            <span className="text-xs uppercase tracking-widest text-[var(--error)]">{error}</span>
          )}
          {publishedOk && (
            <span className="text-xs uppercase tracking-widest" style={{ color: "#2a7d2a" }}>
              PUBLISHED.
            </span>
          )}
          <button
            onClick={() => navigate("/admin/posts")}
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
          >
            SAVE_DRAFT
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublished}
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] disabled:opacity-40"
          >
            {isPublished ? "PUBLISHED" : "PUBLISH"}
          </button>
        </div>
      </div>

      {/* ── Editor body */}
      <div className="flex-1">
        <div className="max-w-2xl mx-auto px-8 py-12">
          {/* Cover image */}
          {post?.cover_image ? (
            <div className="mb-6 relative group/cover">
              <img src={post.cover_image} alt="cover" className="w-full h-52 object-cover" />
              <label className="absolute bottom-2 right-2 cursor-pointer text-xs uppercase tracking-widest px-3 py-1 bg-[var(--primary)] text-[var(--on-primary)] opacity-0 group-hover/cover:opacity-100 transition-opacity">
                CHANGE_COVER
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              </label>
            </div>
          ) : (
            <label className="block mb-6 cursor-pointer">
              <div className="border border-dashed border-[var(--outline)] p-6 text-center text-xs uppercase tracking-widest text-[var(--on-surface-variant)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                + SET_COVER_IMAGE
              </div>
              <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </label>
          )}

          {/* Title */}
          <input
            type="text"
            value={post?.title ?? ""}
            onChange={handleField("title")}
            placeholder="ENTER_TITLE_HERE"
            className="w-full text-3xl font-black uppercase tracking-tight bg-transparent border-0 outline-none placeholder:text-[var(--outline-variant)] mb-4 leading-tight"
          />

          {/* Excerpt / subtitle */}
          <input
            type="text"
            value={post?.excerpt ?? ""}
            onChange={handleField("excerpt")}
            placeholder="SUBTITLE / EXCERPT..."
            className="w-full text-sm italic text-[var(--on-surface-variant)] bg-transparent border-0 border-b border-dashed border-[var(--outline-variant)] outline-none placeholder:text-[var(--outline-variant)] mb-10 pb-1 leading-relaxed"
          />

          <hr className="border-[var(--outline-variant)] mb-8" />

          {/* Blocks */}
          <div className="space-y-6 pr-24">
            {blocks.map((block, idx) => (
              <BlockEditor
                key={block.id ?? block.tempId}
                block={block}
                onUpdate={updateBlock}
                onDelete={() => deleteBlock(block.id ?? block.tempId)}
                onMoveUp={() => moveBlock(block.id ?? block.tempId, "up")}
                onMoveDown={() => moveBlock(block.id ?? block.tempId, "down")}
                isFirst={idx === 0}
                isLast={idx === blocks.length - 1}
              />
            ))}
          </div>

          {/* Add block area */}
          <div className={`mt-10 pt-8 ${blocks.length > 0 ? "border-t border-dashed border-[var(--outline-variant)]" : ""}`}>
            {blocks.length === 0 && (
              <p className="text-xs uppercase tracking-widest text-[var(--outline-variant)] text-center mb-6">
                INSERT_BLOCK_OR_TYPE_TO_START
              </p>
            )}
            <AddBlockToolbar onAdd={addBlock} />
          </div>
        </div>
      </div>

      {/* ── Footer */}
      <div className="border-t border-[var(--primary)] px-6 py-3 flex justify-between items-center">
        <p className="text-xs uppercase tracking-widest">&copy; 2024 LOG_CORE. DISTRACTION_FREE_MODE.</p>
        <div className="flex gap-6">
          <button className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 hover:underline">
            SHORTCUTS
          </button>
          <button className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 hover:underline">
            HELP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
