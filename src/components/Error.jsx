const Error = ({ title, message }) => {
  return (
    <div className='error' role='alert'>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
