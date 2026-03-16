import React, { useState } from "react";
import './Comments.css'
import useAddReply from "./CommentsUtils";

const CommentsUI = ({commentsData , onReply})=>{

    // const [data , setData] = useState(commentsData);
    const [showInput, setShowInput] = useState(false);
    const [text, setText] = useState("");
    const [elementId , setElementId] = useState(null)

    return (
        <div className="cmnt-wrapper">
            {commentsData?.map((el,ind) =>{
                return(
                 <div key={el.id}>
                   <div className="cmnt-text">{el.text}</div>
                   {!showInput ? <button onClick={()=> {
                    setShowInput(!showInput)
                    setElementId(el.id);
                   }}>Reply</button>
                    :  (el.id === elementId && <input type="text" onKeyDown={(e)=>{
                        if(e.key === 'Enter' || e.key === 'blur'){
                             if(text.length > 0){
                               onReply(el.id , text)
                             }
                             setShowInput(!showInput)
                             setText('')
                        }
                    }} onChange={(e)=> setText(e.target.value)} value={text}/>)
                   }
                   <button className="postBtn">Post</button>
                   {el.children?.length > 0 && <div className="cmnt-children">
                         <CommentsUI commentsData={el.children} onReply={onReply}/>   
                    </div>}
                 
                 </div>
                )
            })}
        </div>
    )


}
export default CommentsUI;