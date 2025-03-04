import Main from "./components/Main/Main"
import Sidebar from "./components/Sidebar/Sidebar"
import { useState } from 'react';

const App = () => {
const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
     <div className="flex h-screen">
      
     <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

     
      <Main showSidebar={showSidebar} />
    </div>
    </>
  )
}

export default App
