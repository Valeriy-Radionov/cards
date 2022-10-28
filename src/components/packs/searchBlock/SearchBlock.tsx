import React, {ChangeEvent} from 'react';
import {InputSearch} from "../../../common/components/searchInput/InputSearch";
import {Toggle} from "../../../common/components/toggle/Toggle";
import s from './SearchBlock.module.scss'
import {DoubleRangeBlock} from "./doubleRangeBlock/DoubleRangeBlock";

type SettingsBlockPropsType = {
    paramsSearch: URLSearchParams
    addParamsName: (e: ChangeEvent<HTMLInputElement>) => void
    addParamsUserId: (filter: 'my' | 'all') => void
    addParamsMinMax: (min: string, max: string) => void
    user_id: string
    minValue: number
    maxValue: number
}

export const SearchBlock: React.FC<SettingsBlockPropsType> = ({
                                                                  paramsSearch,
                                                                  addParamsName,
                                                                  addParamsUserId,
                                                                  addParamsMinMax,
                                                                  user_id,
                                                                  minValue,
                                                                  maxValue
                                                              }) => {

    const toggleClick = (value: boolean) => {
        value && addParamsUserId('my')
        !value && addParamsUserId('all')
    }

    return (
        <div className={s.container}>
            <div className={s.item}>
                <span>Search</span>
                <InputSearch value={paramsSearch.get("packName") || ""}
                             onChange={e => addParamsName(e)}/>
            </div>
            <div className={s.item}>
                <span>Show cards pack</span>
                <Toggle value={!!user_id} onClick={toggleClick}/>
            </div>
            <div className={s.item}>
                <span>Number of cards</span>
                <DoubleRangeBlock maxValue={maxValue}
                                  minValue={minValue}
                                  addParamsMinMax={addParamsMinMax}
                                  paramsSearch={paramsSearch}
                />
            </div>
        </div>
    );
};
