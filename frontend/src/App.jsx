import { Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './pages/Home';
import Projects from './pages/Projects.jsx';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminAddProject from './pages/AdminAddProject.jsx';
import AdminAddBlog from './pages/AdminAddBlog.jsx';
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import EditBlog from './pages/EditBlog';
import AdminContactMessages from './pages/AdminContactMessages.jsx';

function App() {
  
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/projects' element={<AdminAddProject />} />
        <Route path='/admin/blog' element={<AdminAddBlog/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/admin/contacts" element={<AdminContactMessages />} />
      </Routes>      
      {/* <Footer /> */}
    </>
  );
}

export default App;

