import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../../assets/RnB_logo_classic.png';
// import logoText from '../../../../icons/logoText.svg';

import styles from './logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <Link to='/enviroment'>
      <img className={styles.img} src={logoImg} alt="logo-img" />
      </Link>
      {/* <img className={styles.text} src={logoText} alt="logo-text" /> */}
    </div>
  );
};

export default Logo;