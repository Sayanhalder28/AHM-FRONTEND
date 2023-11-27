/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import motor from '../.././assets/motor-nobg.png';
import Sensor from './Sensor/Sensor';
import PropTypes from 'prop-types';

function AssetCard({ assetID, sensorsConnected, sensorIDs, assetType, site, workshop }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [colour, setColour] = useState('');
  const [healthData, setHealthdData] = useState([]);
  const [sensorStatus, setSensorStatus] = useState([]);
  const [deOnlineStatus, setDeOnlineStatus] = useState('');
  const [ndeOnlineStatus, setNdeOnlineStatus] = useState('');
  const [assetOnlineStatus, setAssetOnlineStatus] = useState('');
  const [deHealthColour, setDeHealthColour] = useState('');
  const [ndeHealthColour, setNdeHealthColour] = useState('');
  const [assetHealthColour, setAssetHealthColour] = useState('');

  const navigate = useNavigate();

  const fetchUrls = sensorsConnected.map(
    (sensor) => `/data/sensor/sesor-health?assetId=${assetID}&sensorType=${sensor.sensor_type}`,
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchPromises = fetchUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Request failed');
          }
          // console.log('Response', response);
          return await response.json();
        } catch (error) {
          console.error('Error fetching data from', url, ':', error);
          return null;
        }
      });

      const resolvedPromises = await Promise.all(fetchPromises);
      setHealthdData(resolvedPromises);
      // console.log(resolvedPromises);
    };

    fetchData();
    // setInterval(fetchData, 5000);
  }, []);

  useEffect(() => {
    if (healthData.length) {
      const sensorStatus = healthData.map((sensor) => {
        if (sensor.data.health_status === 'healthy') {
          return 'green';
        } else if (sensor.data.health_status === 'unhealthy') {
          return 'red';
        } else if (sensor.data.health_status === 'unkhown') {
          return 'gray';
        } else {
          return 'orange';
        }
      });
      setSensorStatus(sensorStatus);
    }
  }, [healthData]);

  useEffect(() => {
    if (sensorStatus.length) {
      sensorStatus.map((sensor) => {
        if (sensor === 'green') {
          setColour('green');
          setDeHealthColour('green');
          setNdeHealthColour('green');
          setAssetHealthColour('green');
          setDeOnlineStatus('online');
          setNdeOnlineStatus('online');
          setAssetOnlineStatus('online');
        } else if (sensor === 'red') {
          setColour('red');
          setDeHealthColour('red');
          setNdeHealthColour('red');
          setAssetHealthColour('red');
          setDeOnlineStatus('online');
          setNdeOnlineStatus('online');
          setAssetOnlineStatus('online');
        } else if (sensor === 'gray') {
          setColour('gray');
          setDeHealthColour('gray');
          setNdeHealthColour('gray');
          setAssetHealthColour('gray');
          setDeOnlineStatus('Offline');
          setNdeOnlineStatus('Offline');
          setAssetOnlineStatus('Offline');
        } else {
          setColour('orange');
          setDeHealthColour('orange');
          setNdeHealthColour('orange');
          setAssetHealthColour('orange');
          setDeOnlineStatus('Warning');
          setNdeOnlineStatus('Warning');
          setAssetOnlineStatus('Warning');
        }
      });
    }
  }, [sensorStatus]);

  const handleSensorOne = () => {
    navigate(
      `/client/${workshop}/asset/${assetID}/${sensorsConnected[0].sensor_id}/${sensorsConnected[0].sensor_type}`,
    );
  };

  const handleSensorTwo = () => {
    navigate(
      `/client/${workshop}/asset/${assetID}/${sensorsConnected[1].sensor_id}/${sensorsConnected[1].sensor_type}`,
    );
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <style>
        {`.green{
            background-color: #10B981; 
          }
          .gray{
            background-color: #6B7280; 
          }
          .red{
            background-color: #EF4444; 
          }
          .orange{
            background-color: #F59E0B; 
          }
          `}
      </style>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        <div className='relative rounded-md overflow-hidden shadow-lg hover:shadow-xl'>
          <div
            className={`w-max px-4 text-center rounded-tr-md text-white text-sm font-semibold overflow-hidden ${colour}`}
          >
            {assetID}
          </div>
          <div>
            <div className='h-40 sm:h-48 px-2 pb-2 flex flex-col items-center rounded-tr-lg rounded-b-lg bg-slate-200 border-2 border-slate-300'>
              <div className='flex w-max h-full '>
                <div className='relative w-max h-full flex'>
                  <div className='relative w-max h-full flex'>
                    <div onClick={handleSensorOne}>
                      {
                        // sensor 1
                        sensorStatus[0] === 'green' ? (
                          <Sensor className='absolute left-7 top-10' colour='green' />
                        ) : sensorStatus[0] === 'red' ? (
                          <Sensor className='absolute left-7 top-10' colour='red' />
                        ) : sensorStatus[0] === 'gray' ? (
                          <Sensor className='absolute left-7 top-10' colour='gray' />
                        ) : (
                          <Sensor className='absolute left-7 top-10' colour='orange' />
                        )
                      }
                    </div>
                    <img src={motor} alt='' className='h-full' />
                    <div onClick={handleSensorTwo}>
                      {
                        // sensor 2
                        sensorStatus[1] === 'green' ? (
                          <Sensor className='absolute right-7 top-10' colour='green' />
                        ) : sensorStatus[1] === 'red' ? (
                          <Sensor className='absolute right-7 top-10' colour='red' />
                        ) : sensorStatus[1] === 'gray' ? (
                          <Sensor className='absolute right-7 top-10' colour='gray' />
                        ) : (
                          <Sensor className='absolute right-7 top-10' colour='orange' />
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* online status section section */}
              <div className='flex gap-1 sm:gap-3 h-max w-full items-center justify-around p-1 sm:p-2 bg-slate-300 rounded-xl shadow-inner'>
                <div className='h-max w-1/3 bg-white rounded-xl text-center shadow-inner overflow-hidden'>
                  <p className='text-xs font-bold text-slate-700'>DE</p>
                  <div
                    className={`text-white 
                    ${
                      deHealthColour === 'green'
                        ? 'bg-lime-600'
                        : deHealthColour === 'red'
                        ? 'bg-red-500'
                        : deHealthColour === 'gray'
                        ? 'bg-gray-500'
                        : 'bg-orange-500'
                    }
                   font-semibold`}
                  >
                    {deOnlineStatus}
                  </div>
                </div>
                <div className='h-max w-1/3 bg-white rounded-xl text-center shadow-inner overflow-hidden'>
                  <p className='text-xs font-bold text-slate-700'>NDE</p>
                  <div
                    className={`text-white 
                    ${
                      ndeHealthColour === 'green'
                        ? 'bg-lime-600'
                        : ndeHealthColour === 'red'
                        ? 'bg-red-500'
                        : ndeHealthColour === 'gray'
                        ? 'bg-gray-500'
                        : 'bg-orange-500'
                    }
                    
                   font-semibold`}
                  >
                    {ndeOnlineStatus}
                  </div>
                </div>
                <div className='h-max w-1/3 bg-white rounded-xl text-center shadow-inner overflow-hidden'>
                  <p className='text-xs font-bold text-slate-700'>ASSET</p>
                  <div
                    className={`text-white 
                    ${
                      assetHealthColour === 'green'
                        ? 'bg-lime-600'
                        : assetHealthColour === 'red'
                        ? 'bg-red-500'
                        : assetHealthColour === 'gray'
                        ? 'bg-gray-500'
                        : 'bg-orange-500'
                    }
                   font-semibold`}
                  >
                    {assetOnlineStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <InformationCircleIcon
            className='h-6 absolute text-slate-500 opacity-30 right-0 top-5 m-1 shadow-inner hover:opacity-100'
            onClick={flipCard}
          />
        </div>

        {/* Back of the card */}

        <div
          className={
            'h-full relative bg-white border-2 border-' +
            colour +
            '-500 rounded-2xl overflow-hidden justify content-between first-letter:shadow-sm hover:shadow-lg'
          }
          onClick={flipCard}
        >
          {/* assetID number heading */}
          <div
            className={
              'bg-' + colour + '-100 w-max px-3 rounded-br-2xl text-grey-300 font-semibold '
            }
          >
            {assetID}
          </div>
          {/* contents on the back */}
          <div className={'flex flex-col pb-3 w-full px-5'}>
            {/* sensor ids */}
            <div className='flex flex-col gap-2 py-4 '>
              {/* sensor 1*/}
              <div className='flex gap-x-3 justify-between'>
                <p className='text-xs font-bold whitespace-pre'>SENSOR ID (1): </p>
                <p className={'text-sm font-bold text-' + colour + '-700'}>
                  {
                    // healthData[0]?.data.asset_id
                    sensorIDs[0]
                  }
                </p>
              </div>
              {/* sensor 2*/}
              <div className='flex gap-x-3 justify-between'>
                <p className='text-xs font-bold whitespace-pre'>SENSOR ID (2): </p>
                <p className={'text-sm font-bold text-' + colour + '-700'}>
                  {
                    // healthData[1]?.data.asset_id
                    sensorIDs[1]
                  }
                </p>
              </div>
            </div>
            {/* asset ttype */}
            <div className='flex justify-between pt-1 pb-0 border-t border-slate-400'>
              {/*first box asset */}
              <div className='flex flex-col'>
                <p className='text-xs'>ASSET TYPE</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.asset_type
                    assetType
                  }
                </p>
              </div>
              {/* second box asset */}
              <div className='flex flex-col text-right'>
                <p className='text-xs'>STATUS</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.health_status
                    sensorStatus[0] === 'green' && sensorStatus[1] === 'green'
                      ? 'Healthy'
                      : sensorStatus[0] === 'red' && sensorStatus[1] === 'red'
                      ? 'Unhealthy'
                      : 'Warning'
                  }
                </p>
              </div>
            </div>
            {/* location boxes */}
            <div className='flex justify-between pt-1 border-t border-slate-400'>
              {/*first box location */}
              <div className='flex flex-col'>
                <p className='text-xs'>CLIENT</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.client
                    workshop
                  }
                </p>
              </div>
              {/* second box location */}
              <div className='flex flex-col text-right'>
                <p className='text-xs'>SITE</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.site
                    site
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </>
  );
}

AssetCard.propTypes = {
  assetID: PropTypes.string.isRequired,
  sensorsConnected: PropTypes.array.isRequired,
  sensorIDs: PropTypes.array.isRequired,
  assetType: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  workshop: PropTypes.string.isRequired,
};

export default AssetCard;
