import React, { useEffect, useState } from 'react'
import DashboardChart from './DashboardChart/DashboardChart'
import DashboardFilters from './DashboardFilters/DashboardFilters'
import { getAdvertisingData } from './services/DashboardHttpService'
import styles from './Dashboard.module.scss'
import { getChartData } from './services/DashboardDataParserService'

export default function Dashboard() {
    const [state, setState] = useState<any>({});
    const [chartData, setChartData] = useState<any[]>([]);
    const [areFiltersHidden, setFiltersHidden] = useState<boolean>(false);

    useEffect(() => {
        getAdvertisingData().then((newDashboardState) => {
            console.log('NEW DATA: ', newDashboardState);
            setState(newDashboardState)
            const newChartData = getChartData([], [], newDashboardState.chartData)
            setChartData(newChartData);
        })
    }, [])

    const filterChangedHandler = (sources: string[], campaigns: string[]): void => {
        const newChartData = getChartData(sources, campaigns, state.chartData);
        console.log('NEW CHART DATA: ', newChartData);
        setChartData(newChartData);
    }

    const toggleFiltersHandler = () => {
        setFiltersHidden(!areFiltersHidden);
    }

    const filtersToggleClass = areFiltersHidden ? styles['filters__container--hidden'] : '';

    console.log('filtersToggleClass', filtersToggleClass);

    return (
        <div className={styles.dashboard__container}>
            <button onClick={toggleFiltersHandler}>ClickMe</button>
            <div className={`${styles.filters__container} ${filtersToggleClass}`}>
                <DashboardFilters
                    availableDataSources={state.availableSources || []}
                    availableCampaigns={state.availableCampaigns || []}
                    applyHandler={filterChangedHandler}></DashboardFilters>
            </div>

            <div className={styles.chart__container}>
                <DashboardChart chartData={chartData}></DashboardChart>
            </div>
        </div>
    )
}
