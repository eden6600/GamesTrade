import Loader from 'react-loader-spinner';

import React from 'react';

function Spinner({
  type = 'Oval',
  color = '#17a2b8',
  height = '75',
  width = '75'
}) {
  return (
    <div className="text-center mt-3">
      <Loader type={type} color={color} height={height} width={width} />
    </div>
  );
}

export default Spinner;
