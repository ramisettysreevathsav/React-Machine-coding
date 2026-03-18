import React, { useMemo, useState } from "react";
import './multiDropdown.css'

const options = [
  { id: 1, label: "React" },
  { id: 2, label: "JavaScript" },
  { id: 3, label: "CSS" },
  { id: 4, label: "Node" },
  { id: 5, label: "Express" },
  { id: 6, label: "Redis" },
  { id: 7, label: "Java" },
];

const MultiDropDown = ()=>{

    const [initialOptions , setInitialOptions] = useState(options)
    const [selected , setSelected] = useState(new Set([]))
    const [open , setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("");

    const optionsMemo = useMemo(()=>{

       return initialOptions.reduce((acc , curr)=>{
            acc[curr.id] = curr;
            return acc;   
       },{})

    },[])

    const handleSelect = (id) => {
        setSelected(prev => {
        const updated = new Set(prev);
        updated.has(id) ? updated.delete(id) : updated.add(id);
        return updated;
        })
        setInputValue('')
    };

    const clearAll = ()=>{
       setSelected(new Set());
    }

    const filteredOptions = useMemo(() => {
        return initialOptions.filter(el =>
        el.label.toLowerCase().includes(inputValue.toLowerCase())
        );
  }, [inputValue]);


    return (
        <div className="box-wrapper">
            <div className="search-box" onClick={()=>setOpen(!open)}>
                {selected.size === 0 ? <span>Select options</span> :
                [...selected]?.map(sel =>{
                     
                     return (
                        <div className="selectedBox" key={sel}>{optionsMemo[sel]?.label}</div>
                     )
                })}
                <input
                    className="tag-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        if(!open) setOpen(true);
                        setInputValue(e.target.value)
                    }}
                    placeholder={selected.size === 0 ? "Search..." : ""}
                    />
            </div>
            {open && <div className="optionsWrapper">
              <div className="addFilters">
                <div onClick={()=> filteredOptions.map(opt => handleSelect(opt.id))}>Select All</div>
                <div onClick={()=> clearAll()}>Clear All</div>
              </div>
                {filteredOptions?.map(el=>{
                    return(
                        <div className="option-label" key={el.id}>
                            <input type="checkbox"
                             checked = {selected.has(el.id)}
                             onChange={() => handleSelect(el.id)}/>
                            <span onClick={()=>{
                                handleSelect(el.id);
                            }}>{el?.label}</span>
                        </div>
                    )
                })}
            </div>}

        </div>
    )

}

export default MultiDropDown;