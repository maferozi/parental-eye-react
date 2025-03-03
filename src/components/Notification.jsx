import { motion } from 'framer-motion';
import React from 'react';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };    




const Notification = ({notifications}) => {
    return (
        <motion.ul       variants={container}
        initial="hidden"
        animate="visible" className='border h-100 p-4 rounded-5 shadow-md overflow-auto scrollbar--custom'>
            <h2>Notifications</h2>
            <div className=''>
            <ul>
                {notifications.map(notification => (
                    <motion.li variants={item} className=' rounded-3 my-3 notification--custom shadow-md '  key={notification.id}><i className='ti ti-bell fs-6 me-2'></i>{notification.message}</motion.li>
                ))}
            </ul>
            </div>
        </motion.ul>
    );
};

export default Notification;