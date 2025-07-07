import React from 'react';

// Визначаємо props для нашого компонента.
// Ми успадковуємо всі стандартні атрибути HTML-кнопки для максимальної гнучкості.
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // `children` - це те, що буде всередині кнопки (текст, іконка).
  children: React.ReactNode;
  // `className` дозволить додавати специфічні стилі (напр., відступи) при використанні.
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  type = 'button', // За замовчуванням тип 'button', щоб уникнути випадкового сабміту форм
  ...props // Всі інші props (напр., `disabled`, `onClick`) передаються напряму до елемента <button>
}) => {
  // Базові стилі, які будуть у всіх кнопок.
  const baseStyles = 'px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      // Поєднуємо базові стилі з тими, що були передані через `className`.
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};