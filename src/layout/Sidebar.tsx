import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  BarChart2,
  Brain,
  CalendarDays,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onNavigateToAnalytics?: () => void;
  onNavigateToTalkier?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigateToAnalytics, onNavigateToTalkier }) => {
  const navigate = useNavigate();

  const navigationItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/', 
      onClick: () => navigate('/') 
    },
    { 
      icon: Receipt, 
      label: 'Facturas', 
      path: '/invoices', 
      onClick: () => navigate('/invoices') 
    },
    { 
      icon: BarChart2, 
      label: 'Analytics', 
      path: '/analytics', 
      onClick: onNavigateToAnalytics || (() => navigate('/analytics')) 
    },
    { 
      icon: Brain, 
      label: 'Talkiers', 
      path: '/talkiers', 
      onClick: onNavigateToTalkier || (() => navigate('/talkiers')) 
    },
    { 
      icon: CalendarDays, 
      label: 'Gestión Reservas', 
      path: '/reservations', 
      onClick: () => navigate('/reservations') 
    },
    { 
      icon: Settings, 
      label: 'Configuración', 
      path: '/settings', 
      onClick: () => navigate('/settings') 
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white shadow-lg flex flex-col items-center py-6 space-y-8">
      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
        <span className="text-white font-bold text-xl">R</span>
      </div>
      
      <div className="flex flex-col space-y-6">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative
              ${window.location.pathname === item.path
                ? 'bg-emerald-100 text-emerald-600'
                : 'text-gray-400 hover:bg-gray-100'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-md
              opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200
              whitespace-nowrap z-50">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;