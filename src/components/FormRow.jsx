const FormRow = ({ type, name, labelText, value, onChange, required }) => {
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {labelText || name}
      </label>
      <input
        className='form-input'
        type={type}
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormRow;
