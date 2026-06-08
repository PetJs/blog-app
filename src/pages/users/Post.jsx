import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

const MOCK_POST = {
  title: "ARCHITECTURAL VOID AND DIGITAL EPHEMERALITY",
  subtitle: "Exploring the intersection of brutalist physical structures and the decay of modern web frameworks.",
  publishedDate: "2024.10.14",
  readTime: "12 MIN",
  tags: ["BRUTALISM", "CODE", "LOG_CORE"],
  coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  coverCaption: "FIG 01: BRUTALIST ARTIFACT IN URBAN STASIS.",
  body: [
    {
      type: "paragraph",
      content:
        "The internet was supposed to be a permanent archive, a crystalline structure of knowledge that would outlast its creators. Instead, we are witnessing a rapid liquefaction of the digital landscape. Sites vanish, links rot, and the very protocols we relied upon for stability are being abstracted into obsolescence.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
      caption: "FIG 01: BRUTALIST ARTIFACT IN URBAN STASIS.",
    },
    {
      type: "paragraph",
      content:
        "When we look at the physical world, concrete remains. It cracks, it stains, it weathers, but it persists. In the digital realm, \"weathering\" is simply a server being turned off. There is no decay, only disappearance. This brings us to the core thesis of the LOG_CORE manifesto: we must build digital structures with the intentionality of monoliths.",
    },
    {
      type: "audio",
      label: "VOICE_LOG_042.WAV",
      caption: "LISTEN TO THE ORIGINAL FIELD RECORDING FROM THE BERLIN SERVER ROOMS.",
    },
    {
      type: "paragraph",
      content:
        "Consider the CSS grid. It is the closest we have to a rigid floor plan. Every unit, every gap, every alignment is a conscious choice to inhabit space. Yet, we often surrender this control to frameworks that prioritize ease over permanence.",
    },
    {
      type: "gallery",
      images: [
        { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", alt: "circuit board" },
        { src: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=500&q=80", alt: "transmission tower" },
      ],
    },
    {
      type: "list",
      items: [
        "We must reject the fluid for the fixed.",
        "We must embrace the border as a boundary.",
        "We must prioritize the legibility of the machine over the aesthetics of the user.",
      ],
    },
    {
      type: "blockquote",
      content: '"The most permanent thing we can build is a simple text file."',
    },
    {
      type: "paragraph",
      content:
        "As we move forward into the era of generated content, the human-authored log becomes a rare artifact. It is a record of thought captured in a specific moment of technological history. Preserve it. Static sites are not a step backward; they are a fortress against the coming entropy.",
    },
  ],
};

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

const PostBody = ({ body }) => {
  return (
    <div className="space-y-6 text-sm leading-relaxed">
      {body.map((block, i) => {
        if (block.type === "paragraph") {
          return <p key={i}>{block.content}</p>;
        }

        if (block.type === "image") {
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
        }

        if (block.type === "audio") {
          return <AudioPlayer key={i} label={block.label} caption={block.caption} />;
        }

        if (block.type === "gallery") {
          return (
            <div key={i} className="grid grid-cols-2 gap-1 my-6">
              {block.images.map((img, j) => (
                <img key={j} src={img.src} alt={img.alt} className="w-full h-44 object-cover" />
              ))}
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-1 pl-0">
              {block.items.map((item, j) => (
                <li key={j} className="text-sm">{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote key={i} className="border-l-4 border-[var(--primary)] pl-5 my-6">
              <p className="text-base font-bold italic leading-snug">{block.content}</p>
            </blockquote>
          );
        }

        return null;
      })}
    </div>
  );
};

const Post = () => {
  const { state } = useLocation();
  const { slug } = useParams();

  const post = state
    ? {
        ...MOCK_POST,
        title: state.title || MOCK_POST.title,
        publishedDate: state.date ? state.date.replace(/-/g, ".") : MOCK_POST.publishedDate,
        coverImage: state.image || MOCK_POST.coverImage,
      }
    : MOCK_POST;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-3">
        <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
          PUBLISHED // {post.publishedDate}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs uppercase tracking-widest">EST. READ: {post.readTime}</p>
          <button className="text-xs uppercase tracking-widest px-3 py-1 border border-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--on-primary)]">
            READ ALOUD
          </button>
        </div>
      </div>

      <h1 className="font-black uppercase tracking-tight mb-4" style={{ lineHeight: 1.05 }}>
        {post.title}
      </h1>

      <p className="italic text-[var(--on-surface-variant)] text-sm mb-10 leading-relaxed">
        {post.subtitle}
      </p>

      <PostBody body={post.body} />

      <hr className="border-[var(--primary)] my-10" />

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-6">
          <button className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 underline-offset-4 hover:underline">
            SHARE_LINK
          </button>
          <button className="text-xs uppercase tracking-widest border-0 bg-transparent p-0 underline-offset-4 hover:underline">
            DOWNLOAD_PDF
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-widest font-bold">TAGS //</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[var(--primary)] text-[var(--on-primary)] text-xs px-2 py-0.5 uppercase tracking-wide font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
