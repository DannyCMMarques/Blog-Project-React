import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import About from './pages/about'
import Blog from './pages/blog'
import BlogPost from './pages/blogPost'
import Home from './pages/home'
import Post from './pages/post'

function App() {

  return (
    <>
      <BrowserRouter>
            <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/post/*" element={<Post />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
