import { useState } from 'react'
import './App.css'
import CommentsUI from './Components/Comments/CommentsUI'
import { commentsData } from './Components/Comments/CommentsData'
import useAddReply from './Components/Comments/CommentsUtils'
import { initialFilesData } from './Components/FileExplorer/FilesData'
import FileExplorer from './Components/FileExplorer/FileExplorer'
import useFiles from './Components/FileExplorer/FilesUtils'
import MultiDropDown from './Components/MultiDropdown/multiDropdown'

function App() {
  
const [data, setData] = useState(commentsData);
const [filesData , setFilesData] = useState(initialFilesData);

  const handleReply = (parentId, text) => {
    const updated = useAddReply(data, parentId, text);
    setData(updated);
  };

  const addFiles = (parentId, text , isFolder) => {
    const updated = useFiles(filesData, parentId, text , isFolder);
    setFilesData(updated);
  };

  return (
    <div>
      {/* <CommentsUI commentsData={data} onReply={handleReply} /> */}

      {/* <FileExplorer filesData = {filesData} addFiles = {addFiles}/> */}

      <MultiDropDown/>
    </div>
  );
}

export default App
