import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/contact', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          // Not authorized
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setMessages(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to fetch messages', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="container bg-black text-white mt-5 p-4 rounded shadow">
      <h2 className="text-warning mb-4 text-center mt-3">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-bordered table-hover">
            <thead className="table-warning text-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg._id}>
                  <td>{msg.fullName}</td>
                  <td>{msg.email}</td>
                  <td>{msg.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
