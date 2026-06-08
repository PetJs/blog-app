const Footer = () => {
  return (
    <footer className="border-t border-[var(--primary)] bg-[var(--on-primary)] px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <p className="text-xs font-bold uppercase tracking-widest">
          &copy; 2024 SYSTEM_ERR. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-[var(--primary)] no-underline hover:underline">RSS</a>
          <a href="#" className="text-xs uppercase tracking-widest text-[var(--primary)] no-underline hover:underline">GITHUB</a>
          <a href="#" className="text-xs uppercase tracking-widest text-[var(--primary)] no-underline hover:underline">NEWSLETTER</a>
        </div>
        <p className="text-xs uppercase tracking-widest">V1.0.4_STABLE</p>
      </div>
    </footer>
  );
};

export default Footer;
