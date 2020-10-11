import React from 'react'
import styles from './WelcomePage.module.scss';
import logo from '../../assets/icons/logo.svg';

const WelcomePage: React.FunctionComponent = () => {
    return (
        <div className={styles['welcome-page__container']}>
            This is an entry project for the position of Frontend Developer. App prepared by Pawel Kokocinski.
            To check the result, please go to the Dashboard.
            <br></br>
            <img src={logo} alt="logo" width={'500px'} />
        </div>
    )
}

export default WelcomePage;