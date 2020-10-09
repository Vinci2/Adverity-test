import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import WelcomePage from '../WelcomePage/WelcomePage';
import styles from './MainBody.module.scss';

const MainBody: React.FunctionComponent = () => {
    return (
        <div className={styles['main-body__container']}>
            <Route path="/home" exact component={WelcomePage} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/" exact ><Redirect to="/home" /></Route>
        </div>
    )
}

export default MainBody;
