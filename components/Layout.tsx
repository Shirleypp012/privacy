import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown, Menu, ChevronRight } from 'lucide-react';
import { APP_NAVIGATION } from '../constants';
import { PageRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeRoute, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['data-center', 'computation', 'security']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  // Helper to find display label for breadcrumb
  const currentNav = APP_NAVIGATION.find(n => n.path === activeRoute) || 
                     APP_NAVIGATION.flatMap(n => n.subItems || []).find(n => n.path === activeRoute);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-20 shadow-sm`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
           <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
             <span className="font-bold text-white text-lg">P</span>
           </div>
           {sidebarOpen && (
             <span className="ml-3 font-bold text-lg tracking-tight text-gray-800">
               隐私盾 PrivacyShield
             </span>
           )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
           {APP_NAVIGATION.map((item) => {
             const isActive = item.path === activeRoute;
             const isExpanded = expandedMenus.includes(item.id);
             const Icon = item.icon!;

             return (
               <div key={item.id}>
                 <div 
                   onClick={() => item.subItems ? toggleMenu(item.id) : item.path && onNavigate(item.path as PageRoute)}
                   className={`
                     flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors group relative
                     ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                   `}
                 >
                   <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
                   {sidebarOpen && (
                     <>
                       <span className="ml-3 text-sm font-medium flex-1 truncate">{item.label}</span>
                       {item.subItems && (
                         <ChevronRight size={14} className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                       )}
                     </>
                   )}
                   {/* Tooltip for collapsed state */}
                   {!sidebarOpen && (
                     <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-gray-700 shadow-lg">
                       {item.label}
                     </div>
                   )}
                 </div>

                 {/* Submenu */}
                 {sidebarOpen && item.subItems && isExpanded && (
                   <div className="ml-9 mt-1 space-y-1 border-l border-gray-200 pl-2">
                     {item.subItems.map(sub => (
                       <div 
                         key={sub.id}
                         onClick={() => sub.path && onNavigate(sub.path as PageRoute)}
                         className={`
                           px-3 py-2 text-xs rounded-md cursor-pointer transition-colors truncate
                           ${activeRoute === sub.path ? 'text-blue-700 bg-blue-50 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                         `}
                       >
                         {sub.label}
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             );
           })}
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        
        {/* Header */}
        <header className="h-16 border-b border-gray-200 flex justify-between items-center px-6 bg-white z-10 sticky top-0 shadow-sm">
           <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 transition-colors">
               <Menu size={20} />
             </button>
             {/* Breadcrumb mock */}
             <div className="text-sm text-gray-500 flex items-center gap-2">
               <span>平台 (Platform)</span>
               <span className="text-gray-300">/</span>
               <span className="text-gray-900 font-medium">{currentNav?.label || activeRoute}</span>
             </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 w-64 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                 <Search size={14} className="text-gray-400 mr-2" />
                 <input type="text" placeholder="全局搜索 (Search)..." className="bg-transparent border-none focus:outline-none text-xs text-gray-700 w-full placeholder:text-gray-400" />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                 <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600">
                   <User size={16} />
                 </div>
                 <div className="hidden md:block text-xs">
                   <div className="text-gray-900 font-medium">Admin User</div>
                   <div className="text-gray-500">安全部 (Security Dept.)</div>
                 </div>
                 <ChevronDown size={14} className="text-gray-400" />
              </div>
           </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 overflow-auto relative p-6">
          {children}
        </main>

      </div>
    </div>
  );
};