import { ChangeEventHandler, EventHandler, MutableRefObject, useEffect, useRef, useState } from "react"
import { InputField } from "./input-field"
import styled from "@emotion/styled"



interface DropdownSearchParameter {
    list: Array<any>
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onSelect?: CallableFunction
    onBlur?: CallableFunction
    value?: string
    hasID?: boolean
    placeholder?: string
    reset?: boolean
    label?: string
}

const ListContainer = styled.div`
`

export const DropdownSearch: React.FC<DropdownSearchParameter>= ({value, list, onSelect, onChange, onBlur, hasID, placeholder, reset, label}) => {
     const inputRef: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null!)
     const dropdownRef: MutableRefObject<HTMLUListElement> = useRef<HTMLUListElement>(null!)


    const [showDropdown, setShowDropdown] = useState(false)
    const [inputToken, setInputToken] = useState(value ? value : '')

    document.addEventListener('mousedown', (evt) => {
        if (dropdownRef.current?.contains(evt.target as Node)) return

        setShowDropdown(false)
    })

    useEffect(() => {
    if (showDropdown && inputRef.current) inputRef.current.focus()
    else if (!showDropdown && inputRef.current) {
        if (onBlur !== undefined) onBlur(inputRef.current.value)

    } }, [showDropdown])

    useEffect(() => {
    }, [])


    const handleItemClick = (str: string) => {
        setInputToken(str)
        if (onSelect != undefined) onSelect(str)
        setShowDropdown(false);
        if (onChange !== undefined) {
        const fakeEvent = { target: { value: str } } as React.ChangeEvent<HTMLInputElement>;
        onChange(fakeEvent);
  }
    }
    return (
        <div className="">
            <InputField label={label} 
            onChange={(e) => {
                console.log("ONCHANGE IS CALLED")
                if (onChange) onChange(e)
                setInputToken(e.target.value)
            }}
            value={inputToken}
            onFocus={() => setShowDropdown(true)}
            />
            { showDropdown && 
                <ul ref={dropdownRef} className="absolute dropdown-items">
                    {list.map((item, index) => {
                  if (!item.toLowerCase().includes(inputToken.toLowerCase())) return <></>
                  return (
                    <li key={hasID ? item.id : list.indexOf(item)} className="" onClick={() =>handleItemClick(item)}>{item}</li>
                  )})
                }
                </ul>
            }
            
            {/* <div className=""> */}
            
              {/* <input
                value={inputToken}
                onChange={e => {
                    if (onChange !== undefined) onChange(e)
                    // setJobPosition(e.target.value)
                    setInputToken(e.target.value)
                }}
                type="text"
                className="p-1 pl-3 rounded-sm border-2 w-full"
                ref={inputRef} onClick={() => { setShowDropdown(true) }}
                placeholder={placeholder ? placeholder : ''} />
                {showDropdown && */}
              {/* <ul ref={dropdownRef} className="absolute mt w-inherit">
                {list.map((item) => {
                  if (!item.toLowerCase().includes(inputRef.current.value.toLowerCase())) return <></>
                  return (
                    <li key={hasID ? item.id : item} className="bg-gray-200 cursor-pointer p-2" onClick={() =>handleItemClick(item)}>{item}</li>
                  )})
                }
                {list.filter((str) => str.toLowerCase().includes(inputRef.current.value.toLowerCase())).length == 0 &&
                    <li key={"Result not found"} className="bg-gray-200 cursor-pointer p-2">Result not found</li>}
              </ul> */}
            
            {/* </div> */}
        </div>)
}