import { Link } from "react-router-dom";

const SummaryCard = ({ title, value, icon, iconBg, link, linkText }) => {
  console.log(value);  // Log the value to ensure it's a valid string or number

  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${iconBg}`}>
          {icon}
        </div>
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>

      {link && (
        <div className="mt-4">
          <Link to={link} className="text-sm text-blue-600 hover:underline font-medium">
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;