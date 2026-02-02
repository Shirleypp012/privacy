import React, { useState, useRef } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Database, RefreshCw, X, UploadCloud, CheckCircle, Shield, FileText } from 'lucide-react';
import { MOCK_ASSETS } from '../constants';

export const DataAssets: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState(0); // 0: Select, 1: Process, 2: Done
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
          // Auto start process for UX smoothness
          startProcess();
      }
  };

  const startProcess = () => {
    setIsUploading(true);
    setUploadStep(1);
    
    // Simulate fast process steps
    let p = 0;
    const interval = setInterval(() => {
        p += 5;
        setUploadProgress(p);
        if (p >= 100) {
            clearInterval(interval);
            setUploadStep(2);
            setIsUploading(false);
        }
    }, 50); // Fast 1 second simulation
  };

  const closeModal = () => {
      setShowModal(false);
      setUploadProgress(0);
      setUploadStep(0);
      setSelectedFile(null);
  }

  return (
    <div className="p-6 h-full flex flex-col animate-fade-in relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">数据资产中心 (Data Asset Center)</h1>
          <p className="text-gray-500 text-sm mt-1">管理本地及联邦数据资产，配置敏感分级与权限。</p>
        </div>
        <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={16} /> 闪电接入 (Flash Import)
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索资产名称、ID 或 标签..." 
            className="w-full bg-gray-50 border border-gray-200 rounded pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Filter size={16} /> 筛选 (Filter)
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
             <RefreshCw size={16} /> 同步 (Sync)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
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
            <tbody className="text-sm divide-y divide-gray-100">
              {MOCK_ASSETS.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <Database size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{asset.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{asset.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{asset.type}</td>
                  <td className="p-4 text-gray-600">{asset.provider}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                      ${asset.sensitivity.includes('L4') ? 'bg-rose-50 text-rose-600 border-rose-200' : 
                        asset.sensitivity.includes('L3') ? 'bg-amber-50 text-amber-600 border-amber-200' :
                        'bg-blue-50 text-blue-600 border-blue-200'
                      }`}>
                      {asset.sensitivity}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 font-mono">{asset.rows.toLocaleString()}</td>
                  <td className="p-4">
                     <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${
                         asset.status.includes('Active') ? 'bg-emerald-500' : 
                         asset.status.includes('Syncing') ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                       }`}></span>
                       <span className="text-gray-600">{asset.status}</span>
                     </div>
                  </td>
                  <td className="p-4 text-gray-500">{asset.lastUpdate}</td>
                  <td className="p-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="mt-auto border-t border-gray-200 p-4 flex justify-between items-center text-xs text-gray-500 bg-gray-50">
           <span>显示 1-5 共 24 条资产</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>上一页</button>
              <button className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded">1</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">下一页</button>
           </div>
        </div>
      </div>

      {/* --- FLASH IMPORT MODAL --- */}
      {showModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
              <div className="w-[500px] bg-white border border-gray-200 rounded-xl shadow-2xl p-6 relative overflow-hidden">
                  <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={20}/></button>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <UploadCloud className="text-blue-600" />
                      数据资产闪电接入
                  </h2>
                  
                  <input ref={fileInputRef} type="file" className="hidden" accept=".csv,.parquet,.db" onChange={handleFileSelect} />

                  {uploadStep === 0 && (
                      <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-500 transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <Database size={40} className="text-gray-400 mb-4" />
                                <div className="text-gray-700 font-medium">点击选择本地数据库或文件</div>
                                <div className="text-xs text-gray-500 mt-2">支持 MySQL, Hive, CSV, Parquet</div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                                <Shield size={14} />
                                <span>数据不出域：仅提取元数据与统计特征，原始数据保留在本地。</span>
                          </div>
                      </div>
                  )}

                  {uploadStep === 1 && (
                      <div className="py-8 space-y-6">
                           <div className="space-y-2">
                               <div className="flex justify-between text-sm text-gray-600">
                                   <span>正在本地扫描数据特征... {selectedFile?.name}</span>
                                   <span>{uploadProgress}%</span>
                               </div>
                               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 transition-all duration-75" style={{width: `${uploadProgress}%`}}></div>
                               </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-xs">
                               <div className="flex items-center gap-2 text-emerald-600 animate-pulse">
                                   <CheckCircle size={14} /> 敏感字段识别
                               </div>
                               <div className="flex items-center gap-2 text-emerald-600 animate-pulse" style={{animationDelay: '0.2s'}}>
                                   <CheckCircle size={14} /> 差分隐私噪声添加
                               </div>
                               <div className="flex items-center gap-2 text-emerald-600 animate-pulse" style={{animationDelay: '0.4s'}}>
                                   <CheckCircle size={14} /> 元数据加密上链
                               </div>
                           </div>
                      </div>
                  )}

                  {uploadStep === 2 && (
                      <div className="py-6 text-center animate-scale-in">
                          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 border border-emerald-100">
                              <CheckCircle size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">接入成功！</h3>
                          <p className="text-gray-500 text-sm mb-6">资产 <span className="text-gray-900 font-mono">{selectedFile?.name}</span> 已注册。<br/>并未上传任何原始明文数据。</p>
                          <div className="flex gap-3 justify-center">
                              <button onClick={closeModal} className="px-6 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm">关闭</button>
                              <button onClick={closeModal} className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white text-sm">查看详情</button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};