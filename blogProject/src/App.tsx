import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Blog from './pages/blog'
import BlogPost from './pages/blogPost'
import Post from './pages/post'
import Footer from './components/footer'

function App() {

  return (
    <>
      <BrowserRouter>
            <Navbar />

        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/post/*" element={<Post />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
