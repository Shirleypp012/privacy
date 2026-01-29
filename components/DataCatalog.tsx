import React, { useState } from 'react';
import { 
  FolderTree, Search, Filter, Shield, Lock, Eye, CheckCircle, 
  MoreHorizontal, Database, FileText, Activity, Clock, Share2, Layers
} from 'lucide-react';

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

import { Globe } from 'lucide-react'; // Fix missing import for CATEGORIES

export const DataCatalog: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  return (
    <div className="h-full flex flex-col bg-slate-950 animate-fade-in overflow-hidden">
      
      {/* 1. Header Area */}
      <div className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 flex justify-between items-center shrink-0">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="text-blue-500" size={20} />
          数据资产目录 (Data Catalog)
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
             <input type="text" placeholder="全局搜索资产..." className="pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-700 rounded-full text-sm text-white focus:border-blue-500 w-64" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 hover:text-white">
              <Filter size={14} /> 筛选
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded text-xs">
              <CheckCircle size={14} /> 合规检查通过
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        
        {/* 2. Left Sidebar: Categories */}
        <div className="w-64 bg-slate-900/30 border-r border-slate-800 flex flex-col">
           <div className="p-4 border-b border-slate-800">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据域 (Data Domains)</h3>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-6">
              {CATEGORIES.map(cat => (
                <div key={cat.id}>
                   <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded cursor-pointer mb-1">
                      <cat.icon size={16} className="text-blue-500" />
                      {cat.label}
                   </div>
                   <div className="pl-9 space-y-1">
                      {cat.children.map(child => (
                        <div key={child} className="text-xs text-slate-500 hover:text-white cursor-pointer py-1">{child}</div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 3. Main Content: Asset Grid */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ASSETS.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => setSelectedAsset(asset)}
                  className={`bg-slate-900 border rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group
                     ${selectedAsset?.id === asset.id ? 'border-blue-500 shadow-blue-900/20' : 'border-slate-800 hover:border-slate-600'}
                  `}
                >
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-slate-800 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                         <Database size={24} />
                      </div>
                      <MoreHorizontal size={16} className="text-slate-600 hover:text-white" />
                   </div>
                   
                   <h3 className="font-bold text-white mb-1 truncate" title={asset.name}>{asset.name}</h3>
                   <div className="text-xs text-slate-500 font-mono mb-4">{asset.id}</div>

                   <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-400 mb-4">
                      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> {asset.type}</div>
                      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> {asset.rows}</div>
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
                         <span key={u} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300">{u}</span>
                      ))}
                   </div>

                   <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div className="flex gap-2">
                         {asset.compliance && <span className="text-[10px] text-emerald-500 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900">合规</span>}
                         {asset.watermark && <span className="text-[10px] text-blue-500 bg-blue-950/30 px-1.5 py-0.5 rounded border border-blue-900">水印</span>}
                      </div>
                      <button className="text-xs text-blue-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">详情 &rarr;</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 4. Right Sidebar: Details Panel */}
        {selectedAsset && (
           <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col animate-slide-in-right overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="font-bold text-white text-lg">资产详情</h2>
                 <button onClick={() => setSelectedAsset(null)} className="text-slate-500 hover:text-white">&times;</button>
              </div>

              <div className="space-y-6">
                 <section>
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">元数据 (Metadata)</h3>
                    <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 border border-slate-700">
                       <div className="flex justify-between text-xs"><span className="text-slate-400">Owner</span> <span className="text-white">Data Team A</span></div>
                       <div className="flex justify-between text-xs"><span className="text-slate-400">Created</span> <span className="text-white">2023-10-01</span></div>
                       <div className="flex justify-between text-xs"><span className="text-slate-400">Location</span> <span className="text-white">HDFS://cluster-01</span></div>
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">数据血缘 (Lineage)</h3>
                    <div className="h-32 bg-slate-800/30 rounded-lg border border-slate-700 relative overflow-hidden flex items-center justify-center">
                       {/* Mock Lineage */}
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-xs">Src</div>
                          <div className="w-4 h-0.5 bg-slate-600"></div>
                          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-xs shadow-lg shadow-blue-500/50">Cur</div>
                          <div className="w-4 h-0.5 bg-slate-600"></div>
                          <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-xs">App</div>
                       </div>
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">最近活动 (Activity)</h3>
                    <div className="space-y-3">
                       <div className="flex gap-3 text-xs">
                          <Activity size={14} className="text-blue-400 shrink-0 mt-0.5" />
                          <div>
                             <div className="text-slate-300">Used in <span className="text-blue-400">Federated Task #881</span></div>
                             <div className="text-slate-500">2 hours ago</div>
                          </div>
                       </div>
                       <div className="flex gap-3 text-xs">
                          <Eye size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                             <div className="text-slate-300">Sample preview by <span className="text-white">Admin</span></div>
                             <div className="text-slate-500">5 hours ago</div>
                          </div>
                       </div>
                    </div>
                 </section>

                 <div className="pt-4 mt-auto">
                    <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-medium mb-2">申请访问权限</button>
                    <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-sm border border-slate-700">发起协同计算</button>
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};