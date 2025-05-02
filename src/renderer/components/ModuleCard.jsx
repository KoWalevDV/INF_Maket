import React from 'react';
export default function ModuleCard({ title, description, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4">
      {Icon && <Icon className="w-6 h-6 text-primary-500 mt-1" />}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}
