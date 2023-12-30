import { Chart, LineSeries } from "lightweight-charts-react-wrapper";
import priceData from '../assets/godh.json';

const data = [...new Map(priceData.data.map(v => {
	const time = v.timestamp/1000
	return [time, { time, value: v.price }];
})).values()];

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
	}
};

const priceFormat = (p) => {
	if(p > 0) return p.toFixed(4)+' HVH';
	return '';
}

const timeFormat = (t) => {
	let d = new Date(t*1000);
	d.setHours(d.getHours() + 9);
	return d.toISOString().replace("T", " ").substring(0, 19);
}

export default function GodhChart() {
	return <>
		<h5 style={{ backgroundColor: '#2B2B43', color: '#D9D9D9', textAlign: 'center' }}>
			Last Update: { timeFormat(priceData.lastUpdate/1000) }
		</h5>

		<Chart 
			container={{ style: { width: '100%', minHeight: '800px' } }}
			autoSize
			localization={{ 
				priceFormatter: priceFormat,
				timeFormatter: timeFormat
			}}
			{ ...options }
		>
			<LineSeries data={data} />
		</Chart>
	</>
}