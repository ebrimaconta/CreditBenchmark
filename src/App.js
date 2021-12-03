import React, { useState } from 'react';
import './App.scss';
import lineData from './data.json';
import { dateFunc } from './functions/getDateFunc';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function App() {
  const [lineValue, setlineValue] = useState('PD');
  const getDates = dateFunc().map((value) => value.date);
  const getPD = lineData[0].response.data.map((value) => value[lineValue]);
  const sortFunc = dateFunc('Yes').sort(
    (value) => new Date(value.date) - new Date(value.date)
  );

  const data = {
    labels: getDates,

    datasets: [
      {
        backgroundColor: '#0525b633',
        borderColor: '#2100db',
        label: `${lineValue} Values`,
        data: getPD,
      },
    ],
  };
  let options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            //PD, PDMedianProxyBps, Rating, PDContributionCount and SP data
            document.getElementsByClassName('label-title')[0].innerHTML =
              'Result from the line graphs';
            document.getElementsByClassName('label-PD')[0].innerHTML = `PD : ${
              lineData[0].response.data[context.dataIndex]['PD']
            }`;
            document.getElementsByClassName(
              'label-PDMedianProxyBps'
            )[0].innerHTML = `PDMedianProxyBps: ${
              lineData[0].response.data[context.dataIndex]['PDMedianProxyBps']
            }`;

            document.getElementsByClassName(
              'label-Rating'
            )[0].innerHTML = `Rating: ${
              lineData[0].response.data[context.dataIndex]['Rating']
            }`;

            document.getElementsByClassName(
              'label-PDContributionCount'
            )[0].innerHTML = `PDContributionCount: ${
              lineData[0].response.data[context.dataIndex][
                'PDContributionCount'
              ]
            }`;

            document.getElementsByClassName('label-SP')[0].innerHTML = `SP: ${
              lineData[0].response.data[context.dataIndex]['SP']
            }`;

            if (lineValue === 'PD') {
              const getRating =
                lineData[0].response.data[context.dataIndex]['Rating'];
              return getRating;
            }

            return context.raw;
          },
        },
      },
    },
    scales: {
      y: {
        max: 100,
        min: 0,
      },
    },
  };
  const { name, id, industry, country, region } = lineData[0].response.entity;
  const { PD, PDMedianProxyBps, Rating, PDContributionCount, SP } = sortFunc[0];
  return (
    <div className='App'>
      <h1>CB Dev Test</h1>
      <button
        onClick={() => {
          setlineValue((value) => (value === 'PD' ? 'LGD' : 'PD'));
        }}
      >
        Change to {lineValue === 'PD' ? 'LGD' : 'PD'}
      </button>
      <div className='container'>
        <div className='chart'>
          <Line data={data} options={options} width={'200px'} />
        </div>
        <div className='info-box'>
          <div className=''> Name: {name}</div>
          <div className=''> Id: {id}</div>
          <div className=''>Industry: {industry}</div>
          <div className=''>Country: {country}</div>
          <div className=''>Region: {region}</div>
          <div className='box-latest'>
            <div className=''>Latest Results</div>
            <div className=''>PD : {PD}</div>
            <div className=''>PDMedianProxyBps : {PDMedianProxyBps}</div>
            <div className=''>Rating :{Rating}</div>
            <div className=''>PDContributionCount: {PDContributionCount}</div>
            <div className=''>SP: {SP}</div>
          </div>
          <div className='label-title'></div>
          <div className='label-PD'></div>
          <div className='label-PDMedianProxyBps'></div>
          <div className='label-Rating'></div>
          <div className='label-PDContributionCount'></div>
          <div className='label-SP'></div>
        </div>
      </div>
      <table>
        <tr>
          <th>Date</th>
          <th>PD</th>
          <th>PDMedianProxyBps</th>
          <th>Rating</th>
          <th>LGD</th>
          <th>LGDContributionCount</th>
        </tr>
        {dateFunc('Yes').map((value) => {
          return (
            <tr>
              <td>{value.date}</td>
              <td>{value.PD == null ? 'null' : value.PD}</td>
              <td>
                {value.PDMedianProxyBps == null
                  ? 'null'
                  : value.PDMedianProxyBps}
              </td>
              <td>{value.Rating == null ? 'null' : value.Rating}</td>
              <td>{value.LGD == null ? 'null' : value.LGD}</td>
              <td>
                {value.LGDContributionCount == null
                  ? 'null'
                  : value.LGDContributionCount}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
