import { useEffect, useRef } from 'react';
import StreamingPlugin from 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';
import { generateDumy } from '../../../Utils/DummyDataGenerate';
import { useQueryClient } from 'react-query';

ChartJS.register(StreamingPlugin);

// eslint-disable-next-line react/prop-types, no-unused-vars
function Graph({ sensorData, name }) {
  const data = useRef({
    Temperature: 0,
    Vibration_X: 0,
    Vibration_Y: 0,
    Vibration_Z: 0,
    EMF_X: 0,
    EMF_Y: 0,
    EMF_Z: 0,
    Ultasonic: 0,
  });

  const colourPicker = (data) => {
    return data < 5
      ? 'rgba(101,254,8,0.5)'
      : data < 8
      ? 'rgba(255,200,0,0.5)'
      : 'rgba(255,21,0,0.5)';
  };

  const queryClient = useQueryClient();

  const fetchData = async () => {
    // const response = await fetch("http://sail-backend-env.eba-pmepw6q2.ap-south-1.elasticbeanstalk.com/sensor-data");
    // const data = await response.json();
    const fetchedData = generateDumy();
    // ! when using real data
    // return fetchedData.data.slice(-1)[0].A;

    // ! when using dummy data
    return fetchedData.slice(-1)[0].A;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Manually fetch the data using queryClient and update the 'data' state
      queryClient.fetchQuery('sensor-graph-data', fetchData).then((response) => {
        data.current = response;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <div className='text-center m-2 sm:m-3 py-2 bg-slate-50 rounded-lg'>
      <Line
        className='flex-1 w-full'
        data={{
          datasets: [
            {
              label: 'Dataset 1',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderDash: [0, 0],
              fill: true,
              data: [],
              lineTension: 0.3,
              spanGaps: false,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 1000,
                onRefresh: (chart) => {
                  setTimeout(() => {
                    // variables
                    const dataset = chart.data.datasets[0];
                    const latestData = data.current.Temperature;
                    const statusColour = colourPicker(latestData);
                    // changing data
                    dataset.backgroundColor = statusColour;
                    dataset.borderColor = statusColour;
                    dataset.data.push({
                      x: Date.now(),
                      y: latestData,
                    });
                    //clear old data to save RAM
                    if (dataset.data.length > 13) {
                      dataset.data.shift();
                    }
                  }, 300);
                },
              },
            },
            y: {
              max: 11,
              min: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      <div className='text-xs sm:text-base text-slate-700 font-bold text-center mt-1'>{name}</div>
    </div>
  );
}

export default Graph;
