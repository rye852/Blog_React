import Post from "./Post";
import { useContext } from "react";
import { Data } from "../App";
const Feed = () => {
  const {searchResault} = useContext(Data)
  return <>
    {searchResault.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </>;
};

export default Feed;
