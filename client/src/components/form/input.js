export default function Input({ type, placeholder, onChange, value, onBlur }) {
  function handleChange(event) {
    const { value } = event.target;
    onChange(value);
  }

  return (
    <>
      <input
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
      />
    </>
  );
}
