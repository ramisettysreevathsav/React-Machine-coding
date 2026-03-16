import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CommentsUI from './Components/Comments/CommentsUI'
import { commentsData } from './Components/Comments/CommentsData'
import useAddReply from './Components/Comments/CommentsUtils'

function App() {
  
const [data, setData] = useState(commentsData);

  const handleReply = (parentId, text) => {
    const updated = useAddReply(data, parentId, text);
    setData(updated);
  };

  return (
    <div>
      <CommentsUI commentsData={data} onReply={handleReply} />
    </div>
  );
}

export default App
