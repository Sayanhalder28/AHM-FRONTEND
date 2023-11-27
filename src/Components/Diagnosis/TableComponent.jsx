import PropTypes from 'prop-types';

function TableComponent({ tableData }) {
  return (
    <div className='rounded-lg border shadow-2xl w-full'>
      <table className='border-separate border-gray-400 border-2 rounded-xl'>
        <thead>
          <tr>
            <th className='whitespace-pre px-1'>Frequency (Hz)</th>
            <th className='whitespace-pre px-1'>Radial</th>
            <th className='whitespace-pre px-1'>Tangential</th>
            <th className='whitespace-pre px-1'>Axial</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, index) => {
            return (
              <tr key={index}>
                <td className='border text-center'>{data.frequency}</td>
                <td className='border text-center'>{data.radial}</td>
                <td className='border text-center'>{data.tangential}</td>
                <td className='border text-center'>{data.axial}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

TableComponent.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      frequency: PropTypes.number.isRequired,
      radial: PropTypes.number.isRequired,
      tangential: PropTypes.number.isRequired,
      axial: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TableComponent;
