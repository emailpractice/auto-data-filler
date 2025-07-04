import { useState } from 'react';

type Props = {
  onProvidingData: (data: Array<[string, number]> ) => void;
};


export default function StepTwoProvideData({ onProvidingData }: Props) {
  
  const [text, setText] = useState('');

  const handleClick = () => {
    const parsed: [string, number][] = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const [date, valueStr] = line.split(',');
        return [date, Number(valueStr)];
      });

      console.log(parsed)

    onProvidingData(parsed);
  };

  return (
    <div>
      <h2>輸入資料（模式 C）</h2>
      <textarea style={{
    width: '30vw',
    height: '66vh',
    padding: '1rem',
    fontSize: '1.125rem',       // 約等於 text-lg
    lineHeight: '1.75rem',      // leading-relaxed
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
    fontFamily: 'sans-serif',
  }}
        className="dataProvidedA"
        value={text} 
        onChange={(e) => setText(e.target.value)} //這行跟上面都是為了捕捉textarea的文字 然後讓buttont傳送給父元件
        placeholder="格式：
日期1,金額1
日期2,金額2

比如：
114/07/10,888
114/06/10,999"

      />

<button style={{width: '10vw',
    height: '10vh',
    margin: '1rem',
    fontSize: '1.125rem' }} onClick={handleClick}> 填寫完畢，更新資料 </button>


    </div> //一個子元件只能return 一個最外層的div 其他都要塞裡面



  );
}
