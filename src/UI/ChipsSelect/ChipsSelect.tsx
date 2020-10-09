import { Select, Chip, MenuItem, InputLabel, Input } from '@material-ui/core';
import React, { Fragment } from 'react'
import styles from './ChipsSelect.module.scss';

const ChipsSelect: React.FunctionComponent<{
    selectedOptions: string[], options: string[], label: string, onSelectChange: (selections: string[]) => void
}> = ({ selectedOptions, options, label, onSelectChange }) => {

    const selectionsChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSelectionList = event.target.value as string[];
        onSelectChange(newSelectionList);
    }

    const handleDelete = (value: string) => {
        const newSelections = selectedOptions.filter((option) => option !== value);
        onSelectChange(newSelections);
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    }
    return (
        <Fragment>
            <InputLabel shrink>{label}</InputLabel>
            <Select className={styles.select} multiple
                value={selectedOptions}
                fullWidth
                displayEmpty
                input={<Input />}
                onChange={(e) => selectionsChanged(e)}
                renderValue={(selected) => {
                    return (
                        <div className={styles.selected__container}>
                            {(selected as string[]).length === 0
                                ? <Chip className={styles.chip} color="primary" key="All" label="All" />
                                : (selected as string[]).map((value) => (
                                    <Chip color="primary" className={styles.chip} onMouseDown={stopPropagation} onDelete={() => handleDelete(value)} key={value} label={value} />
                                ))
                            }
                        </div>
                    )
                }}>
                {options.map((name) => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}</Select>
        </Fragment>
    )
}

export default ChipsSelect;
