import React, { useState, useEffect } from 'react';
import HealthBar from '../../Components/SensorPage/HealthBar/HealthBar';
import TModal from '../../Utils/TModal';
import ThresholdForm from '../../Components/Forms/ThresholdForm';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import RadarChart from '../../Components/SensorPage/RadarChart/RadarChart';
import AnalogView from '../../Components/SensorPage/AnalogView/AnalogView';
import GraphView from '../../Components/SensorPage/GraphView/GraphView';
import Diagnosis from '../DiagnosisPage/Diagnosis';
import { useParams } from 'react-router-dom';
import Loading from '../../Utils/Loading';
import { useQuery } from 'react-query';
import API_URL from '../../config';

function Sensor() {
  const [graphView, setGrapgView] = useState(false);
  const [diagonisisView, setDiagonisisView] = useState(false);

  // get asset id and sensor type from this page url
  // /client/:workshopCode/asset/:assetId/sensor/:sensorType
  const { assetId, sensorType, sensorId } = useParams();

  const handleToggle = () => {
    if (graphView) {
      setGrapgView(false);
    } else if (!graphView) {
      setGrapgView(true);
    }
  };

  const handleDiagonisisToggle = () => {
    if (diagonisisView) {
      setDiagonisisView(false);
    } else if (!diagonisisView) {
      setDiagonisisView(true);
    }
  };

  const [sensorData, setAnalogData] = React.useState({
    temperature: 0,
    vibration_x: 0,
    vibration_y: 0,
    vibration_z: 0,
    vibration_peak: 0,
    magnetic_flux_x: 0,
    magnetic_flux_y: 0,
    magnetic_flux_z: 0,
    magnetic_flux_peak: 0,
    ultrasound: 0,
    ultrasound_delta: 0,
    time_stamp: 0,
    health: '',
  });

  const [thresholdData, setThresholdData] = React.useState({
    temperature_min: 0,
    temperature_healthy: 75,
    temperature_warning: 85,
    temperature_max: 100,
    vibration_min: 0,
    vibration_healthy: 5,
    vibration_warning: 8,
    vibration_max: 11,
    ultrasound_min: 0,
    ultrasound_healthy: 5,
    ultrasound_warning: 8,
    ultrasound_max: 11,
    magnetic_flux_min: 0,
    magnetic_flux_healthy: 5,
    magnetic_flux_warning: 8,
    magnetic_flux_max: 11,
  });

  const [formattedTimeStamp, setFormattedTimeStamp] = React.useState('');

  const fetchAnalogData = async () => {
    const res = await fetch(`${API_URL}/data/sensor/sensor-data?assetId=${assetId}&sensorType=${sensorType}`);
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading } = useQuery('sensorData', fetchAnalogData, {
    refetchInterval: 4000,
  });

  useEffect(() => {
    const fetchAnalogThreshold = async () => {
      const res = await fetch(`${API_URL}/data/sensor/sensor-threshold?sensorId=${sensorId}`).then((res) =>
        res.json(),
      );
      const data = await res;
      return data.data;
    };

    fetchAnalogThreshold().then((data) => {
      if (data) {
        setThresholdData({
          temperature_min: data[0].temperature_min,
          temperature_healthy: data[0].temperature_healthy,
          temperature_warning: data[0].temperature_warning,
          temperature_max: data[0].temperature_max,
          vibration_min: data[0].vibration_min,
          vibration_healthy: data[0].vibration_healthy,
          vibration_warning: data[0].vibration_warning,
          vibration_max: data[0].vibration_max,
          ultrasound_min: data[0].ultrasound_min,
          ultrasound_healthy: data[0].ultrasound_healthy,
          ultrasound_warning: data[0].ultrasound_warning,
          ultrasound_max: data[0].ultrasound_max,
          magnetic_flux_min: data[0].magnetic_flux_min,
          magnetic_flux_healthy: data[0].magnetic_flux_healthy,
          magnetic_flux_warning: data[0].magnetic_flux_warning,
          magnetic_flux_max: data[0].magnetic_flux_max,
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      setAnalogData({
        temperature: data.temperature,
        vibration_x: data.vibration_x,
        vibration_y: data.vibration_y,
        vibration_z: data.vibration_z,
        vibration_peak: data.vibration_peak,
        magnetic_flux_x: data.magnetic_flux_x,
        magnetic_flux_y: data.magnetic_flux_y,
        magnetic_flux_z: data.magnetic_flux_z,
        magnetic_flux_peak: data.magnetic_flux_peak,
        ultrasound: data.ultrasound,
        ultrasound_delta: data.ultrasound_delta,
        time_stamp: data.time_stamp,
        health: data.health_status,
      });
    }
  }, [data]);

  useEffect(() => {
    if (sensorData.time_stamp) {
      // Create a JavaScript Date object from the timestamp
      const date = new Date(sensorData.time_stamp);

      // Format the date and time
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      });

      const formattedTime = date.toLocaleTimeString('en-In', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'UTC',
      });

      // Combine date and time
      const formattedDateTime = `${formattedDate} ${formattedTime}`;

      // Update the state with the formatted date and time
      setFormattedTimeStamp(formattedDateTime);
    }
  }, [sensorData.time_stamp]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <Loading />
          <div className='text-gray-900 font-bold text-xl mt-4'>Loading...{formattedTimeStamp}</div>
        </div>
      </div>
    );
  }
  return (
    <div className='px-4 md:px-10 pt-3 '>
      <div className='flex flex-nowrap justify-between items-center'>
        <div>
          <p className='text-gray-800 text-2xl font-bold'>
            {diagonisisView ? 'Diagnosis' : 'Sensor'}
          </p>
          <p className='text-gray-600 text-base font-semibold'>{window.location.pathname}</p>
        </div>
        <div className='flex gap-3'>
          {/* other options */}
          <TModal>
            <ThresholdForm />
          </TModal>

          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-max h-max m-auto'
            onClick={handleDiagonisisToggle}
          >
            {diagonisisView ? 'Sensor View' : 'Diagnosis'}
          </button>
          {diagonisisView ? null : (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-max h-max m-auto'
              onClick={handleToggle}
            >
              {graphView ? 'Gauge View' : 'Graph View'}
            </button>
          )}
        </div>
      </div>
      {/* sensor details section  */}
      <section className='w-full py-3 sm:sticky top-16 z-40 bg-slate-50 bg-opacity-40 backdrop-blur-sm'>
        {/* device description */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center'>
          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Address
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              Section-A
            </div>
          </div>

          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Application
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              Cooling Tower
            </div>
          </div>
          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Asset
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              Spiral Fan
            </div>
          </div>
          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              MUID
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              XYZ-1232323
            </div>
          </div>
          <div className='rounded-lg w-full h-full col-span-2 lg:col-span-1 m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Health status
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              <HealthBar />
            </div>
          </div>
        </div>
      </section>
      {/* monitor section */}
      <section className='w-full'>
        {/* analogue dials for displaying sensor data */}
        {/* {graphView ? <GraphView/>: <AnalogView />} */}
        {/* {graphView ? <GraphView/>: <AnalogView />} */}
        {/* {graphView ? <GraphView /> : <AnalogView />} */}
        {diagonisisView ? (
          <Diagnosis />
        ) : graphView ? (
          <GraphView />
        ) : (
          <AnalogView sensorData={sensorData} thresholdData={thresholdData} />
        )}
      </section>
      {/* alert summery, operating parameters, asset health  */}
      <section className='w-full my-5'>
        <div className='flex flex-col sm:flex-row gap-2 '>
          {/* alert summery  */}
          <div className='flex flex-col h-72 w-full text-center rounded-lg shadow-lg bg-slate-400'>
            {/* heading secton with pop up  */}
            <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-sky-600 rounded-t-md relative'>
              ALERT SUMMERY
              <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
              {/* pop up massamge  */}
              <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-9 hidden peer-hover:block '>
                <p className='font-medium'>Last 24 hours alerts</p>
              </div>
            </div>
            {/* alert summery box */}
            <div className=' w-full h-full flex flex-col gap-3 items-center p-7 justify-start border-x-2 border-b-2 border-slate-500 rounded-b-md overflow-y-auto'>
              {/* alert 1  */}
              <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
                <img src='/assets/alert.png' alt='alert sign' className='h-12'></img>
                <div className=' w-full flex justify-between gap-2 ml-2'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
                    Unhealthy Vibration Detected
                  </p>
                  <p className='text-xs font-medium text-gray-600'>2 days ago</p>
                </div>
              </div>
              {/* alert 2  */}
              <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
                <img src='/assets/alert.png' alt='alert sign' className='h-12'></img>
                <div className=' w-full flex justify-between gap-2 ml-2'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
                    Unhealthy Magnetic Flux Detected
                  </p>
                  <p className='text-xs font-medium text-gray-600'>2 days ago</p>
                </div>
              </div>
              {/* alert 1  */}
              <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
                <img src='/assets/alert.png' alt='alert sign' className='h-12'></img>
                <div className=' w-full flex justify-between gap-2 ml-2'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
                    Unhealthy Vibration Detected
                  </p>
                  <p className='text-xs font-medium text-gray-600'>2 days ago</p>
                </div>
              </div>
              {/* alert 2  */}
              <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
                <img src='/assets/alert.png' alt='alert sign' className='h-12'></img>
                <div className=' w-full flex justify-between gap-2 ml-2'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
                    Unhealthy Vibration Detected
                  </p>
                  <p className='text-xs font-medium text-gray-600'>2 days ago</p>
                </div>
              </div>
              {/* alert 1  */}
              <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
                <img src='/assets/alert.png' alt='alert sign' className='h-12'></img>
                <div className=' w-full flex justify-between gap-2 ml-2'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
                    Unhealthy Vibration Detected
                  </p>
                  <p className='text-xs font-medium text-gray-600'>2 days ago</p>
                </div>
              </div>
              {/* alert 2  */}
              <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
                <img src='/assets/alert.png' alt='alert sign' className='h-12'></img>
                <div className=' w-full flex justify-between gap-2 ml-2'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
                    Unhealthy Vibration Detected
                  </p>
                  <p className='text-xs font-medium text-gray-600'>2 days ago</p>
                </div>
              </div>
            </div>
          </div>
          {/* Asset health  */}
          <div className='flex flex-col h-72 w-full text-center rounded-lg shadow-lg bg-slate-200'>
            {/* heading secton with pop up  */}
            <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-green-600 rounded-t-md relative'>
              HEALTH STATUS
            </div>
            <div className='flex flex-col items-center p-4 w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
              <div>
                <div className='flex gap-5 justify-between'>
                  <p className='text-blue-800 text-lg font-bold tracking-wider'>Health status :</p>
                  <p
                    className={`${
                      sensorData.health === 'healthy'
                        ? 'bg-green-500'
                        : sensorData.health === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    } text-base font-semibold tracking-wider capitalize px-5`}
                  >
                    {sensorData.health}
                  </p>
                </div>
                <div className='flex gap-5 justify-between'>
                  <p className='text-blue-800 text-lg font-bold tracking-wider'>Updated At :</p>
                  <p className='text-gray-800 text-base font-semibold tracking-wider'>
                    {formattedTimeStamp}
                  </p>
                </div>
              </div>

              <div className='flex justify-center items-center'>
                <RadarChart />
                <div className='flex flex-col gap-3'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
                    Diagnosis Page
                  </button>
                  <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full'>
                    Doanload Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* operating parameters  */}
          <div className='flex flex-col h-72 w-full text-center rounded-lg shadow-lg bg-slate-200'>
            {/* heading secton with pop up  */}
            <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-orange-600 rounded-t-md relative'>
              OPERATING PARAMETERS
            </div>
            {/* parameter box */}
            <div className='flex flex-row flex-wrap gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
              <div className='bg-white shadow-inner rounded-xl p-4 w-32'>
                <p className='text-blue-800 text-lg font-bold tracking-wider'>Vibration</p>
                <p className='text-gray-800 text-base font-semibold tracking-wider'>1.2 mm/s</p>
              </div>
              <div className='bg-white shadow-inner rounded-xl p-4 w-32'>
                <p className='text-blue-800 text-lg font-bold tracking-wider'>RPM</p>
                <p className='text-gray-800 text-base font-semibold tracking-wider'>1750</p>
              </div>
              <div className='bg-white shadow-inner rounded-xl p-4 w-32'>
                <p className='text-blue-800 text-sm font-bold tracking-wider'>Line Frequency</p>
                <p className='text-gray-800 text-base font-semibold tracking-wider'>55</p>
              </div>
              <div className='bg-white shadow-inner rounded-xl p-4 w-32'>
                <p className='text-blue-800 text-lg font-bold tracking-wider'>Current</p>
                <p className='text-gray-800 text-base font-semibold tracking-wider'>10 A</p>
              </div>
              <div className='bg-white shadow-inner rounded-xl p-4 w-32'>
                <p className='text-blue-800 text-lg font-bold tracking-wider'>Power</p>
                <p className='text-gray-800 text-base font-semibold tracking-wider'>4300 kw</p>
              </div>
              <div className='bg-white shadow-inner rounded-xl p-4 w-32'>
                <p className='text-blue-800 text-lg font-bold tracking-wider'>Voltage</p>
                <p className='text-gray-800 text-base font-semibold tracking-wider'>430v</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sensor;
