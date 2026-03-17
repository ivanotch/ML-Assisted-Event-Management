interface KPI {
  name: string;
  icon: React.ElementType;
  value: number;
}

export default function CardKPI({ name, icon: Icon, value }: KPI) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">

      {/* Left Content */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{name}</p>
        <h2 className="text-2xl font-semibold mt-1">
          {value.toLocaleString()}
        </h2>
      </div>

      {/* Icon */}
      <div className="p-3 rounded-xl bg-blue-50">
        <Icon className="text-blue-600" size={22} />
      </div>

    </div>
  );
}