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
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-20`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
             <span className="font-bold text-white text-lg">P</span>
           </div>
           {sidebarOpen && (
             <span className="ml-3 font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
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
                     ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                   `}
                 >
                   <Icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'} />
                   {sidebarOpen && (
                     <>
                       <span className="ml-3 text-sm font-medium flex-1 truncate">{item.label}</span>
                       {item.subItems && (
                         <ChevronRight size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                       )}
                     </>
                   )}
                   {/* Tooltip for collapsed state */}
                   {!sidebarOpen && (
                     <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700">
                       {item.label}
                     </div>
                   )}
                 </div>

                 {/* Submenu */}
                 {sidebarOpen && item.subItems && isExpanded && (
                   <div className="ml-9 mt-1 space-y-1 border-l border-slate-800 pl-2">
                     {item.subItems.map(sub => (
                       <div 
                         key={sub.id}
                         onClick={() => sub.path && onNavigate(sub.path as PageRoute)}
                         className={`
                           px-3 py-2 text-xs rounded-md cursor-pointer transition-colors truncate
                           ${activeRoute === sub.path ? 'text-blue-400 bg-blue-600/5' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
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
      <div className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex justify-between items-center px-6 bg-slate-950/80 backdrop-blur z-10 sticky top-0">
           <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
               <Menu size={20} />
             </button>
             {/* Breadcrumb mock */}
             <div className="text-sm text-slate-500 flex items-center gap-2">
               <span>平台 (Platform)</span>
               <span className="text-slate-700">/</span>
               <span className="text-slate-200">{currentNav?.label || activeRoute}</span>
             </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 w-64">
                 <Search size={14} className="text-slate-500 mr-2" />
                 <input type="text" placeholder="全局搜索 (Search)..." className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
              </div>
              
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-950"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-800 cursor-pointer">
                 <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                   <User size={16} />
                 </div>
                 <div className="hidden md:block text-xs">
                   <div className="text-white font-medium">Admin User</div>
                   <div className="text-slate-500">安全部 (Security Dept.)</div>
                 </div>
                 <ChevronDown size={14} className="text-slate-500" />
              </div>
           </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 overflow-auto relative">
          {children}
        </main>

      </div>
    </div>
  );
};