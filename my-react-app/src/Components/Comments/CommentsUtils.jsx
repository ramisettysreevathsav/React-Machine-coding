import React from "react";

const useAddReply = (commentsData , parentId , text)=>{

    const updateComments = (el)=>{
        if(parentId === el.id){
            return {...el , children : [...el.children || [] , 
                {
                    id: Date.now(),
                    text,
                    children: []
                }
            ]}
        }
        else if(el.children?.length > 0){
            return {...el , children : el.children?.map(val => updateComments(val))}
        }
        return el;
    }

    
    return commentsData?.map(el => {
        return updateComments(el)
    })

}
export default useAddReply;