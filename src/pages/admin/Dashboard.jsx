import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../../components/Layouts/AdminLayout";
import ConfirmModal from "../../components/ui/ConfirmModal";

const StatusBadge = ({ status }) =>
  status === "published" ? (
    <span className="bg-[var(--primary)] text-[var(--on-primary)] text-xs font-bold uppercase tracking-widest px-2 py-0.5">
      PUBLISHED
    </span>
  ) : (
    <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest px-2 py-0.5 border border-[var(--primary)]">
      DRAFT
    </span>
  );

const MOCK_ACTIVITY = [
  { time: "14:02:11", msg: "USER_ROOT updated ENTRY_892" },
  { time: "13:45:59", msg: "USER_ADMIN deleted TRASH_CACHE" },
  { time: "12:10:04", msg: "SYSTEM_AUTO generated daily backup" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [killTarget, setKillTarget] = useState(null); // id of post pending deletion
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/admin/posts");
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch {
        setError("FAILED_TO_LOAD_REGISTRY.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = async () => {
    try {
      const res = await API.post("/posts");
      navigate(`/admin/editor/${res.data.slug}`);
    } catch {
      setError("FAILED_TO_CREATE_ENTRY.");
    }
  };

  const handleDelete = async () => {
    if (!killTarget) return;
    try {
      await API.delete(`/posts/${killTarget}`);
      setPosts((prev) => prev.filter((p) => p.id !== killTarget));
    } catch {
      setError("KILL_FAILED.");
    } finally {
      setKillTarget(null);
    }
  };

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="font-black uppercase tracking-tight mb-1">ENTRY_REGISTRY</h2>
            <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-widest">
              Total index count: {loading ? "..." : posts.length} items
            </p>
          </div>
          <button
            onClick={handleNewPost}
            className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] text-[var(--on-primary)] text-xs font-bold uppercase tracking-widest border-[var(--primary)]"
          >
            + NEW POST
          </button>
        </div>

        {error && (
          <p className="text-xs uppercase tracking-widest text-[var(--error)] mb-4">{error}</p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 border border-[var(--primary)] mb-8">
          {[
            { label: "01. STATUS_TOTAL", value: posts.length },
            { label: "02. STATUS_PUBLISHED", value: published },
            { label: "03. STATUS_DRAFT", value: drafts },
            { label: "04. SYSTEM_HEALTH", value: "99%" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 ${i < 3 ? "border-r border-[var(--primary)]" : "bg-[var(--surface-container-high)]"}`}
            >
              <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-widest mb-3">
                {stat.label}
              </p>
              <p className="text-4xl font-black">{loading && i < 3 ? "—" : stat.value}</p>
            </div>
          ))}
        </div>

        {/* Posts table */}
        <div className="border border-[var(--primary)] mb-10">
          {loading ? (
            <div className="px-4 py-8 text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
              LOADING_REGISTRY...
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--primary)]">
                  {["ID", "POST_TITLE", "STATUS", "MODIFIED_DATE", "ACTIONS"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
                      NO_ENTRIES_FOUND.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-[var(--outline-variant)] last:border-0 hover:bg-[var(--surface-container-low)]"
                    >
                      <td className="px-4 py-3 text-xs text-[var(--on-surface-variant)] font-mono">
                        #{post.id}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium max-w-xs truncate">
                        {post.title || "UNTITLED"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={post.status} />
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--on-surface-variant)]">
                        {post.updated_at
                          ? new Date(post.updated_at).toISOString().slice(0, 10)
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => navigate(`/admin/editor/${post.slug}`)}
                            className="text-xs font-bold uppercase tracking-widest border-0 bg-transparent px-1 py-0.5 flex items-center gap-1"
                          >
                            ✎ EDIT
                          </button>
                          <button
                            onClick={() => setKillTarget(post.id)}
                            className="text-xs font-bold uppercase tracking-widest border-0 bg-transparent px-1 py-0.5 text-[var(--error)]"
                          >
                            ✕ KILL
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
          <div className="flex justify-between items-center px-4 py-3 border-t border-[var(--primary)]">
            <p className="text-xs uppercase tracking-widest font-mono">PAGE_01_OF_12</p>
            <div className="flex gap-5">
              <button className="text-xs font-bold uppercase tracking-widest border-0 bg-transparent p-0">PREV</button>
              <button className="text-xs font-bold uppercase tracking-widest border-0 bg-transparent p-0">NEXT</button>
            </div>
          </div>
        </div>

        {/* Bottom: Manifesto + Activity */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-black uppercase tracking-tight mb-4 text-base">SYSTEM_MANIFESTO</h3>
            <div className="border border-[var(--primary)] p-6">
              <p className="text-sm leading-relaxed mb-4">
                This panel operates under the{" "}
                <strong className="underline underline-offset-2">CORE_PROTOCOL</strong>. All edits
                are final once pushed to the archive. The strict adherence to monochrome visual
                clarity ensures focused editorial review without the distraction of peripheral data
                noise.
              </p>
              <ul className="space-y-2 text-xs font-mono">
                <li>- Ensure all headers comply with H1 hierarchy.</li>
                <li>- Image assets must be stripped of metadata.</li>
                <li>- References should be piped | using absolute paths.</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-tight mb-4 text-base">ACTIVITY</h3>
            <div>
              {MOCK_ACTIVITY.map((item, i) => (
                <div
                  key={i}
                  className="border border-b-0 last:border-b border-[var(--primary)] px-4 py-3"
                >
                  <p className="text-xs font-mono text-[var(--on-surface-variant)] mb-0.5">
                    {item.time}
                  </p>
                  <p className="text-xs uppercase tracking-widest">{item.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {killTarget && (
        <ConfirmModal
          title="KILL THIS ENTRY?"
          message="This action is final. The post and all its blocks will be permanently deleted from the archive."
          confirmLabel="KILL"
          onConfirm={handleDelete}
          onCancel={() => setKillTarget(null)}
        />
      )}
    </AdminLayout>
  );
};

export default Dashboard;
