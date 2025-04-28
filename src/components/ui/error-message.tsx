import { AnimatePresence, motion } from 'motion/react';
import { useFormContext } from 'react-hook-form';

const FormErrorMessage = ({ name, id }: { name: string; id: string }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <AnimatePresence>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          id={id}
          className="error_message"
        >
          {errors?.[name]?.message as string}
        </motion.p>
      )}
    </AnimatePresence>
  );
};
export default FormErrorMessage;
