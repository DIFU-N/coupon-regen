import {AnimatePresence} from 'framer-motion';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {findInputError} from '../utils/FindInputError';
import {IsFormInvalid} from '../utils/IsFormInvalid';
import InputError from './InputError';

const Input = ({label, type, id, placeholder, validation, name}) => {
    const {
        register,
        formState: {errors},
      } = useFormContext();
    const inputError = findInputError(errors, name);
    const isInvalid = IsFormInvalid(inputError);
    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
                <label htmlFor={id} className="font-semibold capitalize">
                    {label}
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
            <input
                name={name}
                id={id}
                type={type}
                className="w-full lg:p-2 p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                placeholder={placeholder}
                {...register(name, validation)}
            />
        </div>
    );
};

export default Input;
