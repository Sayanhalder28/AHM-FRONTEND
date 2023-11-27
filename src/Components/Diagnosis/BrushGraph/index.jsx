import ReactApexChart from 'react-apexcharts';

const index = () => {
  const data = [
    [1327359600000, 30.95],
    [1327446000000, 31.34],
    [1327532400000, 31.18],
    [1327618800000, 31.05],
    [1327878000000, 31.0],
    [1327964400000, 30.95],
    [1328050800000, 31.24],
    [1328137200000, 31.29],
    [1328223600000, 31.85],
    [1328482800000, 31.86],
    [1328569200000, 32.28],
    [1328655600000, 32.1],
    [1328742000000, 32.65],
    [1328828400000, 32.21],
    [1329087600000, 32.35],
    [1329174000000, 32.44],
    [1329260400000, 32.46],
    [1329346800000, 32.86],
    [1329433200000, 32.75],
    [1329778800000, 32.54],
    [1329865200000, 32.33],
    [1329951600000, 32.97],
    [1330038000000, 33.41],
    [1330297200000, 33.27],
    [1330383600000, 33.27],
    [1330470000000, 32.89],
    [1330556400000, 33.1],
    [1330642800000, 33.73],
    [1330902000000, 33.22],
    [1330988400000, 31.99],
    [1331074800000, 32.41],
    [1331161200000, 33.05],
    [1331247600000, 33.64],
    [1331506800000, 33.56],
    [1331593200000, 34.22],
    [1331679600000, 33.77],
    [1331766000000, 34.17],
    [1331852400000, 33.82],
    [1332111600000, 34.51],
    [1332198000000, 33.16],
    [1332284400000, 33.56],
    [1332370800000, 33.71],
    [1332457200000, 33.81],
    [1332712800000, 34.4],
    [1332799200000, 34.63],
    [1332885600000, 34.46],
    [1332972000000, 34.48],
    [1333058400000, 34.31],
    [1333317600000, 34.7],
    [1333404000000, 34.31],
    [1333490400000, 33.46],
    [1333576800000, 33.59],
    [1333922400000, 33.22],
    [1334008800000, 32.61],
    [1334095200000, 33.01],
    [1334181600000, 33.55],
    [1334268000000, 33.18],
    [1334527200000, 32.84],
    [1334613600000, 33.84],
    [1334700000000, 33.39],
  ];

  const radialData = data.map((item) => {
    return [item[0], (Math.random() * (50 - 10) + 10).toFixed(2)];
  });

  const axialData = data.map((item) => {
    return [item[0], (Math.random() * (50 - 10) + 10).toFixed(2)];
  });

  const TangentialData = data.map((item) => {
    return [item[0], (Math.random() * (50 - 10) + 10).toFixed(2)];
  });

  console.log(radialData);

  const series = [
    {
      data: radialData,
      name: 'Radial',
    },
    {
      data: axialData,
      color: '#FF0000',
      name: 'Tangential',
    },
    {
      data: TangentialData,
      color: '#00FF00',
      name: 'Axial',
    },
  ];

  const options = {
    chart: {
      id: 'chart2',
      type: 'line',
      height: 230,
      toolbar: {
        autoSelected: 'pan',
        show: false,
      },
    },
    colors: ['#546E7A'],
    stroke: {
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    markers: {
      size: 3,
    },
    xaxis: {
      type: 'datetime',
    },
  };

  const seriesLine = [
    {
      data: radialData,
      name: 'Radial',
    },
    {
      data: axialData,
      name: 'Tangential',
    },
    {
      data: TangentialData,
      name: 'Axial',
    },
  ];

  const optionsLine = {
    chart: {
      id: 'chart1',
      height: 110,
      type: 'area',
      brush: {
        target: 'chart2',
        enabled: true,
      },
      selection: {
        enabled: true,
      },
    },
    colors: ['#008FFB'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      tickAmount: 2,
    },
  };

  return (
    <div id='wrapper' className='w-full'>
      <div id='chart-line2'>
        <ReactApexChart options={options} series={series} type='line' height={230} />
      </div>
      <div id='chart-line'>
        <ReactApexChart
          options={optionsLine}
          series={seriesLine}
          type='area'
          height={130}
          isBrush={true}
          selection={true}
        />
      </div>
    </div>
  );
};

export default index;
