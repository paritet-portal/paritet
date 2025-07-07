import Link from 'next/link';

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Зареєструватися</h1>

      <div className="flex space-x-8 mb-12">
        <Link href="/register/specialist">
          <button className="text-xl font-medium text-blue-600 border-b-2 border-blue-600 pb-2 px-4">
            Як спеціаліст
          </button>
        </Link>
        <Link href="/register/client">
          <button className="text-xl font-medium text-gray-500 hover:text-blue-600 pb-2 px-4">
            Як споживач
          </button>
        </Link>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column (Specialist Form) */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип спеціалісту<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none">
                <option>Виберіть зі списку</option>
                {/* Add other options here */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

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
              Місце проживання<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none">
                <option>Виберіть країну</option>
                {/* Add other options here */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
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
              ПІБ або Назва компанії<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Введіть свої ПІБ"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              № ліцензії/свідоцтва (у випадку компанії - керівника)<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Введіть свої дані"
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Місце проживання<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Виберіть місто/село"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Спеціаліст, який залучив Вас до співпраці за програмою "Партнерство"
            </label>
            <input
              type="text"
              placeholder="Введіть ПІБ спеціаліста"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <button className="mt-12 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
        Зареєструватися
      </button>
    </div>
  );
}