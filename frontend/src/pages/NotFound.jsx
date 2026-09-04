import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="font-display text-8xl text-accent mb-4">404</h1>
    <p className="text-silver mb-8">The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="inline-flex items-center justify-center bg-accent text-white px-7 py-3.5 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
    >
      Back Home
    </Link>
  </div>
);

export default NotFound;
