import Link from "next/link";
import { ArrowLeft, Car } from "lucide-react";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md rounded-3xl glass-panel p-8 sm:p-12 border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <Car className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white">404</h1>
          <h2 className="text-lg font-bold text-zinc-300">
            Page or Auto Part Not Found
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The requested page does not exist or may have been moved. Return to the homepage or search our Korea parts catalog.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/az"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
