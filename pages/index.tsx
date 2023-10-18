declare global {
  interface Window {
      dataLayer: Record<string, any>[];
  }
}

export default function Home() {
  const sendEventToDataLayer = (event: string, payload: object) => {
    window.parent.postMessage({
        type: 'collect',
        event,
        ...payload
    }, '*');

    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event,
            ...payload,
        });
    }
  };

  const handleClick = (event: string) => {
    switch (event) {
      case 'calculator_arrive':
        sendEventToDataLayer('calculator_arrive', {
          referredBy: 'referredById',
          calculatorAccountId: 'calculatorAccountId',
        });
        break;
      case 'calculator_stay':
        sendEventToDataLayer('calculator_stay', {
          calculatorAccountId: 'calculatorAccountId',
        });
        break;
      case 'calculator_play':
        sendEventToDataLayer('calculator_play', {
          calculatorAccountId: 'calculatorAccountId',
        });
        break;
      case 'calculator_summary':
        sendEventToDataLayer('calculator_summary', {
          calculatorAccountId: 'calculatorAccountId',
        });
        break;
    }
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="flex gap-3 m-auto">
        <button type="button" className="border-2 p-2 rounded-lg" onClick={() => handleClick('calculator_arrive')}>calculator_arrive</button>
        <button type="button" className="border-2 p-2 rounded-lg" onClick={() => handleClick('calculator_stay')}>calculator_stay</button>
        <button type="button" className="border-2 p-2 rounded-lg" onClick={() => handleClick('calculator_play')}>calculator_play</button>
        <button type="button" className="border-2 p-2 rounded-lg" onClick={() => handleClick('calculator_summary')}>calculator_summary</button>
      </div>
    </main>
  )
}
