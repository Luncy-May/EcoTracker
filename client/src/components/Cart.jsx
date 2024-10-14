import React, { useState } from 'react'
import axios from 'axios';
import AddItem from './AddItem';
const Cart = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [itemList, setItemList] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:5003/api/ask-ai', { prompt });
            setResponse(result.data.response);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='font-semibold pt-10 overflow-y-auto'>
            <h1 className='text-3xl text-center'>EcoTracker</h1>
            <div className='items-center justify-center flex flex-row p-3 m-2 space-x-10 text-2xl'>
                <div className='w-1/2 font-semibold text-center p-5 border border-gray-300 shadow-md hover:shadow-lg h-[600px] overflow-y-auto'>
                    <div className='inline-block'>
                        <h1>Item List:</h1>
                        <button type="submit" className='mt-3' onClick={handleSubmit}>
                            <span className='px-4 py-2 inline-block bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none active:bg-blue-700'>Get Recommendation</span>
                        </button>
                    </div>
                    <div className='text-left mt-5 mb-5'>
                        <AddItem itemList={itemList} setItemList={setItemList} />
                    </div>
                </div>


                <div className='w-1/2 font-semibold text-center p-5 border border-gray-300 shadow-md hover:shadow-lg h-[600px] overflow-y-auto'>
                    {response ? (
                        <div>
                            <p>{response}</p>
                        </div>
                    ) : (
                        <div>
                            The AI hasn't returned any response yet.
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Cart
