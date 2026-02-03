import React, { useState, useEffect, createContext, useContext } from 'react';
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
import { PageRoute, Task, AuditLog } from './types';

// --- Global Context Definition ---
interface AppContextType {
  tasks: Task[];
  auditLogs: AuditLog[];
  addTask: (task: Task) => void;
  addAuditLog: (log: AuditLog) => void;
}

export const GlobalContext = createContext<AppContextType>({
  tasks: [],
  auditLogs: [],
  addTask: () => {},
  addAuditLog: () => {},
});

// Helper to get current time string
const getCurrentTime = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
};

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>(PageRoute.DASHBOARD);
  
  // --- Global State ---
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'T-2026-8821', name: '联合风控建模 (Joint Risk Control)', type: '联邦学习', status: 'Running', progress: 45, nodes: 3, route: PageRoute.FEDERATED_LEARNING },
    { id: 'T-2026-1030', name: '黑名单隐私查询 (Blacklist PIR)', type: 'PIR', status: 'Completed', progress: 100, nodes: 2, route: PageRoute.PIR },
    { id: 'T-MPC-92', name: '联合营销分析 (Joint Marketing)', type: 'MPC', status: 'Waiting', progress: 0, nodes: 4, route: PageRoute.MPC },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'LOG-INIT-1', timestamp: getCurrentTime(), action: '系统初始化完成', user: 'System', entity: 'Kernel', status: 'Success', hash: '0x00...init', type: 'info' },
  ]);

  // Methods
  const addTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const addAuditLog = (newLog: AuditLog) => {
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  // --- Real-time Simulation Effect ---
  useEffect(() => {
    const actions = [
      { msg: '节点 A 正在同步梯度参数...', type: 'info', user: 'Node_A' },
      { msg: '检测到新的数据资产接入请求', type: 'info', user: 'Data_Gateway' },
      { msg: '任务 #8821 隐私预算消耗检查通过', type: 'success', user: 'Policy_Engine' },
      { msg: '心跳检测：所有 TEE 节点在线', type: 'success', user: 'Monitor' },
      { msg: '拦截到异常访问请求 (IP: 192.168.x.x)', type: 'warn', user: 'Firewall' },
      { msg: '区块链存证区块高度更新 #124923', type: 'info', user: 'Chain_Sync' },
    ];

    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newLog: AuditLog = {
        id: `LOG-${Date.now()}`,
        timestamp: getCurrentTime(),
        action: randomAction.msg, // Using action field for the message in dashboard stream
        user: randomAction.user,
        entity: 'System',
        status: 'Active',
        hash: `0x${Math.random().toString(16).substr(2, 8)}`,
        type: randomAction.type as any
      };
      
      // Only add log 30% of the time to not be too noisy, or if it's empty
      if (Math.random() > 0.6 || auditLogs.length === 0) {
        addAuditLog(newLog);
      }
      
      // Randomly update task progress
      setTasks(prev => prev.map(t => {
        if (t.status === 'Running' && t.progress < 100) {
          return { ...t, progress: Math.min(100, t.progress + Math.floor(Math.random() * 5)) };
        }
        return t;
      }));

    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
          <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-fade-in bg-gray-50">
             <div className="text-6xl font-thin mb-4 text-gray-300">404</div>
             <p>功能模块建设中... (Module under construction)</p>
             <button 
               onClick={() => setActiveRoute(PageRoute.DASHBOARD)} 
               className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
             >
               返回仪表盘 (Return)
             </button>
          </div>
        );
    }
  };

  return (
    <GlobalContext.Provider value={{ tasks, auditLogs, addTask, addAuditLog }}>
      <Layout activeRoute={activeRoute} onNavigate={setActiveRoute}>
        {renderContent()}
      </Layout>
    </GlobalContext.Provider>
  );
}