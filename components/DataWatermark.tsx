import React, { useState, useRef } from 'react';
import { 
  Fingerprint, FileLock, ShieldCheck, Activity, Upload, CheckCircle, 
  AlertTriangle, Crosshair, Cpu, Database, Loader2, FileCheck, X,
  FileText, Search, Filter, History, Share2
} from 'lucide-react';

const TABS = [
  { id: 'embed', label: '水印嵌入 (Embed)' },
  { id: 'manage', label: '水印管理 (Manage)' },
  { id: 'verify', label: '水印验证 (Verify)' },
  { id: 'trace', label: '溯源分析 (Trace)' },
];

const MANAGED_WATERMARKS = [
  { id: 'WM-2026-001', asset: 'Risk_Control_Model_v2.pth', type: 'Model (Param Noise)', date: '2026-01-14 14:30', owner: 'Risk Team', status: 'Active' },
  { id: 'WM-2026-002', asset: 'User_Trans_2025Q4.csv', type: 'Data (Row Insert)', date: '2026-01-12 09:15', owner: 'Data Ops', status: 'Active' },
  { id: 'WM-2025-089', asset: 'Internal_Strategy_Doc.pdf', type: 'Doc (Invisible)', date: '2025-12-20 11:00', owner: 'Strategy', status: 'Expired' },
];

export const DataWatermark: React.FC = () => {
  const [activeTab, setActiveTab] = useState('embed');
  const [dragActive, setDragActive] = useState(false);
  const [selectedType, setSelectedType] = useState<'model' | 'data' | 'doc'>('model');
  
  // Embed State
  const [file, setFile] = useState<File | null>(null);
  const [embedState, setEmbedState] = useState<'idle' | 'processing' | 'done'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Verify State
  const [verifyState, setVerifyState] = useState<'idle' | 'processing' | 'done'>('idle');

  // Handlers for File Upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if(embedState === 'idle' && !file) {
        fileInputRef.current?.click();
    }
  };

  // Process Handlers
  const handleEmbed = () => {
      if(!file) return;
      setEmbedState('processing');
      setTimeout(() => {
          setEmbedState('done');
      }, 2000);
  };

  const handleReset = () => {
      setFile(null);
      setEmbedState('idle');
  }

  const handleVerify = () => {
      setVerifyState('processing');
      setTimeout(() => {
          setVerifyState('done');
      }, 1500);
  }

  // --- Sub-Components ---
  
  const renderEmbedTab = () => (
    <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8">
      {/* Left: Configuration */}
      <div className="col-span-12 md:col-span-8 space-y-8">
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
               选择嵌入对象 (Select Target)
            </h3>
            <div className="grid grid-cols-3 gap-4">
               <div 
                  onClick={() => setSelectedType('model')}
                  className={`p-4 rounded-lg cursor-pointer relative overflow-hidden transition-all 
                    ${selectedType === 'model' ? 'bg-slate-800 border-2 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border border-slate-700 hover:border-slate-500'}
                  `}
               >
                  {selectedType === 'model' && <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>}
                  <Cpu size={24} className={selectedType === 'model' ? "text-blue-400 mb-2" : "text-slate-500 mb-2"} />
                  <div className="font-bold text-white">模型文件</div>
                  <div className="text-xs text-slate-400">ONNX, PTH, PB</div>
               </div>
               <div 
                  onClick={() => setSelectedType('data')}
                  className={`p-4 rounded-lg cursor-pointer relative overflow-hidden transition-all
                    ${selectedType === 'data' ? 'bg-slate-800 border-2 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border border-slate-700 hover:border-slate-500'}
                  `}
               >
                  {selectedType === 'data' && <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>}
                  <Database size={24} className={selectedType === 'data' ? "text-blue-400 mb-2" : "text-slate-500 mb-2"} />
                  <div className="font-bold text-white">结构化数据</div>
                  <div className="text-xs text-slate-400">CSV, Parquet</div>
               </div>
               <div 
                  onClick={() => setSelectedType('doc')}
                  className={`p-4 rounded-lg cursor-pointer relative overflow-hidden transition-all
                    ${selectedType === 'doc' ? 'bg-slate-800 border-2 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border border-slate-700 hover:border-slate-500'}
                  `}
               >
                  {selectedType === 'doc' && <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>}
                  <FileLock size={24} className={selectedType === 'doc' ? "text-blue-400 mb-2" : "text-slate-500 mb-2"} />
                  <div className="font-bold text-white">文档/图片</div>
                  <div className="text-xs text-slate-400">PDF, PNG</div>
               </div>
            </div>
         </div>

         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
               水印算法配置 (Algorithm)
            </h3>
            <div className="space-y-6">
               <div>
                  <label className="text-sm text-slate-300 mb-2 block">水印类型</label>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-blue-900/20 border border-blue-500/50 rounded flex items-center gap-3 cursor-pointer">
                        <Crosshair size={18} className="text-blue-400" />
                        <div>
                           <div className="text-sm font-bold text-blue-100">
                             {selectedType === 'model' ? '参数指纹水印' : selectedType === 'data' ? '行级扰动水印' : '频域隐形水印'}
                           </div>
                           <div className="text-xs text-blue-300/70">高鲁棒性，抗攻击</div>
                        </div>
                     </div>
                     <div className="p-3 bg-slate-800 border border-slate-700 rounded flex items-center gap-3 cursor-pointer opacity-60">
                        <Activity size={18} className="text-slate-400" />
                        <div>
                           <div className="text-sm font-bold text-slate-200">
                             {selectedType === 'model' ? '触发集后门' : selectedType === 'data' ? '列级指纹' : '可见版权水印'}
                           </div>
                           <div className="text-xs text-slate-500">辅助验证</div>
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
         <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept=".pth,.onnx,.csv,.pdf"
            onChange={handleChange}
         />

         <div 
           className={`flex-1 min-h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-colors relative
             ${dragActive ? 'border-blue-500 bg-blue-900/20' : 'border-slate-700 bg-slate-900/30 hover:border-slate-500'}
           `}
           onDragEnter={handleDrag}
           onDragLeave={handleDrag}
           onDragOver={handleDrag}
           onDrop={handleDrop}
           onClick={onButtonClick}
         >
            {embedState === 'idle' && !file && (
                <>
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                        <Upload size={32} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-200 mb-1">点击或拖拽上传文件</h4>
                    <p className="text-xs text-slate-500 max-w-[200px]">支持 .pth, .onnx, .csv 等格式<br/>最大 500MB</p>
                </>
            )}
            {embedState === 'idle' && file && (
                <div className="relative w-full">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="absolute -top-4 -right-2 p-1 bg-slate-800 rounded-full hover:text-white text-slate-500"
                    >
                        <X size={16}/>
                    </button>
                    <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto border border-blue-500/50 text-blue-400">
                        <FileCheck size={32} />
                    </div>
                    <h4 className="font-bold text-white mb-1 truncate px-4">{file.name}</h4>
                    <p className="text-xs text-slate-500">{(file.size / (1024*1024)).toFixed(2)} MB • Ready</p>
                </div>
            )}
            {embedState === 'processing' && (
                <div className="flex flex-col items-center">
                    <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
                    <h4 className="font-bold text-white">Embedding Watermark...</h4>
                    <p className="text-xs text-slate-400 mt-1">Applying algorithm...</p>
                </div>
            )}
            {embedState === 'done' && (
                <div className="flex flex-col items-center animate-scale-in">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/50">
                        <CheckCircle size={32} />
                    </div>
                    <h4 className="font-bold text-white mb-2">嵌入成功 (Success)</h4>
                    <p className="text-xs text-slate-500 mb-4">Watermark ID: WM-{Math.floor(Math.random()*10000)}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleReset(); }} className="text-xs text-blue-400 underline">Process another file</button>
                </div>
            )}
         </div>

         <button 
            onClick={handleEmbed}
            disabled={!file || embedState !== 'idle'}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2
                ${(file && embedState === 'idle') ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/50' : 'bg-slate-700 cursor-not-allowed opacity-50'}
            `}
         >
            {embedState === 'processing' ? 'Processing...' : embedState === 'done' ? 'Completed' : <><Fingerprint /> 开始嵌入 (Embed)</>}
         </button>
      </div>
    </div>
  );

  const renderVerifyTab = () => (
    <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center animate-fade-in">
       <ShieldCheck size={64} className="text-emerald-500 mx-auto mb-6" />
       <h2 className="text-2xl font-bold text-white mb-2">水印验证中心</h2>
       <p className="text-slate-400 mb-8">上传疑似泄露的模型或数据，系统将自动提取水印并进行区块链存证比对。</p>
       
       <div className="max-w-md mx-auto mb-10">
          <div className="p-1 rounded-lg bg-slate-800 border border-slate-700 flex items-center">
             <input type="text" placeholder="输入水印 ID 或上传文件 Hash..." defaultValue="0x8a71...c29" className="flex-1 bg-transparent border-none px-4 text-white focus:outline-none" />
             <button 
                onClick={handleVerify}
                disabled={verifyState === 'processing'}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium disabled:opacity-50"
             >
                {verifyState === 'processing' ? '验证中...' : '验证'}
             </button>
          </div>
       </div>

       {verifyState === 'done' && (
           <div className="grid grid-cols-3 gap-6 text-left animate-slide-up">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-emerald-500/30 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-1 bg-emerald-500/20 rounded-bl"><CheckCircle size={12} className="text-emerald-400"/></div>
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
                 <div className="text-lg font-bold text-white">2026-01-15</div>
                 <div className="text-xs text-slate-500 mt-1">10:30:22 UTC</div>
              </div>
           </div>
       )}
    </div>
  );

  const renderManageTab = () => (
    <div className="max-w-6xl mx-auto space-y-6">
       <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
             <input type="text" placeholder="Search Watermarks..." className="bg-slate-950 border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:border-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 hover:text-white">
             <Filter size={14} /> Filter
          </button>
       </div>
       <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead>
                <tr className="bg-slate-900 text-slate-400 text-xs uppercase">
                   <th className="p-4">Watermark ID</th>
                   <th className="p-4">Asset Name</th>
                   <th className="p-4">Type</th>
                   <th className="p-4">Created Date</th>
                   <th className="p-4">Owner</th>
                   <th className="p-4">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-800">
                {MANAGED_WATERMARKS.map(wm => (
                   <tr key={wm.id} className="hover:bg-slate-800/50">
                      <td className="p-4 font-mono text-slate-300">{wm.id}</td>
                      <td className="p-4 font-bold text-white">{wm.asset}</td>
                      <td className="p-4 text-slate-400">{wm.type}</td>
                      <td className="p-4 text-slate-400">{wm.date}</td>
                      <td className="p-4 text-slate-400">{wm.owner}</td>
                      <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs border ${wm.status === 'Active' ? 'bg-emerald-900/20 text-emerald-500 border-emerald-900' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>{wm.status}</span></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderTraceTab = () => (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
       <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 flex-1 flex flex-col items-center justify-center relative">
          <h3 className="absolute top-6 left-6 font-bold text-white flex items-center gap-2"><Activity size={20} className="text-blue-500"/> 资产全链路溯源 (Full Traceability)</h3>
          
          <div className="flex items-center gap-8 relative z-10">
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center mb-2"><Database size={24} className="text-blue-400"/></div>
                <div className="text-sm font-bold text-white">Source</div>
                <div className="text-xs text-slate-500">Bank A DB</div>
             </div>
             
             <div className="w-24 h-0.5 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-500 rounded-full"></div></div>
             
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-emerald-500 flex items-center justify-center mb-2 relative">
                   <Fingerprint size={24} className="text-emerald-400"/>
                   <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] px-1.5 rounded-full">WM</div>
                </div>
                <div className="text-sm font-bold text-white">Embed</div>
                <div className="text-xs text-slate-500">2026-01-15</div>
             </div>

             <div className="w-24 h-0.5 bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-500 rounded-full"></div></div>

             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center mb-2"><Share2 size={24} className="text-purple-400"/></div>
                <div className="text-sm font-bold text-white">Distribute</div>
                <div className="text-xs text-slate-500">To Partner B</div>
             </div>

             <div className="w-24 h-0.5 bg-dashed border-t border-slate-700 relative"></div>

             <div className="flex flex-col items-center opacity-50">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2"><AlertTriangle size={24} className="text-amber-400"/></div>
                <div className="text-sm font-bold text-slate-300">Leakage?</div>
                <div className="text-xs text-slate-500">Monitoring...</div>
             </div>
          </div>
       </div>
    </div>
  );

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
         {activeTab === 'embed' && renderEmbedTab()}
         {activeTab === 'verify' && renderVerifyTab()}
         {activeTab === 'manage' && renderManageTab()}
         {activeTab === 'trace' && renderTraceTab()}
      </div>
    </div>
  );
};