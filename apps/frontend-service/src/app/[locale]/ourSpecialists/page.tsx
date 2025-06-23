// apps/web/src/app/[locale]/ourSpecialists/page.tsx

export default function OurSpecialistsPage() {
  // Здесь может быть логика для получения params, если они нужны,
  // например, если бы маршрут был /ourSpecialists/[specialistId]
  // const params = useParams(); // если это клиентский компонент
  // Или через пропсы, если серверный

  return (
    <div>
      <h1>Наши специалисты</h1>
      {/* Здесь будет контент страницы */}
      <p>Список специалистов...</p>
    </div>
  );
}
