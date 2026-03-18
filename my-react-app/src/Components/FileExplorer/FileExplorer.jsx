import React, { useState } from 'react'
import './FileExplorer.css'
import useFiles from './FilesUtils'

const FileExplorer = ({filesData , addFiles})=>{

    const [showInput , setShowInput] = useState({})
    const [text , setText] = useState('')

    // const {addNew} = useFiles(filesData , showInput?.isFolder);

    return (
      <div className='filewrapper'>
          {filesData?.map(file =>{
             return(
                <span key={file.id}>
                  <div className='wrapper'>
                        <div className='imgTitle'>
                                <img className='imgFolder' src={file?.isFolder ? 'https://www.svgrepo.com/show/341381/folder-document-file-format.svg' : 'https://www.iconpacks.net/free-icon/file-1453.html'}/>
                                <span className='fileName'>{file?.name}</span>
                        </div>
                        <div onKeyDown={(e)=> {
                            if (e.type == 'blur') setShowInput(null)
                        }}>
                            {file?.isFolder &&
                                <>
                                    <button onClick={()=> setShowInput({isFolder : true , file})}>+Add Folder</button>
                                    <button onClick={()=> setShowInput({isFolder : false , file})}>+Add File</button>
                                </>
                            }
                        </div>
                        {showInput?.hasOwnProperty('isFolder') && showInput?.file?.id === file?.id && 
                            <input
                            type='text' 
                            onChange={(e)=> setText(e.target.value)}
                            value={text}
                            onKeyDown={(e)=> {
                                if(e.key === 'Enter'){
                                    const {file , isFolder} = showInput;
                                    // addNew(file , file?.id , text);
                                    addFiles(file.id , text , isFolder);
                                    setShowInput({})
                                }
                            }}
                         />}
                  </div> 
                  
                 {file.children?.length > 0 && <FileExplorer filesData= {file.children} addFiles={addFiles}/>}

                </span>
             )
          })}
      </div>
     )

}
export default FileExplorer;