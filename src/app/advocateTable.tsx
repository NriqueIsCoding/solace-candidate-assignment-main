import React from "react";
import { formatPhoneNumber } from "./utils/helpers";
import { AdvocateTableProps } from "@localtypes/index";

const AdvocateTable: React.FC<AdvocateTableProps> = ({ 
  advocates, 
  isTableLoading, 
  sortColumn, 
  sortOrder, 
  onSort 
}) => {
  
  const renderSortIndicator = (column: string) => {
    // Is current column the one being sorted?
    if (column === sortColumn) {
      // Returning icon based on the sort order
      return sortOrder === 'asc' ? <i className="fas fa-sort-up ml-2"></i> : <i className="fas fa-sort-down ml-2"></i>;
    }
    // or return a default sort icon for non-sorted columns
    return <i className="fas fa-sort ml-2 text-gray-400"></i>;
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg flex flex-col min-h-[350px]">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 cursor-pointer select-none" 
              onClick={() => onSort('firstName')}
            >
              First Name{renderSortIndicator('firstName')}
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 cursor-pointer select-none" 
              onClick={() => onSort('lastName')}
            >
              Last Name{renderSortIndicator('lastName')}
            </th>
            <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer select-none" 
                onClick={() => onSort('city')}
            >
                City{renderSortIndicator('city')}
            </th>
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
                    {advocate.specialties.map((spec, idx) => (
                      <li key={idx}>{spec}</li>
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
