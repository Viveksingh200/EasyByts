import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blog, onDelete, currentUser }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-blog/${blog._id}`);
  };

  const handleDelete = () => {
      onDelete(blog._id);
  };

  // Check if the current user is the owner or an admin
  const isAuthorized =
    currentUser && (currentUser.isAdmin || blog.author?._id === currentUser._id);

  return (
    <div className="container mb-2 text-white bg-black">
      <div className="card bg-dark text-white mb-1">
        <div className="card-body">
          <h4 className="card-title text-warning">{blog.title}</h4>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <p className="text-light">Tags: {blog.tags.join(', ')}</p>
          <p className="text-light">
            Published: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="text-light">
            Created by: {blog.author?.username || 'Unknown Author'} {/* Safeguard for missing author */}
          </p>

          {isAuthorized && (
            <div>
              <button className="btn btn-warning me-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
