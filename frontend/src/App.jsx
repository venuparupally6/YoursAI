import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import BlogTitle from "./pages/BlogTitle"
import RemoveBackground from "./pages/RemoveBackground"
import RemoveObject from "./pages/RemoveObject"
import WriteArticle from "./pages/WriteArticle"
import GenerateImages from "./pages/GenerateImages"
import Community from "./pages/Community"
import ReviewResume from "./pages/ReviewResume"
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import {Toaster} from "react-hot-toast";

const App = () => {

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ai" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/ai/write-article" element={<WriteArticle/>}/>
          <Route path="/ai/blog-titles" element={<BlogTitle/>}/>
          <Route path="/ai/remove-background" element={<RemoveBackground/>}/>
          <Route path="/ai/remove-object" element={<RemoveObject/>}/>
          <Route path="/ai/review-resume" element={<ReviewResume/>}/>
          <Route path="/ai/generate-images" element={<GenerateImages/>}/>
          <Route path="/ai/community" element={<Community/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App