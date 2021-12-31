import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import './App.css';

function App() {
  const [clickedNumber, assignValue] = useState<number | null>(null);
  const assignedArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => .5 - Math.random());

  return (
    <div className="App">
      <input type="text" placeholder='Enter Player Name' /><br /><br />
      <InputNumber min={1} max={9} onChange={(newNumber: number) => assignValue(newNumber)} />

      {clickedNumber ?
        <Matrix assignedArray={assignedArray} clickedNumber={clickedNumber} assignValue={assignValue} />
        :
        <div>Enter a number</div>
      }
    </div>
  );
}

interface MatrixProps {
  assignedArray: number[];
  clickedNumber: number | null;
  assignValue: (newclickedNumber: number | null) => void;
}

const Matrix = ({ assignedArray, clickedNumber, assignValue }: MatrixProps) => {
  const [clicked, setclicked] = useState<number[] | []>([]);
  const onChangework = (item: number) => {
    setclicked([...clicked, item]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (clicked.includes(clickedNumber as never)) {
        alert('Hurray..!!! You win!');
        assignValue(null);
        setclicked([]);
      }

      if (clicked.length === 3 && !clicked.includes(clickedNumber as never)) {
        alert('You lose! Retry');
        assignValue(null);
        setclicked([]);
      }
    }, 100)
  }, [clicked]);

  return (
    <div className="blockContainer">
      {assignedArray.map((item: number, index: number) => {
        if (clicked.includes(item as never)) {
          return <div className={item === clickedNumber ? 'block block-right' : 'block block-wrong'} key={index}>{item}</div>
        } else {
          return <div className="block" key={index} onClick={() => onChangework(item)}></div>
        }
      })}
    </div>
  );
}


export default App;
