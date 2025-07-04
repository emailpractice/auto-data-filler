import { useState } from 'react';
import StepOneModeChoose from './StepOneModeChoose.js';
import StepTwoProvideDataA from './StepTwoProvideDataA.js';
import StepTwoProvideDataB from './StepTwoProvideDataB.js';
import StepTwoProvideDataC from './StepTwoProvideDataC.js';
import StepThreeLogIn from './StepThreeLogIn.js';

export default function App() {
  const [step, setStep] = useState(1);  //預設值是1
  const [mode, setSelectedMode] = useState<'A' | 'B' | 'C' | null>('A'); 
  //   const [data, setData] = useState< [string, number] >([]);  這樣寫會被誤認成 tuple 
  const [data, setData] = useState<Array<[string, number]>>([]);   //array這樣寫就已經是雙陣列的資料型別了[[]]

  // 這邊用預設值的語法宣告了 data 的資料結構
  // 原本可以單純提供預設值，讓程式自己判斷型別。 但因為這邊預設是空陣列，所以一定要寫明型別。

//  ['114/07/10', 888],
//  ['114/06/10', 8889],       key value對應的叫做物件 []的叫做陣列

  const buttonStyle = (active: boolean) => ({
    marginRight: 12,
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: active ? '#4f46e5' : '#e5e7eb',
    color: active ? '#ffffff' : '#111827',
    fontWeight: active ? '600' : '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: active ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
  });

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'system-ui, sans-serif',
      color: '#111827',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 上方步驟切換列 */}
      <div style={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
        zIndex: 10
      }}>
        <button onClick={() => setStep(1)} style={buttonStyle(step === 1)}>選擇表單</button>
        <button onClick={() => setStep(2)} style={buttonStyle(step === 2)}>寫入資料</button>
        <button onClick={() => setStep(3)} style={buttonStyle(step === 3)}>登入網頁</button>
      </div>

      {/* 下方內容區塊 */}
      <div style={{
        flexGrow: 1,
        padding: '24px',
        overflowY: 'auto',
        backgroundColor: 'rgb(133, 109, 77)',
        fontSize:'40px'

      }}>
        {step === 1 && (
          <StepOneModeChoose mode={mode} onSelectMode={mode => setSelectedMode(mode)} />   
          // 等於 function onSelectMode (mode)
          //  setSelectedMode(mode)     
          // 子元件負責的任務是呼叫父元件 onSelectMode 。子元件主要是負責提供 mode 作為參數
        )}
        
{step === 2 && mode === 'A' && (
  <StepTwoProvideDataA onProvidingData={data => {
    setData(data);
    console.log('App的data:',data);}
  }/>  
  // 在react中，要讓子元件給父元件一個參數。 
  // 父元件會需要 
  // 1. [data, setData] = useState
  // 2.渲染的子元件後面宣告一個要給子元件呼叫的函數 onProvidingData={data => setData(data)}。 然後在這個函數中呼叫setData 來修改data  
  // 子元件會需要
  // 1.prop 定義子元件預計要呼叫的函數、函數要吃的參數型別
  // 2.還得把預計要呼叫的函數，作為參數傳給自己的函數? function StepTwoProvideData({ onProvidingData }: Props)
)}

{step === 2 && mode === 'B' && (
  <StepTwoProvideDataB
  onProvidingData={data => {
    setData(data);
    console.log('App的dataB:',data);}
    }
  />
)}

{step === 2 && mode === 'C' && (
  <StepTwoProvideDataC
  onProvidingData={data => {
    setData(data);
    console.log('App的dataC:',data);}
    }

  />
)}

        {step === 3 && (
          <StepThreeLogIn />
        )}
      </div>
    </div>
  );
}
