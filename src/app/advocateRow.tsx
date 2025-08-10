import React, { useState } from "react";
import { formatPhoneNumber } from "./utils/helpers";
import { Advocate, AdvocateRowProps } from "@localtypes/index";

const AdvocateRow: React.FC<AdvocateRowProps> = ({ advocate, index }) => {
  // state to manage the accordion
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr
        key={advocate.id}
        onClick={toggleAccordion}
        className={`
          bg-white border-b cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100
        `}
      >
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {advocate.firstName}
        </td>
        <td className="px-6 py-4 text-gray-800">{advocate.lastName}</td>
        <td className="px-6 py-4 text-gray-800">{advocate.city}</td>
        <td className="px-6 py-4 text-gray-800">{advocate.degree}</td>
        <td className="px-6 py-4 text-gray-800 text-center">
          <span className="text-gray-500 font-bold">
            {advocate.specialties.length > 0 ? `(${advocate.specialties.length})` : 'N/A'}
          </span>
        </td>
        <td className="px-6 py-4 text-gray-800 text-center">{advocate.yearsOfExperience}</td>
        <td className="px-6 py-4 text-gray-800">
          {formatPhoneNumber(advocate.phoneNumber)}
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50 border-b">
          <td colSpan={7} className="px-6 py-4">
            <h4 className="font-bold text-gray-700 mb-2">Specialties</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {advocate.specialties.map((spec, idx) => (
                <li key={idx}>{spec}</li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
};

export default AdvocateRow;
