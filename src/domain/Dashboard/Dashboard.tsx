import React, { useEffect, useState } from 'react'
import DashboardChart from './DashboardChart/DashboardChart'
import DashboardFilters from './DashboardFilters/DashboardFilters'
import { getAdvertisingData } from './services/DashboardHttpService'
import styles from './Dashboard.module.scss'
import { getChartData } from './services/DashboardDataParserService'
import {  ChartPoint, DashboardState } from './Dashboard.models'

const Dashboard: React.FunctionComponent = () => {
    const [dashboardState, setState] = useState<DashboardState>();
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [areFiltersHidden, setFiltersHidden] = useState<boolean>(false);

    useEffect(() => {
        getAdvertisingData().then((newDashboardState) => {
            setState(newDashboardState)
            const newChartData = getChartData([], [], newDashboardState.advertisingRecords)
            setChartData(newChartData);
        })
    }, [])

    const filterChangedHandler = (sources: string[], campaigns: string[]): void => {
        const newChartData = getChartData(sources, campaigns, dashboardState?.advertisingRecords);
        setChartData(newChartData);
    }

    const toggleFiltersHandler = () => {
        setFiltersHidden(!areFiltersHidden);
    }

    const filtersToggleClass = areFiltersHidden ? styles['filters__container--hidden'] : '';

    return (
        <div className={styles.dashboard__container}>
            <button onClick={toggleFiltersHandler}>ClickMe</button>
            <div className={`${styles.filters__container} ${filtersToggleClass}`}>
                <DashboardFilters
                    availableDataSources={dashboardState?.availableDataSources || []}
                    availableCampaigns={dashboardState?.availableCampaigns || []}
                    applyHandler={filterChangedHandler}></DashboardFilters>
            </div>

            <div className={styles.chart__container}>
                <DashboardChart chartData={chartData}></DashboardChart>
            </div>
        </div>
    )
}

export default Dashboard;
