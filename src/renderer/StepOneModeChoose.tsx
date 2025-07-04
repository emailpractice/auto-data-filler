type Props = {
  onSelectMode: (mode: 'A' | 'B' | 'C') => void;   //子元件可以又提供 mode 又讓父元件傳 mode 回來當渲染的條件。 
  mode: 'A' | 'B' | 'C' | null;               // 因為子元件會先呼叫父元件函數，
                                             // 更新了父元件的mode 然後父元件再觸發重渲染。
};

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

export default function StepOneModeChoose({ onSelectMode,mode }: Props) {
  return (
    <div>
      <h2>請選擇模式</h2>
            <button
  style={buttonStyle(mode === 'A')}
  onClick={() => onSelectMode('A')}
>模式 A</button>

      <button
  style={buttonStyle(mode === 'B')}
  onClick={() => onSelectMode('B')}
>模式 B</button>

            <button
  style={buttonStyle(mode === 'C')}
  onClick={() => onSelectMode('C')}
>模式 C</button>
    </div>
  );
}
