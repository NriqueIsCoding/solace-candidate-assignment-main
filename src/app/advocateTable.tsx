import React from "react";
import { formatPhoneNumber } from "./utils/helpers";
import { AdvocateTableProps } from "@localtypes/index";

const AdvocateTable: React.FC<AdvocateTableProps> = ({ advocates, isTableLoading }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg flex flex-col min-h-[350px]">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">First Name</th>
            <th scope="col" className="px-6 py-3">Last Name</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">Degree</th>
            <th scope="col" className="px-6 py-3">Specialties</th>
            <th scope="col" className="px-6 py-3">Years of Experience</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {isTableLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-8">
                <div className="flex justify-center items-center h-20 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                  <span className="ml-4">Loading table data...</span>
                </div>
              </td>
            </tr>
          ) : advocates.length > 0 ? (
            advocates.map((advocate, index) => (
              <tr
                key={advocate.id}
                className={`
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100
                `}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {advocate.firstName}
                </td>
                <td className="px-6 py-4 text-gray-800">{advocate.lastName}</td>
                <td className="px-6 py-4 text-gray-800">{advocate.city}</td>
                <td className="px-6 py-4 text-gray-800">{advocate.degree}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside space-y-1">
                    {advocate.specialties.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-gray-800">{advocate.yearsOfExperience}</td>
                <td className="px-6 py-4 text-gray-800">
                  {formatPhoneNumber(advocate.phoneNumber)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                No advocates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdvocateTable;
