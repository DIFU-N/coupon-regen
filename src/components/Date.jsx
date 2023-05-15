import {AnimatePresence} from 'framer-motion';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import {Controller, useFormContext} from 'react-hook-form';
import {findInputError} from '../utils/FindInputError';
import {IsFormInvalid} from '../utils/IsFormInvalid';
import InputError from './InputError';

const SelectDate = ({name, id, validation, ...rest}) => {
    const {control, register, formState: {errors}} = useFormContext();

    const inputError = findInputError(errors, name);
    const isInvalid = IsFormInvalid(inputError);
    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
                <label htmlFor={id} className="font-semibold capitalize">
                    {name}
                </label>
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className='relative'>
                <input
                    className="w-full p-5 lg:p-2 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                    type="date"
                    id="birthday"
                    name="birthday"
                    // onFocus={this.showPicker()}
                    onClick={(e) => e.target.focus()}
                    {...register(name, validation)}
                />
            </div>
        </div>
    );
};

export default SelectDate;
