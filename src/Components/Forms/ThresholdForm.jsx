/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
// import SensorTable from "./DataFillThres/SensorTable";
// import SetThreshold from "./DataFillThres/SetThreshold";

function ThresholdForm({ visible, handleClose }) {
  //   const thresholdOptions = ["Acceleration", "Velocity"];
  //   const [thresholdOption, setThresholdOption] = useState(thresholdOptions[0]);
  //   const sensorGroup = [
  //     "Temperature",
  //     "Vibration",
  //     "Magnetic Flux",
  //     "Microphonics",
  //   ];
  //   const machineRating = ["< 15KW", "15KW - 75KW", "> 75KW"];

  //     const handleOption = (option) => {
  //         console.log(option);
  //         return () => {
  //             // find the index of the selected option
  //             const index = thresholdOptions.findIndex((item) => item === option);
  //             // set the threshold option to the selected option
  //             setThresholdOption(thresholdOptions[index]);
  //         };
  //     };
  const [determinationCriteria, setDeterminationCriteria] = useState('Acceleration');
  const [sensorRanges, setSensorRanges] = useState({
    startRange: '',
    endRange: '',
    greenZone: '',
    yellowZone: '',
    redZone: '',
  });
  const [thresholdValues, setThresholdValues] = useState({
    rating: '',
    greenZone: '',
    yellowZone: '',
    redZone: '',
  });

  const handleCriteriaChange = (event) => {
    setDeterminationCriteria(event.target.value);
  };

  const handleSensorRangeChange = (event) => {
    const { name, value } = event.target;
    setSensorRanges((prevRanges) => ({
      ...prevRanges,
      [name]: value,
    }));
  };

  const handleThresholdChange = (event) => {
    const { name, value } = event.target;
    setThresholdValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Add logic to save the form data
  };

  const handleEdit = (event) => {
    event.preventDefault();
    // Add logic to edit the form data
  };

  if (!visible) return null;
  return (
    <section className='absolute inset-0 bg-slate-200 bg-opacity-20 backdrop-blur-sm z-50 h-full flex justify-center'>
      <form
        className='sm:w-full md:w-7/12 p-6 pt-10 border rounded-lg shadow-md bg-white absolute top-20'
        onSubmit={handleSave}
      >
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => {
              handleClose();
            }}
            className='relative bottom-7 left-3 p-1 bg-blue-400 hover:bg-blue-900 w-min rounded-full'
          >
            <XMarkIcon className='w-5 text-white' />
          </button>
        </div>
        <h1 className='text-center text-gray-700 text-3xl font-bold mb-5 -mt-5'>
          Sensor Threshold Value
        </h1>
        {/* Fault determination criteria */}
        <div className='mb-4'>
          <label className='block font-medium'>Fault Determination Criteria:</label>
          <select
            className='w-full p-2 border rounded'
            value={determinationCriteria}
            onChange={handleCriteriaChange}
          >
            <option value='Acceleration'>Acceleration</option>
            <option value='Velocity'>Velocity</option>
          </select>
        </div>

        {/* Sensor Ranges */}
        <div className='mb-4'>
          <label className='block font-medium'>Sensor Ranges:</label>

          <div className='flex flex-col'>
            {/* Temperature */}
            <label className='text-base text-slate-500'>Temperature</label>
            <div className='mb-2 flex'>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Start Range</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='text-sm text-slate-400'>End Range</label>
                  <input
                    type='number'
                    name='endRange'
                    value={sensorRanges.endRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Green Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Yellow Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Red Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
            </div>
            {/* vibration */}
            <label className='text-base text-slate-500'>Vibration</label>
            <div className='mb-2 flex'>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Start Range</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='text-sm text-slate-400'>End Range</label>
                  <input
                    type='number'
                    name='endRange'
                    value={sensorRanges.endRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Green Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Yellow Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Red Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
            </div>
            {/* magnetic flux */}
            <label className='text-base text-slate-500'>Magnetic Flux</label>
            <div className='mb-2 flex'>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Start Range</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='text-sm text-slate-400'>End Range</label>
                  <input
                    type='number'
                    name='endRange'
                    value={sensorRanges.endRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Green Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Yellow Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Red Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
            </div>
            {/* Microphonics */}
            <label className='text-base text-slate-500'>Microphonics</label>
            <div className='mb-2 flex'>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Start Range</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='text-sm text-slate-400'>End Range</label>
                  <input
                    type='number'
                    name='endRange'
                    value={sensorRanges.endRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Green Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Yellow Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
              <div className='w-1/4'>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Red Zone</label>
                  <input
                    type='number'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
                <div className='mr-2 w-1/2'>
                  <label className='text-sm text-slate-400'>Remarks</label>
                  <input
                    type='text'
                    name='startRange'
                    value={sensorRanges.startRange}
                    onChange={handleSensorRangeChange}
                    className='w-full p-2 border rounded'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Repeat similar structure for other sensor ranges */}
        </div>

        {/* Threshold Values */}
        {/* <div className="mb-4">
          <label className="block font-medium">Threshold Values:</label>
          {/* Add input fields for threshold values here */}
        {/* </div> */}

        {/* Save and Edit buttons */}
        <div className='flex justify-end'>
          <button type='submit' className='px-4 py-2 mr-2 bg-blue-500 text-white rounded'>
            Save
          </button>
          <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded' onClick={handleEdit}>
            Edit
          </button>
        </div>
      </form>
    </section>
  );
}

ThresholdForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ThresholdForm;
