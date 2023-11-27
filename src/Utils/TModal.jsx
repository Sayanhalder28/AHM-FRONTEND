import React, { useState, cloneElement } from 'react';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function TModal({ children }) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => cloneElement(child, { visible, handleClose }));
  };
  return (
    <div>
      <button onClick={handleVisible}>
        <AdjustmentsVerticalIcon className='w-12 rounded-full p-2 bg-slate-100 text-gray-500 shadow-md' />
      </button>
      {renderChildren()}
    </div>
  );
}

TModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TModal;
