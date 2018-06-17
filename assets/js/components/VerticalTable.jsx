import React from 'react';
import PropTypes from 'prop-types';
import './VerticalTable.scss';

function VerticalTable({ data, fields }) {
  return (
    <table className='VerticalTable'>
      <tbody>
        {fields.map(({ name, label }) => (
          <tr key={name}>
            <th>{label}</th>
            <td>{data[name]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

VerticalTable.propTypes = {
  data: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default VerticalTable;
