import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useNavigate();

  const {
    data: blog,
    isPending,
    error,
  } = useFetch("https://json-server-neon-omega.vercel.app/blogs/" + id);

  const handleClick = () => {
    fetch("https://json-server-neon-omega.vercel.app/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history("/");
    });
  };

  console.log(blog);
  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
