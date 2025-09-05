import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Container } from './ui/reused-ui/Container.jsx'
import Machine from './Machine.jsx'


const InputOutputTable = () => {
        // State Management
        const [inputs, setInputs] = useState([0, 1, 2]);
        const [outputs, setOutputs] = useState([0, 1, 2]);
        const [rule, setRule] = useState('2x + 1');
        const [currentStep, setCurrentStep] = useState(0);
        const [lightColor, setLightColor] = useState('none');

        // Functions
        const generateTable = () => {

        }

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
                <div className='w-[90%] flex justify-between mx-auto flex-grow'>
                        {/* Input Column */}
                        <div className='flex flex-col h-[95%] items-center'>
                                <div className='mb-2 text-center'>
                                        Inputs <br/> (x)
                                </div>
                                <div className='flex flex-col flex-grow justify-between my-2'>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>1</div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>2</div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>3</div>
                                </div>
                        </div>

                        {/* Rule Column */}
                        <Machine rule={rule} step={currentStep} lightColor={lightColor} />

                        {/* Output Column */}
                        <div className='flex flex-col h-[95%] items-center'>
                                <div className='mb-2 text-center'>
                                        Outputs <br/> (y)
                                </div>
                                <div className='flex flex-col flex-grow justify-between my-2'>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>1</div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>2</div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>?</div>
                                </div>
                        </div>

                </div>

                {/* Buttons */}
                <div className='w-[100%] pt-3 pb-4 flex justify-center items-center gap-3'>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-gray-200 border border-gray-500 border-2 rounded-lg text-3xl font-extrabold text-gray-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(0)}
                        >0</button>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-gray-200 border border-gray-500 border-2 rounded-lg text-3xl font-extrabold text-gray-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(1)}
                        >1</button>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-gray-200 border border-gray-500 border-2 rounded-lg text-3xl font-extrabold text-gray-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(2)}
                        >2</button>
                </div>
        </Container>
        );
};


export default InputOutputTable;
