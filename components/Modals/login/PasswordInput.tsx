import { useState } from 'react';
import Image from 'next/image';

import { UseFormRegisterReturn } from 'react-hook-form';

import RequiredIcon from './RequiredIcon';

export default function PasswordInput({
  register,
  error,
  name,
  placeholder,
  label
}: {
  register: UseFormRegisterReturn<any>;
  error: any;
  name: string;
  placeholder: string;
  label: string;
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const iconPath = isShowPassword ? '/icon/cross-eye.png' : '/icon/eye.png';

  return (
    <div className='flex flex-col items-start w-full'>
      <label htmlFor={name} className='text-primary ml-4 font-medium'>
        {label}
        <RequiredIcon />
      </label>
      <div className='relative w-full flex flex-row items-center justify-center'>
        <input
          {...register}
          name={name}
          type={isShowPassword ? 'text' : 'password'}
          className='
          w-full px-4 py-2 mt-2 rounded-full
          bg-alt-secondary 
          placeholder-black placeholder-opacity-50
          focus:outline-none
        '
          placeholder={placeholder}
        />

        <Image
          src={iconPath}
          alt='show password'
          width={20}
          height={20}
          onClick={toggleShowPassword}
          className='absolute right-4 mt-2 cursor-pointer'
        />
      </div>

      {error && <p className='pl-4 text-red-500 text-sm'>{error?.message}</p>}
    </div>
  );
}
