export default function ServicesCard({ title, description }) {
  return (
    <div className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold mb-2 text-[#2A4E3B]">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
