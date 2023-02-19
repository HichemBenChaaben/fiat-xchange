import { motion } from 'framer-motion';

const ConversionRate = ({ rate }: { rate: string }): JSX.Element => (
  <>
    {rate ? (
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 5 }}
        transition={{ duration: 0.3 }}
      >
        <span className="convert-box-result-rate">x {rate}</span>
      </motion.div>
    ) : null}
  </>
);

export default ConversionRate;
