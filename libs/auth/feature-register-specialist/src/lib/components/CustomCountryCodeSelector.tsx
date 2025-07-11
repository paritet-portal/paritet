// components/CustomCountryCodeSelector.tsx
import { FC, useEffect, useRef, useState } from 'react';

// Тип данных для стран
interface CountryDataType {
  value: string; // Название страны (например, "Ukraine")
  label: string; // Название страны для отображения в опциях (например, "Ukraine")
  countryCode: string; // Код страны для телефона (например, "+380")
  flagUrl: string; // URL флага
  cca2: string; // Двухбуквенный код страны (например, "UA") - для уникального ключа
}

interface CustomCountryCodeSelectorProps {
  options: CountryDataType[]; // Список всех стран
  value: CountryDataType | null; // Выбранная страна
  onChange: (newValue: CountryDataType | null) => void; // Обработчик изменения
  placeholder?: string; // Текст-подсказка
}

export const CustomCountryCodeSelector: FC<CustomCountryCodeSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия выпадающего списка
  const selectorRef = useRef<HTMLDivElement>(null); // Реф для отслеживания кликов вне компонента

  // Обработчик клика для открытия/закрытия
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Обработчик клика вне компонента для закрытия списка
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Обработчик выбора страны из выпадающего списка
  const handleSelectChange = (country: CountryDataType | null) => {
    onChange(country);
    setIsOpen(false); // Закрываем список после выбора
  };

  // Отображаемый контент в поле выбора
  const displayContent = value ? (
    <div className="flex items-center">
      <img src={value.flagUrl} alt={`${value.label} Flag`} className="h-5 w-5 mr-2 rounded-sm" />
      <span className="text-gray-700">{value.countryCode}</span>
    </div>
  ) : (
    <div className="flex items-center text-gray-700">
      <span>Код страны</span>
      <span className="text-gray-500 ml-2">{placeholder || '+...'}</span>
    </div>
  );

  return (
    <div className="relative" ref={selectorRef}>
      {/* Кликабельный блок для отображения выбранной страны */}
      <div
        className="flex items-center px-4 border border-gray-300 rounded-l-md bg-gray-100 h-full cursor-pointer"
        onClick={toggleDropdown}
      >
        {displayContent}
     
      </div>

      {/* Выпадающий список (отображается, когда isOpen === true) */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-96 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Вариант с кастомным списком (более сложный, но с флагами) */}
          <div className="max-h-60 overflow-y-auto">
            {options.map((country, index) => (
              <div
                key={`${country.cca2}-${index}`} 
                onClick={() => handleSelectChange(country)}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={country.flagUrl} alt={`${country.label} Flag`} className="w-6 h-6 mr-3 rounded-sm" />
                <span className="text-gray-700 mr-3">{country.label}</span>
                <span className="text-gray-500 text-sm">{country.countryCode}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};