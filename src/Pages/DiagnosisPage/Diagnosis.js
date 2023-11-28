import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowTrendingUpIcon,
  ListBulletIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
} from '@heroicons/react/24/solid';
import TableComponent from '../../Components/Diagnosis/TableComponent';
import BrushGraph from '../../Components/Diagnosis/BrushGraph';
import SpectrumLineGraph from '../../Components/Diagnosis/SpectrumLineGraph';

const tableData = [
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.2',
    tangential: '0.3',
    axial: '0.4',
  },
  {
    frequency: '1.5X',
    radial: '0.2',
    tangential: '0.1',
    axial: '0.3',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
];

function Diagnosis() {
  const [spectraSelect, setSpectraSelect] = useState('velocity spectra'); // velocity, acceleration, ultrasonic, magnetic

  const handleSpectra = (e) => {
    e.preventDefault();
    console.log(e);
    setSpectraSelect(e.target.innerText.toLowerCase());
  };

  const navigate = useNavigate();

  const generateReport = () => {
    navigate('/client/WP-SMS/asset/SMS_60505/NODE1/NDE/report');
  };

  return (
    <div className='flex'>
      {/* left half 80% approx */}
      <div className='w-[70%]'>
        {/* top title sectio  */}
        <div className='flex gap-4 items-center justify-between'>
          <h1 className=' text-lg font-bold whitespace-pre '>
            Vibration- Amplitude Frequency Chart
          </h1>
          <div className='flex divide-x-2 divide-slate-400 gap-5 h-max'>
            <div className='flex-1 text-sm text-left pl-2  items-center whitespace-pre'>
              Rated RPM: 1470
            </div>
            <div className='flex-1 text-sm text-left pl-2  items-center whitespace-pre'>
              Actual RPM: 1440
            </div>
            <div className='flex-1 text-sm text-left pl-2  items-center whitespace-pre'>
              Operating Line Freq: 49.2
            </div>
            <div className='flex-1 text-sm text-left pl-2  items-center whitespace-pre'>
              KW Rating: 9
            </div>
          </div>
        </div>
        {/* spectra selection part  */}
        <div className='flex mt-3 gap-5 '>
          <div className='flex-1 flex'>
            <button
              className={
                spectraSelect === 'velocity spectra'
                  ? 'cursor-pointer w-full bg-blue-400 rounded-2xl shadow-md text-violet-800 font-semibold text-center'
                  : 'bg-slate-200 cursor-pointer w-full hover:bg-blue-400 rounded-2xl shadow-inner hover:shadow-md text-blue-800 hover:text-violet-800 font-semibold text-center'
              }
              onClick={handleSpectra}
            >
              Velocity Spectra
            </button>
          </div>
          <div className='flex-1 flex'>
            <button
              className={
                spectraSelect === 'acceleration spectra'
                  ? 'cursor-pointer w-full bg-blue-400 rounded-2xl shadow-md text-violet-800 font-semibold text-center'
                  : 'bg-slate-200 cursor-pointer w-full hover:bg-blue-400 rounded-2xl shadow-inner hover:shadow-md text-blue-800 hover:text-violet-800 font-semibold text-center'
              }
              onClick={handleSpectra}
            >
              Acceleration Spectra
            </button>
          </div>
          <div className='flex-1 flex'>
            <button
              className={
                spectraSelect === 'ultrasonic spectra'
                  ? 'cursor-pointer w-full bg-blue-400 rounded-2xl shadow-md text-violet-800 font-semibold text-center'
                  : 'bg-slate-200 cursor-pointer w-full hover:bg-blue-400 rounded-2xl shadow-inner hover:shadow-md text-blue-800 hover:text-violet-800 font-semibold text-center'
              }
              onClick={handleSpectra}
            >
              Ultrasonic Spectra
            </button>
          </div>
          <div className='flex-1 flex'>
            <button
              className={
                spectraSelect === 'magnetic spectra'
                  ? 'cursor-pointer w-full bg-blue-400 rounded-2xl shadow-md text-violet-800 font-semibold text-center'
                  : 'bg-slate-200 cursor-pointer w-full hover:bg-blue-400 rounded-2xl shadow-inner hover:shadow-md text-blue-800 hover:text-violet-800 font-semibold text-center'
              }
              onClick={handleSpectra}
            >
              Magnetic Field Spectra
            </button>
          </div>
        </div>

        {/* Time graph section */}
        <div className='mt-5 flex flex-1 flex-col'>
          <div className=''>
            <h1>Vibration- acceleration (m/sec2)</h1>
            <div>
              <SpectrumLineGraph />
            </div>
          </div>
          <div>
            <h1>Amplitude (mm/sec)</h1>
            <div id='graph'>
              <BrushGraph />
            </div>
          </div>
        </div>
      </div>

      {/* right half 30%  approx */}
      <div className='w-[30%]'>
        {/* button section */}
        <div className='flex w-full justify-between px-5 gap-2'>
          {/* button 1  */}
          <div className='flex w-1/3 justify-center items-center gap-3'>
            <button className='w-max bg-blue-300 py-1 shadow-inner rounded-xl'>
              <ArrowTrendingUpIcon className='w-7 text-red-600' />
            </button>
            <div className='shadow-xl rounded-lg flex-1 text-center'>Trends</div>
          </div>

          {/* button 2  */}
          <div className='flex w-1/3 justify-center items-center gap-3'>
            <button className='w-max bg-blue-300 py-1 shadow-inner rounded-xl'>
              <ListBulletIcon className='w-7 text-blue-600' />
            </button>
            <div className='shadow-xl rounded-lg flex-1 text-center'>View List</div>
          </div>

          {/* button 3  */}
          <div className='flex w-1/3 justify-center items-center gap-3'>
            <button className='w-max bg-blue-300 py-1 shadow-inner rounded-xl'>
              <ArrowDownTrayIcon className='w-7 text-green-600' />
            </button>
            <div className='shadow-xl rounded-lg flex-1 text-center'>Downloads</div>
          </div>
        </div>

        {/* data table  */}
        <div className='flex flex-col items-center bg-blue-100 mt-5 ml-5 rounded-xl shadow-xl h-max w-fit'>
          {/* header part  */}
          <div className='w-max flex p-5'>
            <FunnelIcon className='w-7 text-slate-500' />
            <h1 className='text-lg font-semibold text-slate-600 ml-4'>Predominant Frequencies</h1>
          </div>

          <div className='flex w-full mb-2'>
            <div className='flex-1 px-8'>
              <select name='' id='' className='w-full rounded-lg'>
                <option value='null' selected disabled>
                  Select Option
                </option>
                <option value=''>1X</option>
                <option value=''>2X</option>
              </select>
            </div>
            <div className='flex-1 px-8'>
              <select name='' id='' className='w-full rounded-lg'>
                <option value='null' disabled selected>
                  Select Option
                </option>
                <option value=''>1X</option>
                <option value=''>2X</option>
              </select>
            </div>
          </div>

          {/* body part  */}
          <div className='w-max flex flex-col-reverse'>
            <div className='my-2.5 flex justify-center'>
              <button
                className='whitespace-pre bg-white w-max text-green-700 font-semibold rounded-lg'
                onClick={generateReport}
              >
                Generate New Report
              </button>
            </div>
            <div className='my-2 px-5'>
              <TableComponent tableData={tableData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
