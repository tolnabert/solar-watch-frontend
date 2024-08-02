const FormRow = ({ type, name, labelText, value, placeholder, onChange, required }) => {
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
        placeholder={placeholder ?? ""}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormRow;
