import React from 'react';
import { motion } from 'framer-motion';
import Portal from '../atoms/Portal';

interface IToasterProps {
  message: string;
}

const Toaster: React.FC<IToasterProps> = ({ message }): JSX.Element => {
  const toastVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Portal>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={toastVariants}
        transition={{ duration: 0.3 }}
        style={{
          zIndex: 999,
          position: 'fixed',
          top: '10px',
          left: '50%',
          right: '0',
          width: '200px',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: '#fff',
          padding: '1rem',
          borderRadius: '0.5rem',
        }}
      >
        {message}
      </motion.div>
    </Portal>
  );
};

export default Toaster;
