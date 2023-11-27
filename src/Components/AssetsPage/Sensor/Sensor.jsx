import GlowingDot from './GlowingDot';

import PropTypes from 'prop-types';

function Sensor({ className, colour }) {
  return (
    <div className={className}>
      <div className='flex justify-center min-w-max items-center relative '>
        <img src='/assets/sensor.png' className='h-8' alt='profile' />
        <GlowingDot className={`absolute bottom-5  border border-${colour}-700`} colour={colour} />
      </div>
    </div>
  );
}

Sensor.propTypes = {
  className: PropTypes.string,
  colour: PropTypes.string,
};

export default Sensor;
