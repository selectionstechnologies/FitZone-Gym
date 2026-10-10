import { Button } from "../components/ui.jsx";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pt-24 text-center">
      <div>
        <h1 className="text-gradient mb-2 text-8xl font-black">404</h1>
        <p className="mb-8 text-muted">Looks like this page skipped leg day. It doesn't exist.</p>
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  );
}
