import React, { useState } from 'react'
import Drag from './Drag'
import { FaTimes } from 'react-icons/fa'
import { GrAdd } from "react-icons/gr";

const AddItem = ({ handleAddItem }) => {
    const [clicked, setClicked] = useState(true)
    const [label, setLabel] = useState('')  // Initialize label as an empty string
    const [perishable, setPerishable] = useState(false)  // Initialize perishable as false
    const [perishTime, setPerishTime] = useState(0)  // Initialize perishTime as 0

    const handleLabel = (e) => {
        setLabel(e.target.value)
    }

    const handlePerish = () => {
        setPerishable(!perishable)
    }

    const handleClick = () => {
        setClicked(!clicked)
    }

    const handlePerishTime = (value) => {
        setPerishTime(value)
    }

    const onSubmit = (e) => {
        e.preventDefault();  // Prevent page refresh

        // Create new item
        const newItem = {
            label: label,
            perishable: perishable,
            perishTime: perishable ? perishTime : null // Only set perishTime if perishable is true
        }

        // Call the handler function to add the new item
        handleAddItem(newItem)

        // Reset form fields after submission
        setLabel('')  // Clear the label input
        setPerishable(false)  // Reset the perishable checkbox
        setPerishTime(0)  // Reset the perish time slider
    }

    return (
        <div>
            {clicked ? (
                <div className='text-xl'>
                    <form className='border border-gray-300 shadow-md hover:shadow-lg p-5 inline-block' onSubmit={onSubmit}>
                        <div className='flex justify-between'>
                            <h1>Add a new item for storage</h1>
                            <h1 className='cursor-pointer' onClick={handleClick}><FaTimes /></h1>
                        </div>

                        <div className='flex items-center justify-center mt-2'>
                            <span>Label: </span>
                            <input 
                                type="text" 
                                value={label} 
                                className='ml-2 border border-gray-300 p-3 rounded-md shadow-sm hover:shadow-md' 
                                onChange={handleLabel} 
                                required 
                            />
                        </div>

                        <div className='flex mt-2'>
                            <span>Perishable</span>
                            <input 
                                type="checkbox" 
                                className='ml-2 scale-150 p-4' 
                                onChange={handlePerish} 
                                checked={perishable} 
                            />
                        </div>

                        {perishable && (
                            <div className='mt-2'>
                                <span>Perish Time (hrs)</span>
                                <Drag value={perishTime} handleSlide={handlePerishTime} />
                            </div>
                        )}

                        <button type="submit" className='mt-3'>
                            <span className='scale-75 px-4 py-2 inline-block bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none active:bg-blue-700'>Submit</span>
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <div className='border border-gray-300 shadow-md hover:shadow-lg p-5 text-left inline-block'>
                        <h1 className='cursor-pointer flex justify-center items-center' onClick={handleClick}> Add a new item for storage <span className='ml-2'><GrAdd /></span></h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddItem
