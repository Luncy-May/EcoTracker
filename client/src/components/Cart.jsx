import React, { useState } from 'react';
import axios from 'axios';
import AddItem from './AddItem';
import { FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { FaTimes } from 'react-icons/fa';

const Cart = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [itemList, setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddItem = (newItem) => {
        setItemList((prevList) => [...prevList, newItem]);
    };
    // Sorting by perish time urgency
    const handleSortByUrgency = () => {
        const sortedList = [...itemList].sort((a, b) => {
            if (!a.perishable && !b.perishable) return 0;
            if (!a.perishable) return 1;
            if (!b.perishable) return -1;
            return a.perishTime - b.perishTime;
        });
        setItemList(sortedList);
    };
    const handleDeleteItem = (indexToRemove) => {
        setItemList((prevList) => prevList.filter((item, index) => index !== indexToRemove));
    };

    const getItemColor = (item) => {
        if (!item.perishable) {
            return 'text-black';
        }
        if (item.perishTime <= 4) {
            return 'text-red-500';
        }
        if (item.perishTime <= 12) {
            return 'text-yellow-500';
        }
        if (item.perishTime <= 24) {
            return 'text-green-500';
        }
        return 'text-black';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let itemDescriptions = itemList.map(item => {
            if (item.perishable) {
                return `${item.label} perishing in ${item.perishTime} hours`;
            } else {
                return item.label;
            }
        }).join(", ");
        setIsLoading(true)
        const prompt = `I have a list of items, could you give me some eco-friendly suggestions of how to use and compost these items? ${itemDescriptions}`;

        try {
            const result = await axios.post('http://localhost:5003/api/ask-ai', { prompt });
            setResponse(result.data.response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className='pt-10 overflow-y-auto'>
            <h1 className='font-semibold text-3xl text-center'>EcoTracker</h1>
            <div className='items-center justify-center flex flex-row p-3 m-2 space-x-10 text-2xl'>
                <div className='w-1/2 font-semibold text-center p-5 border border-gray-300 shadow-md hover:shadow-lg h-[700px] overflow-y-auto'>
                    <div className='inline-block'>
                        <button type="submit" className='mt-3' onClick={handleSubmit}>
                            <span className={`px-4 py-2 rounded-lg text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'}`}>Get Recommendation</span>
                        </button>
                    </div>
                    <div className='text-left mt-5 mb-5'>
                        <AddItem handleAddItem={handleAddItem} />
                    </div>
                    <div className='border border-gray-300 shadow-sm hover:shadow-lg p-5'>
                        <div className='flex justify-center items-center'>
                            <h1>Item List:</h1>
                            <button
                                onClick={handleSortByUrgency}
                                className='scale-75 bg-gray-300 px-4 py-2 rounded-md shadow-md hover:bg-gray-400'>
                                Sort by Urgency
                            </button>
                        </div>

                        {itemList.map((item, index) => (
                            <div key={index} className='flex justify-between'>
                                <span className={getItemColor(item)}>
                                    {index + 1}. {item.label} {item.perishable && `, perish(es) in ${item.perishTime} hours`}
                                </span>
                                <FaTimes onClick={() => handleDeleteItem(index)} className='cursor-pointer text-red-500 hover:text-red-700' />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-1/2 text-center p-5 border border-gray-300 shadow-md hover:shadow-lg h-[700px] overflow-y-auto'>
                    <h1 className='flex font-semibold justify-center items-center mb-3'>
                        AI Assistant
                        <span className='ml-5 flex items-center space-x-2'>
                            <FaRobot className="inline-block" />
                            {isLoading && <span>thinking...</span>}
                        </span>
                    </h1>
                    {response ? (
                        <div className='text-left'>
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-2xl my-3" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-xl my-2" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-lg my-2" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="text-lg list-disc list-inside my-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="text-lg list-decimal list-inside my-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="ml-4 my-1" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                }}
                            >
                                {response}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <div>
                            Welcome! Feel free to create a list of your stored items to receive valuable eco-friendly tips on managing perishable goods and proper composting techniques, helping you protect the environment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
