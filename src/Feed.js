import { useStoreState } from "easy-peasy";
import Post from "./Post";

export default function Feed() {
  const searchResults = useStoreState((state) => state.searchResults);
  return (
    <>
      {searchResults &&
        searchResults.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}
