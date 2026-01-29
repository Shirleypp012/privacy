import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { DataAssets } from './components/DataAssets';
import { DataCatalog } from './components/DataCatalog';
import { DataWatermark } from './components/DataWatermark';
import { FederatedLearning } from './components/FederatedLearning';
import { AuditCenter } from './components/AuditCenter';
import { MPC } from './components/MPC';
import { TEE } from './components/TEE';
import { PIR } from './components/PIR';
import { PageRoute } from './types';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>(PageRoute.DASHBOARD);

  const renderContent = () => {
    switch (activeRoute) {
      case PageRoute.DASHBOARD:
        return <Dashboard />;
      case PageRoute.DATA_ASSETS:
        return <DataAssets />;
      case PageRoute.DATA_CATALOG:
        return <DataCatalog />;
      case PageRoute.DATA_WATERMARK:
        return <DataWatermark />;
      case PageRoute.FEDERATED_LEARNING:
        return <FederatedLearning />;
      case PageRoute.AUDIT:
        return <AuditCenter />;
      case PageRoute.MPC:
        return <MPC />;
      case PageRoute.TEE:
        return <TEE />;
      case PageRoute.PIR:
        return <PIR />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-fade-in">
             <div className="text-6xl font-thin mb-4">404</div>
             <p>功能模块建设中... (Module under construction)</p>
             <button 
               onClick={() => setActiveRoute(PageRoute.DASHBOARD)} 
               className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
             >
               返回仪表盘 (Return)
             </button>
          </div>
        );
    }
  };

  return (
    <Layout activeRoute={activeRoute} onNavigate={setActiveRoute}>
      {renderContent()}
    </Layout>
  );
}