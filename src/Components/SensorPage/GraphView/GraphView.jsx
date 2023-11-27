import Graph from './Graph';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line no-unused-vars, react/prop-types
function GraphView({ value, name }) {
  return (
    <div className='flex flex-col gap-3 w-full'>
      {/* upper half  */}
      <div className='flex h-1/2 flex-col sm:flex-row justify-between items-center gap-2 w-full'>
        {/* temperature */}
        <div className='w-full sm:w-2/6 text-center rounded-lg shadow-inner bg-violet-300 '>
          {/* heading section with pop-up message */}
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-red-500 to-blue-500 rounded-t-md relative'>
            TEMPERATURE
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 justify-between items-center w-full border-x-2 border-b-2 border-violet-500 rounded-b-md'>
            <Graph name='SKIN' />
            <Graph name='DE' />
          </div>
        </div>
        {/* vibration section with pop-up message*/}
        <div className='w-full sm:w-4/6 text-center rounded-lg shadow-inner bg-green-300 '>
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-green-500 to-blue-500 rounded-t-md relative'>
            VIBRATION
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 justify-between items-center w-full border-x-2 border-b-2 border-green-500 rounded-b-md'>
            <Graph name='X AXIS' />
            <Graph name='Y AXIS' />
            <Graph name='Z AXIS' />
            <Graph name='PEAK' />
          </div>
        </div>
      </div>
      {/* lower half */}
      <div className='flex h-1/2 flex-col sm:flex-row justify-between items-center gap-2'>
        {/* magnetic flux section with pop-up message*/}
        <div className='w-full sm:w-4/6 text-center rounded-lg shadow-inner bg-blue-300 '>
          <div className='flex justify-center items-center text-white text-xs md:text-base 2xl:text-xl font-bold tracking-wider bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-md relative'>
            MAGNETIC FLUX
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 justify-between items-center border-x-2 border-b-2 border-sky-500 rounded-b-md'>
            <Graph name='X AXIS' />
            <Graph name='Y AXIS' />
            <Graph name='Z AXIS' />
            <Graph name='PEAK' />
          </div>
        </div>
        {/* microphonics section with pop-up message*/}
        <div className='w-full sm:w-2/6 text-center rounded-lg shadow-inner bg-orange-300 '>
          <div className='flex justify-center items-center text-white text-xs md:text-base 2xl:text-xl font-bold  tracking-wider bg-gradient-to-r from-orange-500 to-red-500 rounded-t-md relative'>
            MICROPHONICS
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 justify-between items-center w-full border-x-2 border-b-2 border-orange-500 rounded-b-md'>
            <Graph name='ULTRA_SOUND' />
            <Graph name='SPL' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphView;
