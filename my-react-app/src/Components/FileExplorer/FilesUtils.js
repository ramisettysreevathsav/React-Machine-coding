import React from "react";

const useFiles = (filesData , id , text , isFolder)=>{

    const addNew = (file)=>{

         if(file.id === id){
            return (
                {...file , children : [...file?.children , {
                    id : Date.now(),
                    name : text,
                    isFolder,
                    children : []
                }]}
            )
         }

         if(file.children?.length > 0){
             return {...file , children : file.children.map(el => addNew(el))}
         }

         return file;        
     }

     return filesData.map(el => addNew(el))
}

export default useFiles;
