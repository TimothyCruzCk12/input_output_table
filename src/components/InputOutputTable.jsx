import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Container } from './ui/reused-ui/Container.jsx'
import Machine from './Machine.jsx'
import './ui/reused-animations/fade.css'

const InputOutputTable = () => {
        // State Management
        const [inputs, setInputs] = useState([0, 1, 2]);
        const [outputs, setOutputs] = useState([0, 1, 2]);
        const [rule, setRule] = useState('2x + 1');
        const [currentStep, setCurrentStep] = useState(0);
        const [lightColor, setLightColor] = useState('none');
        const [choices, setChoices] = useState([1, 2, 3]);
        const [revealedOutputs, setRevealedOutputs] = useState([false, false, false]);
        const [lightType, setLightType] = useState(null);

        // Functions
        const generateTable = () => {
                // Generate random input set
                const inputSets = [
                        [1, 2, 3],  // Common
                        [0, 1, 2],  // Common
                        [2, 3, 4],  // Common
                        [1, 3, 5],  // Rarer - odd sequence
                        [2, 4, 6]   // Rarer - even sequence
                ];
                
                // Weight the selection (first 3 are more common)
                const random = Math.random();
                let selectedInputs;
                if (random < 0.85) {
                        // 85% chance for common sets (0, 1, 2 indices)
                        const commonIndex = Math.floor(Math.random() * 3);
                        selectedInputs = inputSets[commonIndex];
                } else {
                        // 15% chance for rarer sets (3, 4 indices)
                        const rareIndex = Math.floor(Math.random() * 2) + 3;
                        selectedInputs = inputSets[rareIndex];
                }
                
                setInputs(selectedInputs);
                
                // Generate random multiplier (1-5)
                const multiplier = Math.floor(Math.random() * 5) + 1;
                
                // Generate random addition/subtraction (-9 to +9, excluding 0)
                let addSubtract = Math.floor(Math.random() * 9) + 1;
                if (addSubtract === 0) addSubtract = 1; // Avoid zero
                
                // Create rule string
                const operation = addSubtract > 0 ? '+ ' : '- ';
                const absValue = Math.abs(addSubtract);
                const ruleString = `${multiplier}x ${operation}${absValue}`;
                setRule(ruleString);
                
                // Calculate outputs based on the rule
                const newOutputs = selectedInputs.map(input => multiplier * input + addSubtract);
                setOutputs(newOutputs);
                
                // Reset revealed outputs and lights
                setRevealedOutputs([false, false, false]);
                setLightType(null);
                
                // Generate choices for the first step
                setTimeout(() => generateChoices(), 0);
        }

        const generateChoices = useCallback(() => {
                // Get current input and correct output
                const currentInput = inputs[currentStep];
                const correctOutput = outputs[currentStep];
                
                // Extract multiplier and addSubtract from the rule
                const ruleMatch = rule.match(/(\d+)x\s([+-])\s(\d+)/);
                const multiplier = parseInt(ruleMatch[1]);
                const operation = ruleMatch[2];
                const value = parseInt(ruleMatch[3]);
                const addSubtract = operation === '+' ? value : -value;
                
                // Generate the three choices
                const choice1 = correctOutput; // Correct answer
                
                // Opposite operation choice
                const oppositeOutput = multiplier * currentInput + (-addSubtract);
                const choice2 = oppositeOutput;
                
                // Off by 1, 2, or 3 choice
                const offset = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
                const direction = Math.random() < 0.5 ? 1 : -1; // + or -
                const choice3 = correctOutput + (offset * direction);
                
                // Shuffle the choices randomly
                const choicesArray = [choice1, choice2, choice3];
                for (let i = choicesArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [choicesArray[i], choicesArray[j]] = [choicesArray[j], choicesArray[i]];
                }
                
                setChoices(choicesArray);
        }, [inputs, currentStep, outputs, rule]);

        const handleButtonClick = (choiceIndex) => {
                const clickedChoice = choices[choiceIndex];
                const correctOutput = outputs[currentStep];
                
                // Check if the clicked choice is correct
                if (clickedChoice === correctOutput) {
                        // Flash green light for correct answer
                        setLightType('correct');
                        setTimeout(() => setLightType(null), 800);
                        
                        // Reveal the current output
                        const newRevealedOutputs = [...revealedOutputs];
                        newRevealedOutputs[currentStep] = true;
                        setRevealedOutputs(newRevealedOutputs);
                        
                        // Check if this was the final step
                        if (currentStep === inputs.length - 1) {
                                // All inputs solved - trigger confetti and reset
                                confetti({
                                        particleCount: 100,
                                        spread: 70,
                                        origin: { y: 0.5 }
                                });
                                
                                // Wait 3 seconds then reset
                                setTimeout(() => {
                                        setCurrentStep(0);
                                        setRevealedOutputs([false, false, false]);
                                        setLightType(null);
                                        generateTable();
                                }, 3000);
                        } else {
                                // Move to next step after a brief delay
                                setTimeout(() => {
                                        setCurrentStep(currentStep + 1);
                                }, 500);
                        }
                } else {
                        // Flash red light for wrong answer
                        setLightType('wrong');
                        setTimeout(() => setLightType(null), 800);
                }
        };

        useEffect(() => {
                generateTable();
        }, []);

        useEffect(() => {
                if (outputs.length > 0) {
                        generateChoices();
                }
        }, [currentStep, outputs, generateChoices]);

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
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>{inputs[0]}</div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>{inputs[1]}</div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>{inputs[2]}</div>
                                </div>
                        </div>

                        {/* Rule Column */}
                        <Machine rule={rule} step={currentStep} lightColor={lightColor} lightType={lightType} />

                        {/* Output Column */}
                        <div className='flex flex-col h-[95%] items-center'>
                                <div className='mb-2 text-center'>
                                        Outputs <br/> (y)
                                </div>
                                <div className='flex flex-col flex-grow justify-between my-2'>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>
                                                {revealedOutputs[0] ? outputs[0] : '?'}
                                        </div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>
                                                {revealedOutputs[1] ? outputs[1] : '?'}
                                        </div>
                                        <div className='w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-md'>
                                                {revealedOutputs[2] ? outputs[2] : '?'}
                                        </div>
                                </div>
                        </div>

                </div>

                {/* Buttons */}
                <div className='w-[100%] pt-3 pb-4 flex justify-center items-center gap-3'>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-gray-200 border border-gray-500 border-2 rounded-lg text-3xl font-extrabold text-gray-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(0)}
                        >{choices[0]}</button>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-gray-200 border border-gray-500 border-2 rounded-lg text-3xl font-extrabold text-gray-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(1)}
                        >{choices[1]}</button>
                        <button 
                                className='count-by-button w-[28%] h-[80px] bg-gray-200 border border-gray-500 border-2 rounded-lg text-3xl font-extrabold text-gray-700 flex justify-center items-center' 
                                onClick={() => handleButtonClick(2)}
                        >{choices[2]}</button>
                </div>
        </Container>
        );
};


export default InputOutputTable;
