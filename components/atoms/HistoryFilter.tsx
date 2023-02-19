const HistoryFilter = ({ handleChange }) => {
  const optionsValues = [7, 14, 30];
  return (
    <form>
      <label htmlFor="history">History</label>
      <select name="history" id="history" onChange={handleChange}>
        {optionsValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </form>
  );
};

export default HistoryFilter;
