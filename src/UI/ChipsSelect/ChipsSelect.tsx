import { Select, Chip, MenuItem, InputLabel, Input } from '@material-ui/core';
import React, { Fragment } from 'react'
import { FixedSizeList } from "react-window";
import styles from './ChipsSelect.module.scss';

interface Props {
    selectedOptions: string[];
    options: string[];
    label: string;
    onSelectChange: (selections: string[]) => void;
}

const ChipsSelect: React.FunctionComponent<Props> = (
    { selectedOptions, options, label, onSelectChange }) => {

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
    const rowClickHandler = (index: number) => {
        const clickedOption = options[index];
        const elementIndex = selectedOptions.indexOf(clickedOption);
        let newSelections = [...selectedOptions];

        if (elementIndex < 0) {
            newSelections.push(clickedOption);
        } else {
            newSelections.splice(elementIndex, 1);
        }
        onSelectChange(newSelections);
    }

    const OptionsRow = (data: any) => {
        const itemValue = data.data[data.index];
        return (
            <MenuItem style={data.style}
                onClick={() => rowClickHandler(data.index)}
                key={itemValue}
                value={itemValue}>{itemValue}</MenuItem>
        )
    }
    return (
        <Fragment>
            <InputLabel shrink>{label}</InputLabel>
            <Select className={styles.select} multiple
                value={selectedOptions}
                fullWidth
                displayEmpty
                input={<Input />}
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }}
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
                <FixedSizeList
                    height={options.length * 35 > 600 ? 600 : options.length * 35}
                    itemData={options}
                    itemCount={options.length}
                    itemSize={35}
                    width={'100%'}
                >
                    {OptionsRow}
                </FixedSizeList>
            </Select>
        </Fragment>
    )
}

export default ChipsSelect;
