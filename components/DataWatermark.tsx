import React, { useState } from 'react';
import { 
  Fingerprint, FileLock, ShieldCheck, Activity, Upload, CheckCircle, 
  AlertTriangle, Crosshair, Cpu, Database
} from 'lucide-react';

const TABS = [
  { id: 'embed', label: '水印嵌入 (Embed)' },
  { id: 'manage', label: '水印管理 (Manage)' },
  { id: 'verify', label: '水印验证 (Verify)' },
  { id: 'trace', label: '溯源分析 (Trace)' },
];

export const DataWatermark: React.FC = () => {
  const [activeTab, setActiveTab] = useState('embed');
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="h-full flex flex-col bg-slate-950 animate-fade-in">
      
      {/* 1. Header */}
      <div className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 flex justify-between items-center shrink-0">
        <div>
           <h1 className="text-lg font-bold text-white flex items-center gap-2">
             <Fingerprint className="text-blue-500" size={24} />
             数字水印中心 (Digital Watermark)
           </h1>
           <p className="text-xs text-slate-400 mt-1">模型与数据资产的全生命周期版权保护与溯源。</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
           {TABS.map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                 activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
               }`}
             >
               {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
         
         {/* --- EMBED MODULE --- */}
         {activeTab === 'embed' && (
           <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8">
              {/* Left: Configuration */}
              <div className="col-span-12 md:col-span-8 space-y-8">
                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                       选择嵌入对象
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="p-4 bg-slate-800 border-2 border-blue-500 rounded-lg cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>
                          <Cpu size={24} className="text-blue-400 mb-2" />
                          <div className="font-bold text-white">模型文件</div>
                          <div className="text-xs text-slate-400">ONNX, PTH, PB</div>
                       </div>
                       <div className="p-4 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg cursor-pointer">
                          <Database size={24} className="text-slate-400 mb-2" />
                          <div className="font-bold text-slate-200">结构化数据</div>
                          <div className="text-xs text-slate-500">CSV, Parquet</div>
                       </div>
                       <div className="p-4 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg cursor-pointer">
                          <FileLock size={24} className="text-slate-400 mb-2" />
                          <div className="font-bold text-slate-200">文档/图片</div>
                          <div className="text-xs text-slate-500">PDF, PNG</div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                       水印算法配置
                    </h3>
                    <div className="space-y-6">
                       <div>
                          <label className="text-sm text-slate-300 mb-2 block">水印类型</label>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-3 bg-blue-900/20 border border-blue-500/50 rounded flex items-center gap-3 cursor-pointer">
                                <Crosshair size={18} className="text-blue-400" />
                                <div>
                                   <div className="text-sm font-bold text-blue-100">参数指纹水印</div>
                                   <div className="text-xs text-blue-300/70">抗剪枝、抗微调</div>
                                </div>
                             </div>
                             <div className="p-3 bg-slate-800 border border-slate-700 rounded flex items-center gap-3 cursor-pointer opacity-60">
                                <Activity size={18} className="text-slate-400" />
                                <div>
                                   <div className="text-sm font-bold text-slate-200">触发集后门水印</div>
                                   <div className="text-xs text-slate-500">黑盒验证</div>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-8">
                          <div>
                             <label className="text-xs text-slate-400 mb-2 block">嵌入强度 (Intensity)</label>
                             <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" defaultValue="50" />
                             <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>Low</span><span>High</span></div>
                          </div>
                          <div>
                             <label className="text-xs text-slate-400 mb-2 block">隐蔽性 (Stealth)</label>
                             <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" defaultValue="80" />
                             <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>Visible</span><span>Invisible</span></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right: Upload & Action */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
                 <div 
                   className={`flex-1 min-h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-colors
                     ${dragActive ? 'border-blue-500 bg-blue-900/20' : 'border-slate-700 bg-slate-900/30 hover:border-slate-500'}
                   `}
                   onDragEnter={() => setDragActive(true)}
                   onDragLeave={() => setDragActive(false)}
                 >
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                       <Upload size={32} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-200 mb-1">点击或拖拽上传文件</h4>
                    <p className="text-xs text-slate-500 max-w-[200px]">支持 .pth, .onnx, .csv 等格式<br/>最大 500MB</p>
                 </div>

                 <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-lg shadow-xl shadow-blue-900/50 transition-transform active:scale-95 flex items-center justify-center gap-2">
                    <Fingerprint /> 开始嵌入 (Embed)
                 </button>
              </div>
           </div>
         )}
         
         {/* --- VERIFY MODULE --- */}
         {activeTab === 'verify' && (
            <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
               <ShieldCheck size={64} className="text-emerald-500 mx-auto mb-6" />
               <h2 className="text-2xl font-bold text-white mb-2">水印验证中心</h2>
               <p className="text-slate-400 mb-8">上传疑似泄露的模型或数据，系统将自动提取水印并进行区块链存证比对。</p>
               
               <div className="max-w-md mx-auto">
                  <div className="p-1 rounded-lg bg-slate-800 border border-slate-700 flex items-center">
                     <input type="text" placeholder="输入水印 ID 或上传文件 Hash..." className="flex-1 bg-transparent border-none px-4 text-white focus:outline-none" />
                     <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium">验证</button>
                  </div>
               </div>

               <div className="mt-12 grid grid-cols-3 gap-6 text-left">
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                     <div className="text-xs text-slate-500 uppercase mb-2">Confidence Score</div>
                     <div className="text-3xl font-bold text-white">99.8%</div>
                     <div className="h-1.5 w-full bg-slate-700 rounded-full mt-2 overflow-hidden"><div className="w-[99%] h-full bg-emerald-500"></div></div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                     <div className="text-xs text-slate-500 uppercase mb-2">Owner</div>
                     <div className="text-lg font-bold text-blue-400">Risk_Control_Team</div>
                     <div className="text-xs text-slate-500 mt-1">ID: ORG-8821</div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                     <div className="text-xs text-slate-500 uppercase mb-2">Timestamp</div>
                     <div className="text-lg font-bold text-white">2023-10-24</div>
                     <div className="text-xs text-slate-500 mt-1">14:30:22 UTC</div>
                  </div>
               </div>
            </div>
         )}

      </div>
    </div>
  );
};