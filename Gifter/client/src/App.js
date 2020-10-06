// import React from "react";
// import "./App.css";
// import { PostProvider } from "./providers/PostProvider";
// import PostList from "./components/PostList";
// import PostForm from "./components/PostForm";
// import PostSearch from "./components/PostSearch";

// function App() {
//   return (
//     <div className="App">
//       <PostProvider>
//         <PostForm />
//         <PostSearch />
//         <PostList />
//       </PostProvider>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <PostProvider>
          <Header />
          <ApplicationViews />
        </PostProvider>
      </Router>
    </div>
  );
}

export default App;