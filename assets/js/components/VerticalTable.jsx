import React from 'react';
import PropTypes from 'prop-types';
import { kebabCaseToLabel } from '../utils';

function VerticalTable({ data, fields }) {
  return (
    <table>
      <tbody>
        {fields.map(({ label, variable}) => (
          <tr key={variable}>
            <th>{label || kebabCaseToLabel(variable)}</th>
            <td>{data[variable]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

VerticalTable.propTypes = {
  data: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    variable: PropTypes.string.isRequired,
    label: PropTypes.string,
  })),
};

export default VerticalTable;
