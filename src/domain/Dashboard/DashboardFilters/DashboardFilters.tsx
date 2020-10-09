import React, { useState } from 'react'
import { Button } from '@material-ui/core';

import styles from './DashboardFilters.module.scss';
import ChipsSelect from '../../../UI/ChipsSelect/ChipsSelect';

interface Props {
    availableDataSources: string[];
    availableCampaigns: string[];
    applyHandler: (dataSources: string[], campaigns: string[]) => void
}

const DashboardFilters: React.FunctionComponent<Props> = (
    { availableDataSources, availableCampaigns, applyHandler }) => {

    const [selectedCampaigns, setCampaign] = useState<string[]>([]);
    const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        applyHandler(selectedDataSources, selectedCampaigns);
    }

    return (
        <div className={styles['dashboard-filters__container']}>
            <div className={styles['dashboard-filters__title']}>Chart Filters</div>
            <div className={styles['form__container']}>
                <div className={styles['form__input']}>
                    <ChipsSelect
                        selectedOptions={selectedDataSources}
                        options={availableDataSources}
                        label="Data sources"
                        onSelectChange={(e) => setSelectedDataSources(e)} ></ChipsSelect>
                </div>
                <div className={styles['form__input']}>
                    <ChipsSelect
                        selectedOptions={selectedCampaigns}
                        options={availableCampaigns}
                        label="Campaigns"
                        onSelectChange={(e) => setCampaign(e)} ></ChipsSelect>

                </div>
                <div className={styles['apply-btn__container']}>
                    <Button className={styles['apply-btn__component']}
                        variant="contained"
                        disableElevation onClick={e => clickHandler(e)}>
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DashboardFilters;
