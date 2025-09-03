import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Container } from './ui/reused-ui/Container.jsx'


const InputOutputTable = () => {
        // State Management
        const [inputs, setInputs] = useState([0, 1, 2]);
        const [outputs, setOutputs] = useState([0, 1, 2]);
        const [rule, setRule] = useState('2x + 1');
        const [currentStep, setCurrentStep] = useState(0);

        // Functions
        const handleButtonClick = (input) => {

        };

	return (
        <Container
                text="Input Output Table"
                showResetButton={false}
                borderColor="#FF7B00"
                showSoundButton={true}
        >
                {/* Intro Text */}
                <div className='text-center text-sm text-gray-500 p-5 pb-3 flex-start'>
                        Help Flexi's input-output machine finish the output column in the table! Click the correct output for each input!
                </div>

                {/* Table */}
                <div className='w-[90%] flex justify-between mx-auto flex-grow gap-5'>
                        {/* Input Column */}
                        <div className='flex flex-col h-[90%] items-center'>
                                <div className='mb-2'>
                                        Inputs (x)
                                </div>
                                <div className='flex flex-col flex-grow justify-between'>
                                        <div className='w-[50px] h-[50px] flex items-center justify-center border border-gray-300 rounded-md'>1</div>
                                        <div className='w-[50px] h-[50px] flex items-center justify-center border border-gray-300 rounded-md'>2</div>
                                        <div className='w-[50px] h-[50px] flex items-center justify-center border border-gray-300 rounded-md'>3</div>
                                </div>
                        </div>

                        {/* Rule Column */}
                        <div className='flex flex-col h-[90%] flex-grow items-center'>
                                <div className='mb-2'>
                                        Rule
                                </div>
                                <div className='w-[100%] h-[100%] flex items-center justify-center'>
                                        <div className='bg-yellow-200 h-[50px] w-[30px] flex items-center justify-center border border-gray-300 rounded-md'/>
                                        <div className='flex-grow bg-gray-200 h-[100%] flex items-center justify-center border border-gray-300 rounded-md'>
                                                <div className='text-center text-sm bg-white py-2 px-4 flex items-center justify-center border border-gray-300 rounded-md'>{rule}</div>
                                        </div>
                                        <div className='bg-yellow-200 h-[50px] w-[30px] flex items-center justify-center border border-gray-300 rounded-md'/>
                                </div>
                        </div>

                        {/* Output Column */}
                        <div className='flex flex-col h-[90%] items-center'>
                                <div className='mb-2'>
                                        Outputs (y)
                                </div>
                                <div className='flex flex-col flex-grow justify-between'>
                                        <div className='w-[50px] h-[50px] flex items-center justify-center border border-gray-300 rounded-md'>?</div>
                                        <div className='w-[50px] h-[50px] flex items-center justify-center border border-gray-300 rounded-md'>?</div>
                                        <div className='w-[50px] h-[50px] flex items-center justify-center border border-gray-300 rounded-md'>?</div>
                                </div>
                        </div>

                </div>

                {/* Buttons */}
                <div className='w-[100%] pt-3 pb-4 flex justify-center items-center gap-3'>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-green-200 border border-green-500 border-2 rounded-lg text-3xl font-extrabold text-green-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(0)}
                        >0</button>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-green-200 border border-green-500 border-2 rounded-lg text-3xl font-extrabold text-green-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(1)}
                        >1</button>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-green-200 border border-green-500 border-2 rounded-lg text-3xl font-extrabold text-green-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(2)}
                        >2</button>
                </div>
        </Container>
        );
};


export default InputOutputTable;
