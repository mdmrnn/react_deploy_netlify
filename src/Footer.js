import { useStoreState } from "easy-peasy";

export default function Footer() {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className="footer">
      <p>
        {postCount} Post {postCount === 1 ? "Blog" : "Blogs"}
      </p>
    </footer>
  );
}
