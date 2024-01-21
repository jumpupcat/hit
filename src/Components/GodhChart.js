import { useState, useEffect, useRef } from "react";
import { Chart, LineSeries } from "lightweight-charts-react-wrapper";
import chartData from '../assets/chartData.json';

const dataFormat = data => [...new Map(data.data.map(v => {
	const time = v.timestamp/1000
	return [time, { time, value: v.price }];
})).values()]

const options = {
	layout: {
		background: {
			type: 'solid',
			color: '#2B2B43',
		},
		lineColor: '#2B2B43',
		textColor: '#D9D9D9',
	},
	watermark: {
		color: 'rgba(0, 0, 0, 0)',
	},
	crosshair: {
		color: '#758696',
	},
	grid: {
		vertLines: {
			color: '#2B2B43',
		},
		horzLines: {
			color: '#363C4E',
		},
	},
};

const timeFormat = (t) => {
	let d = new Date(t*1000);
	d.setHours(d.getHours() + 9);
	return d.toISOString().replace("T", " ").substring(0, 19);
}

const tokenList = ['GODH', 'HH'];
export default function GodhChart() {
	const [symbolNum, setSymbolNum] = useState(0);
	const ref = useRef();

	useEffect(() => {
		ref.current?.timeScale().scrollToPosition(0);
	}, [symbolNum])
	

	const priceFormat = (p) => {
		if(p > 0) {
			return p.toFixed(6) + ` ${chartData[tokenList[symbolNum]].tokenA}`;
		}
		return '';
	}

	return <>
		<div 
			style={{
				display: 'flex',
				justifyContent: 'space-evenly',
				backgroundColor: '#2B2B43', 
			}}
			onClick={() => setSymbolNum(n => (n+1) % tokenList.length)}
		>
			<h5 style={{ color: '#D9D9D9' }}>
				${ tokenList[symbolNum] } / ${chartData[tokenList[symbolNum]].tokenA}
			</h5>

			<h5 style={{ color: '#D9D9D9' }}>
				Last Update: { timeFormat(chartData.lastUpdate/1000) }
			</h5>
		</div>

		<Chart 
			container={{ style: { width: '100%', minHeight: '800px' } }}
			autoSize
			localization={{ 
				priceFormatter: priceFormat,
				timeFormatter: timeFormat
			}}
			{ ...options }
			ref={ref}
		>
			<LineSeries 
				data={dataFormat(chartData[tokenList[symbolNum]])} 
				reactive={true}
				
			/>
		</Chart>
	</>
}