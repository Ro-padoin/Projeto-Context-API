import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const { dataTestid, value, name, id, options, handleChange } = props;

  return (
    <select
      className="filter-numeric"
      data-testid={ dataTestid }
      id={ id }
      name={ name }
      onChange={ handleChange }
      value={ value }
    >
      { options.map((option, i) => (
        <option
          key={ i }
          value={ option }
        >
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  dataTestid: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default Select;
