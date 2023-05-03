import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {Controller, useForm, useFormContext} from 'react-hook-form';
import {AnimatePresence} from 'framer-motion';
import {findInputError} from '../utils/FindInputError';
import {IsFormInvalid} from '../utils/IsFormInvalid';
import InputError from './InputError';
import {useSelector} from 'react-redux';


const PhoneInputField = ({name, label, validation}) => {
    const {
        control,
        register,
        formState: {errors},
    } = useFormContext();
    const inputError = findInputError(errors, name);
    const isInvalid = IsFormInvalid(inputError);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={name} className="font-semibold capitalize">
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
        control={control}
        name={name}
        // rules={{ validate: validationSchema }}
        render={({field}) => (
          <>
            <PhoneInput
                {...register(name, validation)}
            //   {...field}
              value={field.value ? field.value : ''}
              onChange={field.onChange}
              countries={['NG']}
              defaultCountry="NG"
              id="phone-input"
              limitMaxLength={true}
              className="w-full p-5 lg:p-2 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
            />
          </>
        )}
      />
    </div>
  );
};

export default PhoneInputField;
