import { useNavigate } from "react-router-dom";

const Card = ({ id, image, title, date, desc, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${slug || id}`, { state: { image, title, date, desc } });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer group">
      <hr className="border-[var(--primary)]" />
      <div className="flex items-start gap-6 py-8">
        <p className="w-28 shrink-0 text-xs tracking-wide text-[var(--on-surface-variant)] pt-1">
          {date}
        </p>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold uppercase tracking-wide leading-snug mb-2 group-hover:underline">
            {title}
          </h3>
          <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">{desc}</p>
        </div>

        {image && (
          <div className="shrink-0">
            <img src={image} alt={title} className="w-52 h-28 object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
