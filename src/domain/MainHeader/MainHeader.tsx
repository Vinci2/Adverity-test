import React from 'react'
import styles from './MainHeader.module.scss';
import logo from '../../assets/icons/brand-logo.svg';
import { Link, } from 'react-router-dom';

const MainHeader: React.FunctionComponent = () => {
    return (
        <div className={styles['main-header__container']}>
            <div className={styles['main-header__brand-container']}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles['main-header__menu-container']}>
                <Link to="/"><span className={styles['main-header__link']}>HOME</span></Link>
                <Link to="/dashboard"><span className={styles['main-header__link']}>DASHBOARD</span></Link>
            </div>
        </div>
    )
}

export default MainHeader;
