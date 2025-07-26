import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function Notfound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white text-center px-4 pt-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <AlertTriangle className="text-yellow-500 w-20 h-20" />
        <h1 className="text-5xl md:text-6xl font-bold text-green-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">الصفحة غير موجودة</h2>
        <p className="text-gray-500 max-w-md">
          عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة أو ربما تم نقلها.
        </p>
        <Link
          to="/"
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-200 mt-4"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
