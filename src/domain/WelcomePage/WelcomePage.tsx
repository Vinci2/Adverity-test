import React from 'react'
import { Link } from 'react-router-dom'
import styles from './WelcomePage.module.scss';

export default function WelcomePage() {
    return (
        <div className={styles['welcome-page__container']}>
            This is  entry test for adverity company. Test prepared by Pawel Kokociński.
            Please go to Dashboard
            <div>
                <Link to={'/dashboard'}>Go to dashboard</Link>

            </div>
        </div>
    )
}
