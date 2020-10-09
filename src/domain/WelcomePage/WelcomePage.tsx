import React from 'react'
import { Link } from 'react-router-dom'
import styles from './WelcomePage.module.scss';

const WelcomePage: React.FunctionComponent = () => {
    return (
        <div className={styles['welcome-page__container']}>
            This is entry project for position of Frontend Developer. App prepared by Pawel Kokocinski.
            Please go to Dashboard
            <div>
                <Link to={'/dashboard'}>Go to dashboard</Link>
            </div>
        </div>
    )
}

export default WelcomePage;