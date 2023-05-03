import React from 'react';
import {useForm, Controller, useFormContext} from 'react-hook-form';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {findInputError} from '../utils/FindInputError';
import {IsFormInvalid} from '../utils/IsFormInvalid';
import {AnimatePresence} from 'framer-motion';
import InputError from './InputError';

const CellNum = ({label, id, placeholder, validation, name}) => {
    console.log(name);
    const {
        register,
        formState: {errors},
        control,
    } = useFormContext();
    const inputError = findInputError(errors, name);
    console.log(
        name,
    );
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
            <Controller
                name={name}
                control={control}
                rules={{
                    validate: (value) => isValidPhoneNumber(value),
                }}
                render={({field: {onChange, value}}) => (
                    <PhoneInput
                        name={name}
                        value={value}
                        onChange={onChange}
                        // international={true}
                        countries={['NG', 'MG', 'SC', 'KM', 'BW', 'MR']}
                        defaultCountry="NG"
                        id="phone-input"
                        limitMaxLength={true}
                        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                        {...register(name, validation)}
                    />
                )}
            />
        </div>
        // <div>

        //     <label htmlFor="phone-input">Phone Number</label>
        //     {errors["phone-input"] && (
        //         <p className="error-message">Invalid Phone</p>
        //     )}
        // </div>
    );
};

export default CellNum;
