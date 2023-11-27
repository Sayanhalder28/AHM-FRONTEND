// import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, cloneElement } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function Modal({ children }) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(true);
    console.log('visible');
  };

  const handleClose = () => {
    setVisible(false);
    console.log('close');
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => cloneElement(child, { visible, handleClose }));
  };

  return (
    <div>
      <button onClick={handleVisible} className='p-0 m-0'>
        <PlusIcon className='w-12 rounded-full p-2 hover:p-1 bg-slate-200 text-gray-500 hover:text-gray-600 shadow-inner hover:shadow-sm' />
      </button>
      {renderChildren()}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
