import React, { useRef, useState } from "react";

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState("클릭해서 시작하세요,");
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage("초록색이 되면 클릭하세요.")
            timeout.current = setTimeout(() => {
                // this.timeout = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
                // this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') {
            clearTimeout(timeout.current);
            // clearTimeout(this.timeout);
            setState('waiting');
            setMessage('너무 일찍 눌렀습니다.');
        } else if (state === 'now') {
            endTime.current = new Date();
            // this.endTime = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.')
            setResult((prevState) => {
                return [...prevState, endTime.current - startTime.current];
                // result: [...prevState.result, this.endTime - this.startTime];
            })
        }
    }
    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    )

}

export default ResponseCheck;