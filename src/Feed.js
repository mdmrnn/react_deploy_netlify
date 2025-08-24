import Post from "./Post";
import { useContext } from "react";
import DataContext from "./Context/DataContext";
export default function Feed() {
  const { searchResults } = useContext(DataContext);
  return (
    <>
      {searchResults.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
