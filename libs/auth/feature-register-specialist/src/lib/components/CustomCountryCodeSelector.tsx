// components/CustomCountryCodeSelector.tsx
import { FC, useEffect, useRef, useState } from 'react';

interface CountryDataType {
  value: string; 
  label: string; 
  countryCode: string; 
  flagUrl: string; 
  cca2: string; 
}

interface CustomCountryCodeSelectorProps {
  options: CountryDataType[]; 
  value: CountryDataType | null; 
  onChange: (newValue: CountryDataType | null) => void; 
  placeholder?: string; 
}

export const CustomCountryCodeSelector: FC<CustomCountryCodeSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false); 
  const selectorRef = useRef<HTMLDivElement>(null); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const handleSelectChange = (country: CountryDataType | null) => {
    onChange(country);
    setIsOpen(false); 
  };

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
      <div
        className="flex items-center px-4 border border-gray-300 rounded-l-md bg-gray-100 h-full cursor-pointer"
        onClick={toggleDropdown}
      >
        {displayContent}
     
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-96 bg-white border border-gray-300 rounded-md shadow-lg">
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