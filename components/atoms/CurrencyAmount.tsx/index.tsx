import { forwardRef } from 'react';

interface Props {
  handleChange: (e: any) => void;
  placeholder: string;  
  name: string;
  ref: any;
}
const CurrencyAmount = forwardRef((props: Props, ref) => {
  const { handleChange, name, placeholder, ...rest } = props;
  return (
    <input
      ref={ref}
      type="number"
      name={name}
      autoFocus
      placeholder={placeholder ?  placeholder : '0'}
      onChange={handleChange}
      autoComplete="off"
      {...rest}
    />
  );
});

export default CurrencyAmount;
