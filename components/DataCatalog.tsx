import React, { useState, useEffect, useContext } from 'react';
import { 
  FolderTree, Search, Filter, Shield, Lock, Eye, CheckCircle, 
  MoreHorizontal, Database, FileText, Activity, Clock, Share2, Layers, Globe,
  Loader2, ArrowRight
} from 'lucide-react';
import { GlobalContext } from '../App';
import { PageRoute } from '../types';

const CATEGORIES = [
  { id: 'internal', label: '内部数据 (Internal)', icon: Database, children: ['投研数据', '风控数据', '客户数据', '运营日志'] },
  { id: 'external', label: '外部数据 (External)', icon: Globe, children: ['工商数据', '舆情数据', '黑名单库'] },
  { id: 'partner', label: '合作数据 (Partner)', icon: Share2, children: ['银行A共享', '运营商B', '电商C'] },
  { id: 'federated', label: '联邦数据 (Federated)', icon: Layers, children: ['联邦特征库', '纵向样本'] },
];

const ASSETS = [
  { id: 'DA-101', name: 'User_Transaction_History_2023', type: '结构化', rows: '4.5B', secLevel: 'L4', privLevel: 'High', compliance: true, watermark: true, usage: ['FL', 'MPC'] },
  { id: 'DA-102', name: 'Corporate_Credit_Graph_V2', type: '图数据', rows: '120M', secLevel: 'L3', privLevel: 'Med', compliance: true, watermark: false, usage: ['PIR', 'TEE'] },
  { id: 'DA-103', name: 'Realtime_Risk_Events_Stream', type: '流数据', rows: 'N/A', secLevel: 'L4', privLevel: 'High', compliance: true, watermark: true, usage: ['MPC'] },
  { id: 'DA-104', name: 'Marketing_Tags_Aggregated', type: '标签', rows: '50M', secLevel: 'L2', privLevel: 'Low', compliance: true, watermark: true, usage: ['FL'] },
  { id: 'DA-105', name: 'Device_Fingerprint_Logs', type: '日志', rows: '800M', secLevel: 'L3', privLevel: 'Med', compliance: false, watermark: false, usage: ['TEE'] },
  { id: 'DA-106', name: 'Face_Recognition_Vectors', type: '非结构化', rows: '2M', secLevel: 'L5', privLevel: 'Max', compliance: true, watermark: true, usage: ['MPC', 'TEE'] },
];

export const DataCatalog: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [computeStatus, setComputeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const { addTask, addAuditLog } = useContext(GlobalContext);

  // Reset status when asset changes
  useEffect(() => {
      setRequestStatus('idle');
      setComputeStatus('idle');
  }, [selectedAsset]);

  const handleRequestAccess = () => {
      setRequestStatus('loading');
      setTimeout(() => {
          setRequestStatus('success');
          // Add audit log
          addAuditLog({
            id: `LOG-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            action: `申请访问数据资产: ${selectedAsset.name}`,
            user: 'Admin_User',
            entity: selectedAsset.id,
            status: 'Pending',
            hash: '0x...',
            type: 'info'
          });
      }, 1500);
  };

  const handleLaunchCompute = () => {
      setComputeStatus('loading');
      setTimeout(() => {
          setComputeStatus('success');
          
          // 1. Add new Task
          const newTaskId = `T-${Math.floor(Math.random() * 10000) + 2026}`;
          addTask({
            id: newTaskId,
            name: `协同计算 - ${selectedAsset.name.substring(0, 15)}...`,
            type: selectedAsset.usage[0] === 'FL' ? '联邦学习' : selectedAsset.usage[0] === 'MPC' ? 'MPC' : 'TEE',
            status: 'Waiting',
            progress: 0,
            nodes: 3,
            route: PageRoute.FEDERATED_LEARNING
          });

          // 2. Add Audit Log
          addAuditLog({
            id: `LOG-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            action: `发起协同计算任务 ${newTaskId}`,
            user: 'Admin_User',
            entity: selectedAsset.id,
            status: 'Success',
            hash: '0xinit...',
            type: 'success'
          });

      }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 animate-fade-in overflow-hidden">
      
      {/* 1. Header Area */}
      <div className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur px-6 flex justify-between items-center shrink-0 z-10">
        <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Database className="text-blue-600" size={20} />
          数据资产目录 (Data Catalog)
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
             <input type="text" placeholder="全局搜索资产..." className="pl-9 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700 focus:border-blue-500 focus:bg-white w-64 transition-all" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50">
              <Filter size={14} /> 筛选
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-600 rounded text-xs">
              <CheckCircle size={14} /> 合规检查通过
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        
        {/* 2. Left Sidebar: Categories */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
           <div className="p-4 border-b border-gray-200">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">数据域 (Data Domains)</h3>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-6">
              {CATEGORIES.map(cat => (
                <div key={cat.id}>
                   <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded cursor-pointer mb-1">
                      <cat.icon size={16} className="text-blue-500" />
                      {cat.label}
                   </div>
                   <div className="pl-9 space-y-1">
                      {cat.children.map(child => (
                        <div key={child} className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer py-1">{child}</div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 3. Main Content: Asset Grid */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ASSETS.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => setSelectedAsset(asset)}
                  className={`bg-white border rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group active:scale-[0.98]
                     ${selectedAsset?.id === asset.id ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                         <Database size={24} />
                      </div>
                      <MoreHorizontal size={16} className="text-gray-400 hover:text-gray-600" />
                   </div>
                   
                   <h3 className="font-bold text-gray-800 mb-1 truncate" title={asset.name}>{asset.name}</h3>
                   <div className="text-xs text-gray-500 font-mono mb-4">{asset.id}</div>

                   <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> {asset.type}</div>
                      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> {asset.rows}</div>
                      <div className="flex items-center gap-1">
                         <Shield size={10} className={asset.secLevel === 'L4' || asset.secLevel === 'L5' ? 'text-rose-500' : 'text-amber-500'} /> 
                         {asset.secLevel}
                      </div>
                      <div className="flex items-center gap-1">
                         <Lock size={10} className={asset.privLevel === 'High' || asset.privLevel === 'Max' ? 'text-rose-500' : 'text-blue-500'} />
                         {asset.privLevel} Privacy
                      </div>
                   </div>

                   <div className="flex gap-2 flex-wrap mb-4">
                      {asset.usage.map(u => (
                         <span key={u} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 border border-gray-200 text-gray-600">{u}</span>
                      ))}
                   </div>

                   <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex gap-2">
                         {asset.compliance && <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">合规</span>}
                         {asset.watermark && <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">水印</span>}
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">详情 &rarr;</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 4. Right Sidebar: Details Panel */}
        {selectedAsset && (
           <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col animate-slide-in-right overflow-y-auto shadow-lg">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="font-bold text-gray-800 text-lg">资产详情</h2>
                 <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-gray-700">&times;</button>
              </div>

              <div className="space-y-6">
                 <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">元数据 (Metadata)</h3>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200">
                       <div className="flex justify-between text-xs"><span className="text-gray-500">Owner</span> <span className="text-gray-900">Data Team A</span></div>
                       <div className="flex justify-between text-xs"><span className="text-gray-500">Created</span> <span className="text-gray-900">2023-10-01</span></div>
                       <div className="flex justify-between text-xs"><span className="text-gray-500">Location</span> <span className="text-gray-900">HDFS://cluster-01</span></div>
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">数据血缘 (Lineage)</h3>
                    <div className="h-32 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden flex items-center justify-center">
                       {/* Mock Lineage */}
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">Src</div>
                          <div className="w-4 h-0.5 bg-gray-300"></div>
                          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-xs shadow-md shadow-blue-500/20">Cur</div>
                          <div className="w-4 h-0.5 bg-gray-300"></div>
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">App</div>
                       </div>
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">最近活动 (Activity)</h3>
                    <div className="space-y-3">
                       <div className="flex gap-3 text-xs">
                          <Activity size={14} className="text-blue-500 shrink-0 mt-0.5" />
                          <div>
                             <div className="text-gray-700">Used in <span className="text-blue-600">Federated Task #881</span></div>
                             <div className="text-gray-400">2 hours ago</div>
                          </div>
                       </div>
                       <div className="flex gap-3 text-xs">
                          <Eye size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                             <div className="text-gray-700">Sample preview by <span className="text-gray-900 font-medium">Admin</span></div>
                             <div className="text-gray-400">5 hours ago</div>
                          </div>
                       </div>
                    </div>
                 </section>

                 <div className="pt-4 mt-auto">
                    {requestStatus === 'success' ? (
                        <div className="w-full py-2 bg-emerald-50 text-emerald-600 rounded text-sm font-medium mb-2 border border-emerald-200 text-center flex items-center justify-center gap-2 animate-fade-in">
                            <CheckCircle size={16}/> 已发送申请
                        </div>
                    ) : (
                        <button 
                            onClick={handleRequestAccess}
                            disabled={requestStatus === 'loading'}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium mb-2 shadow-sm transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {requestStatus === 'loading' && <Loader2 size={14} className="animate-spin" />}
                            {requestStatus === 'loading' ? '申请中...' : '申请访问权限'}
                        </button>
                    )}

                    {computeStatus === 'success' ? (
                         <div className="w-full py-2 bg-purple-50 text-purple-600 rounded text-sm font-medium border border-purple-200 text-center flex items-center justify-center gap-2 animate-fade-in">
                            <Activity size={16}/> 任务已创建
                        </div>
                    ) : (
                        <button 
                            onClick={handleLaunchCompute}
                            disabled={computeStatus === 'loading'}
                            className="w-full py-2 bg-white hover:bg-gray-50 text-gray-700 rounded text-sm border border-gray-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {computeStatus === 'loading' && <Loader2 size={14} className="animate-spin" />}
                            {computeStatus === 'loading' ? '初始化环境...' : '发起协同计算'}
                        </button>
                    )}
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};