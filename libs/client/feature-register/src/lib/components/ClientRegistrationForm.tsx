'use client';

import { Button } from '@paritet/shared-ui';
import React, { useState } from 'react';
import { useRegisterClient } from '../hooks/useRegisterClient';

export function ClientRegistrationForm() {
  const { register, isLoading, error } = useRegisterClient();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    // ... інші поля
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <>


      <form onSubmit={handleSubmit} className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column (Client Form) */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">


            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ПІБ<span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Введіть свої ПІБ"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

          </div>



          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Введіть свій пароль"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>



          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефону
            </label>
            <div className="flex">
              <div className="flex items-center px-4 border border-gray-300 rounded-l-md bg-gray-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg" alt="Ukraine Flag" className="h-5 w-5 mr-2" />
                <span className="text-gray-700">+38</span>
              </div>
              <input
                type="tel"
                placeholder="Ваш номер"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>





        {/* Right Column (Consumer Form) */}
        <div className="bg-white p-8 rounded-lg shadow-lg">


          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Введіть свій Email"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>



          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль ще раз<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Повторіть свій пароль"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>

       <Button
          type="submit"
          disabled={isLoading}
          className="mt-12" // Передаємо специфічний для цього місця стиль через `className`
        >
          {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
        </Button>

      {/* <button
        type="submit"
        disabled={isLoading}
        className="mt-12 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
        Зареєструватися
      </button> */}
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </>
  );
}