import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, Database, RefreshCw, EyeOff } from 'lucide-react';
import { MOCK_ASSETS } from '../constants';

export const DataAssets: React.FC = () => {
  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">数据资产中心 (Data Asset Center)</h1>
          <p className="text-slate-400 text-sm mt-1">管理本地及联邦数据资产，配置敏感分级与权限。</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm font-medium transition-colors">
          <Plus size={16} /> 注册资产 (Register)
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="搜索资产名称、ID 或 标签..." 
            className="w-full bg-slate-900 border border-slate-700 rounded pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-300 text-sm hover:text-white hover:border-slate-600 transition-colors">
            <Filter size={16} /> 筛选 (Filter)
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-300 text-sm hover:text-white hover:border-slate-600 transition-colors">
             <RefreshCw size={16} /> 同步 (Sync)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700 text-xs uppercase text-slate-400">
                <th className="p-4 font-semibold">资产名称 (Name) / ID</th>
                <th className="p-4 font-semibold">类型 (Type)</th>
                <th className="p-4 font-semibold">提供方 (Provider)</th>
                <th className="p-4 font-semibold">敏感分级 (Sensitivity)</th>
                <th className="p-4 font-semibold">行数 (Rows)</th>
                <th className="p-4 font-semibold">状态 (Status)</th>
                <th className="p-4 font-semibold">最后更新 (Last Update)</th>
                <th className="p-4 font-semibold text-right">操作 (Action)</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-800">
              {MOCK_ASSETS.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-slate-800 text-blue-400 group-hover:bg-blue-900/30 group-hover:text-blue-300 transition-colors">
                        <Database size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{asset.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{asset.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{asset.type}</td>
                  <td className="p-4 text-slate-300">{asset.provider}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                      ${asset.sensitivity.includes('L4') ? 'bg-rose-950/30 text-rose-400 border-rose-900' : 
                        asset.sensitivity.includes('L3') ? 'bg-amber-950/30 text-amber-400 border-amber-900' :
                        'bg-blue-950/30 text-blue-400 border-blue-900'
                      }`}>
                      {asset.sensitivity}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-mono">{asset.rows.toLocaleString()}</td>
                  <td className="p-4">
                     <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${
                         asset.status.includes('Active') ? 'bg-emerald-500' : 
                         asset.status.includes('Syncing') ? 'bg-blue-500 animate-pulse' : 'bg-slate-500'
                       }`}></span>
                       <span className="text-slate-300">{asset.status}</span>
                     </div>
                  </td>
                  <td className="p-4 text-slate-400">{asset.lastUpdate}</td>
                  <td className="p-4 text-right">
                    <button className="p-1 hover:bg-slate-700 rounded text-slate-500 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="mt-auto border-t border-slate-700 p-4 flex justify-between items-center text-xs text-slate-400 bg-slate-900/50">
           <span>显示 1-5 共 24 条资产</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50" disabled>上一页</button>
              <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 text-white">1</button>
              <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700">2</button>
              <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700">3</button>
              <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700">下一页</button>
           </div>
        </div>
      </div>
    </div>
  );
};