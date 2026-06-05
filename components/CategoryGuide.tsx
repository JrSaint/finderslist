interface CategoryGuideProps {
  guide?: string;
}

export default function CategoryGuide({ guide }: CategoryGuideProps) {
  if (!guide) return null;

  return (
    <div className="rounded-xl border border-white/8 bg-slate-900/30 p-5 mb-6">
      <p className="text-sm text-slate-400 leading-relaxed">{guide}</p>
    </div>
  );
}
