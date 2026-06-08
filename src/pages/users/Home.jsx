import Card from "../../components/ui/Card";

const MOCK_POSTS = [
  {
    id: 1,
    slug: "deconstructing-the-grid",
    title: "DECONSTRUCTING THE GRID: A BRUTALIST APPROACH",
    date: "2024-10-12",
    desc: "A deep dive into why 1px borders and monospaced type create more focus than complex gradients and depth-simulating shadows.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
  },
  {
    id: 2,
    slug: "kernel-logs-optimizing-compile-times",
    title: "KERNEL_LOGS: OPTIMIZING COMPILE TIMES",
    date: "2024-09-28",
    desc: "When seconds count: how we shaved 40% off our build pipeline using distributed caching and lean dependency management.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80",
  },
  {
    id: 3,
    slug: "the-anthropology-of-the-terminal",
    title: "THE ANTHROPOLOGY OF THE TERMINAL",
    date: "2024-09-15",
    desc: "Exploring why developers return to CLI interfaces for their most critical work despite the evolution of high-fidelity GUIs.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80",
  },
  {
    id: 4,
    slug: "white-space-as-luxury",
    title: "WHITE_SPACE_AS_LUXURY",
    date: "2024-08-30",
    desc: "The philosophy of breathing room. Why adding space is more effective than adding features.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
];

const TOTAL_PAGES = 12;
const CURRENT_PAGE = 1;

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="font-black uppercase tracking-tight mb-6" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1 }}>
          LATEST_LOGS
        </h1>
        <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] max-w-lg leading-relaxed">
          SYSTEM STATUS: NOMINAL. EXPLORING THE INTERSECTION OF ENGINEERING RIGOR AND MINIMALIST
          DESIGN. UPDATED INTERMITTENTLY FROM THE VOID.
        </p>
      </div>

      <div>
        {MOCK_POSTS.map((post) => (
          <Card key={post.id} {...post} />
        ))}
        <hr className="border-[var(--primary)]" />
      </div>

      <div className="flex justify-between items-center mt-8 ">
        <button className="flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest border-0 bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]">
          &#8592; PREV
        </button>
        <span className="text-xs font-bold uppercase tracking-widest">
          PAGE {String(CURRENT_PAGE).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
        </span>
        <button className="flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest border-0 bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]">
          NEXT &#8594;
        </button>
      </div>
    </div>
  );
};

export default Home;
