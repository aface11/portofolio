export default function Footer() {
  return (
    <footer className="px-8 py-8 border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-white">
        <span>© {new Date().getFullYear()} Adam Copeland</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">IMDb</a>
        </div>
      </div>
    </footer>
  );
}
