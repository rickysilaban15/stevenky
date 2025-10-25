import React from 'react';
import styles from './LoadingScreen.module.css'; // Impor CSS Modules

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Hapus tag <style jsx> */}
      
      <div className={styles.circ}>
        <div className={styles.load}>Loading . . . </div>
        <div className={styles.hands}></div>
        <div className={styles.body}></div>
        <div className={styles.head}>
          <div className={styles.eye}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;