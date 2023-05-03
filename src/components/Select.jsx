import React from 'react';
import {IsFormInvalid} from '../utils/IsFormInvalid';
import {findInputError} from '../utils/FindInputError';
import {useFormContext} from 'react-hook-form';
import InputError from './InputError';
import {AnimatePresence} from 'framer-motion';

const Select = ({options, name, id, validation, ...rest}) => {
    const {
        register,
        formState: {errors},
    } = useFormContext();
    const inputError = findInputError(errors, name);
    const isInvalid = IsFormInvalid(inputError);
    const disabledOption = document.getElementById('disabledOption');
    const makeDisabled = () => {
        disabledOption.setAttribute('disabled', 'disabled');
    };
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
            {/* <input
                id={id}
                type={type}
                className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                placeholder={placeholder}
                {...register(name, validation)}
            /> */}
            <select {...register(name, validation)} onClick={makeDisabled} className="w-full p-5 lg:p-2 font-medium border rounded-md border-slate-300 placeholder:opacity-60" defaultValue={'hidden'} {...rest}>
                <option value="" id='disabledOption' >-- Please Select one --</option>
                {options.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
