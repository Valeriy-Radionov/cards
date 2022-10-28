import React, {useEffect, useState} from 'react';
import s from './DoubleRangeBlock.module.scss'
import {IconButton, Slider} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {CleaningServices} from "@mui/icons-material";

type DoubleRangeBlockPropsType = {
    minValue: number
    maxValue: number
    paramsSearch: URLSearchParams
    addParamsMinMax: (min: string, max: string) => void
}

export const DoubleRangeBlock = (props: DoubleRangeBlockPropsType) => {
    const [params, setParams] = useSearchParams()
    const [value, setValue] = React.useState<number[]>([0, 100]);
    const [clear, setClear] = useState(false)

    const clearFilters = () => {
        setClear(true)
        props.paramsSearch.set("packName", "")
        props.addParamsMinMax(props.minValue.toString(), props.maxValue.toString())
        setValue([props.minValue, props.maxValue])
    }
    const resetSlider = () => {
        setClear(false)
    }

    function valuetext(value: number) {
        return `${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        props.addParamsMinMax(value[0].toString(), value[1].toString())
    }

    useEffect(() => {
        const min = params.get("min")
        const max = params.get("max")
        setValue([Number(min) || props.minValue, Number(max) || props.maxValue])
    }, [props.minValue, props.maxValue])

    return (
        <div className={s.container}>
            <Slider
                className={s.slider}
                aria-label="Default"
                onClick={resetSlider}
                min={props.minValue}
                max={props.maxValue}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
            <IconButton onClick={clearFilters} className={s.btn}><CleaningServices color={"action"} className={s.item}/></IconButton>
        </div>
    );
};