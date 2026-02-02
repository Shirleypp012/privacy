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
         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
               选择嵌入对象 (Select Target)
            </h3>
            <div className="grid grid-cols-3 gap-4">
               <div 
                  onClick={() => setSelectedType('model')}
                  className={`p-4 rounded-lg cursor-pointer relative overflow-hidden transition-all 
                    ${selectedType === 'model' ? 'bg-white border-2 border-blue-600 shadow-md' : 'bg-gray-50 border border-gray-200 hover:border-gray-400'}
                  `}
               >
                  {selectedType === 'model' && <div className="absolute top-0 right-0 p-1 bg-blue-600 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>}
                  <Cpu size={24} className={selectedType === 'model' ? "text-blue-600 mb-2" : "text-gray-400 mb-2"} />
                  <div className="font-bold text-gray-800">模型文件</div>
                  <div className="text-xs text-gray-500">ONNX, PTH, PB</div>
               </div>
               <div 
                  onClick={() => setSelectedType('data')}
                  className={`p-4 rounded-lg cursor-pointer relative overflow-hidden transition-all
                    ${selectedType === 'data' ? 'bg-white border-2 border-blue-600 shadow-md' : 'bg-gray-50 border border-gray-200 hover:border-gray-400'}
                  `}
               >
                  {selectedType === 'data' && <div className="absolute top-0 right-0 p-1 bg-blue-600 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>}
                  <Database size={24} className={selectedType === 'data' ? "text-blue-600 mb-2" : "text-gray-400 mb-2"} />
                  <div className="font-bold text-gray-800">结构化数据</div>
                  <div className="text-xs text-gray-500">CSV, Parquet</div>
               </div>
               <div 
                  onClick={() => setSelectedType('doc')}
                  className={`p-4 rounded-lg cursor-pointer relative overflow-hidden transition-all
                    ${selectedType === 'doc' ? 'bg-white border-2 border-blue-600 shadow-md' : 'bg-gray-50 border border-gray-200 hover:border-gray-400'}
                  `}
               >
                  {selectedType === 'doc' && <div className="absolute top-0 right-0 p-1 bg-blue-600 rounded-bl-lg"><CheckCircle size={12} className="text-white" /></div>}
                  <FileLock size={24} className={selectedType === 'doc' ? "text-blue-600 mb-2" : "text-gray-400 mb-2"} />
                  <div className="font-bold text-gray-800">文档/图片</div>
                  <div className="text-xs text-gray-500">PDF, PNG</div>
               </div>
            </div>
         </div>

         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
               水印算法配置 (Algorithm)
            </h3>
            <div className="space-y-6">
               <div>
                  <label className="text-sm text-gray-600 mb-2 block">水印类型</label>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-blue-50 border border-blue-200 rounded flex items-center gap-3 cursor-pointer">
                        <Crosshair size={18} className="text-blue-600" />
                        <div>
                           <div className="text-sm font-bold text-blue-900">
                             {selectedType === 'model' ? '参数指纹水印' : selectedType === 'data' ? '行级扰动水印' : '频域隐形水印'}
                           </div>
                           <div className="text-xs text-blue-700/70">高鲁棒性，抗攻击</div>
                        </div>
                     </div>
                     <div className="p-3 bg-gray-50 border border-gray-200 rounded flex items-center gap-3 cursor-pointer opacity-80">
                        <Activity size={18} className="text-gray-400" />
                        <div>
                           <div className="text-sm font-bold text-gray-700">
                             {selectedType === 'model' ? '触发集后门' : selectedType === 'data' ? '列级指纹' : '可见版权水印'}
                           </div>
                           <div className="text-xs text-gray-500">辅助验证</div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <label className="text-xs text-gray-500 mb-2 block">嵌入强度 (Intensity)</label>
                     <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" defaultValue="50" />
                     <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>Low</span><span>High</span></div>
                  </div>
                  <div>
                     <label className="text-xs text-gray-500 mb-2 block">隐蔽性 (Stealth)</label>
                     <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" defaultValue="80" />
                     <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>Visible</span><span>Invisible</span></div>
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
             ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}
           `}
           onDragEnter={handleDrag}
           onDragLeave={handleDrag}
           onDragOver={handleDrag}
           onDrop={handleDrop}
           onClick={onButtonClick}
         >
            {embedState === 'idle' && !file && (
                <>
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                        <Upload size={32} className="text-gray-500" />
                    </div>
                    <h4 className="font-bold text-gray-700 mb-1">点击或拖拽上传文件</h4>
                    <p className="text-xs text-gray-500 max-w-[200px]">支持 .pth, .onnx, .csv 等格式<br/>最大 500MB</p>
                </>
            )}
            {embedState === 'idle' && file && (
                <div className="relative w-full">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="absolute -top-4 -right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                    >
                        <X size={16}/>
                    </button>
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto border border-blue-200 text-blue-600">
                        <FileCheck size={32} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1 truncate px-4">{file.name}</h4>
                    <p className="text-xs text-gray-500">{(file.size / (1024*1024)).toFixed(2)} MB • Ready</p>
                </div>
            )}
            {embedState === 'processing' && (
                <div className="flex flex-col items-center">
                    <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
                    <h4 className="font-bold text-gray-800">Embedding Watermark...</h4>
                    <p className="text-xs text-gray-500 mt-1">Applying algorithm...</p>
                </div>
            )}
            {embedState === 'done' && (
                <div className="flex flex-col items-center animate-scale-in">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-500 border border-emerald-200">
                        <CheckCircle size={32} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">嵌入成功 (Success)</h4>
                    <p className="text-xs text-gray-500 mb-4">Watermark ID: WM-{Math.floor(Math.random()*10000)}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleReset(); }} className="text-xs text-blue-600 underline">Process another file</button>
                </div>
            )}
         </div>

         <button 
            onClick={handleEmbed}
            disabled={!file || embedState !== 'idle'}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
                ${(file && embedState === 'idle') ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'bg-gray-300 cursor-not-allowed'}
            `}
         >
            {embedState === 'processing' ? 'Processing...' : embedState === 'done' ? 'Completed' : <><Fingerprint /> 开始嵌入 (Embed)</>}
         </button>
      </div>
    </div>
  );

  const renderVerifyTab = () => (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 text-center animate-fade-in shadow-sm">
       <ShieldCheck size={64} className="text-emerald-500 mx-auto mb-6" />
       <h2 className="text-2xl font-bold text-gray-800 mb-2">水印验证中心</h2>
       <p className="text-gray-500 mb-8">上传疑似泄露的模型或数据，系统将自动提取水印并进行区块链存证比对。</p>
       
       <div className="max-w-md mx-auto mb-10">
          <div className="p-1 rounded-lg bg-gray-50 border border-gray-300 flex items-center focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
             <input type="text" placeholder="输入水印 ID 或上传文件 Hash..." defaultValue="0x8a71...c29" className="flex-1 bg-transparent border-none px-4 text-gray-700 focus:outline-none placeholder:text-gray-400" />
             <button 
                onClick={handleVerify}
                disabled={verifyState === 'processing'}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium disabled:opacity-50"
             >
                {verifyState === 'processing' ? '验证中...' : '验证'}
             </button>
          </div>
       </div>

       {verifyState === 'done' && (
           <div className="grid grid-cols-3 gap-6 text-left animate-slide-up">
              <div className="p-4 bg-gray-50 rounded-lg border border-emerald-200 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-1 bg-emerald-100 rounded-bl"><CheckCircle size={12} className="text-emerald-600"/></div>
                 <div className="text-xs text-gray-500 uppercase mb-2">Confidence Score</div>
                 <div className="text-3xl font-bold text-gray-800">99.8%</div>
                 <div className="h-1.5 w-full bg-gray-200 rounded-full mt-2 overflow-hidden"><div className="w-[99%] h-full bg-emerald-500"></div></div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                 <div className="text-xs text-gray-500 uppercase mb-2">Owner</div>
                 <div className="text-lg font-bold text-blue-600">Risk_Control_Team</div>
                 <div className="text-xs text-gray-400 mt-1">ID: ORG-8821</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                 <div className="text-xs text-gray-500 uppercase mb-2">Timestamp</div>
                 <div className="text-lg font-bold text-gray-800">2026-01-15</div>
                 <div className="text-xs text-gray-400 mt-1">10:30:22 UTC</div>
              </div>
           </div>
       )}
    </div>
  );

  const renderManageTab = () => (
    <div className="max-w-6xl mx-auto space-y-6">
       <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
             <input type="text" placeholder="Search Watermarks..." className="bg-gray-50 border border-gray-200 rounded-full pl-9 pr-4 py-1.5 text-sm text-gray-800 focus:border-blue-500 focus:bg-white transition-colors" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50">
             <Filter size={14} /> Filter
          </button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                   <th className="p-4">Watermark ID</th>
                   <th className="p-4">Asset Name</th>
                   <th className="p-4">Type</th>
                   <th className="p-4">Created Date</th>
                   <th className="p-4">Owner</th>
                   <th className="p-4">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {MANAGED_WATERMARKS.map(wm => (
                   <tr key={wm.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono text-gray-600">{wm.id}</td>
                      <td className="p-4 font-bold text-gray-800">{wm.asset}</td>
                      <td className="p-4 text-gray-500">{wm.type}</td>
                      <td className="p-4 text-gray-500">{wm.date}</td>
                      <td className="p-4 text-gray-500">{wm.owner}</td>
                      <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs border ${wm.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{wm.status}</span></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderTraceTab = () => (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
       <div className="bg-white border border-gray-200 rounded-xl p-8 flex-1 flex flex-col items-center justify-center relative shadow-sm">
          <h3 className="absolute top-6 left-6 font-bold text-gray-800 flex items-center gap-2"><Activity size={20} className="text-blue-600"/> 资产全链路溯源 (Full Traceability)</h3>
          
          <div className="flex items-center gap-8 relative z-10">
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-300 flex items-center justify-center mb-2"><Database size={24} className="text-blue-600"/></div>
                <div className="text-sm font-bold text-gray-800">Source</div>
                <div className="text-xs text-gray-500">Bank A DB</div>
             </div>
             
             <div className="w-24 h-0.5 bg-gray-300 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div></div>
             
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-white border-2 border-emerald-500 flex items-center justify-center mb-2 relative shadow-lg shadow-emerald-50">
                   <Fingerprint size={24} className="text-emerald-500"/>
                   <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] px-1.5 rounded-full">WM</div>
                </div>
                <div className="text-sm font-bold text-gray-800">Embed</div>
                <div className="text-xs text-gray-500">2026-01-15</div>
             </div>

             <div className="w-24 h-0.5 bg-gray-300 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div></div>

             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-300 flex items-center justify-center mb-2"><Share2 size={24} className="text-purple-500"/></div>
                <div className="text-sm font-bold text-gray-800">Distribute</div>
                <div className="text-xs text-gray-500">To Partner B</div>
             </div>

             <div className="w-24 h-0.5 bg-dashed border-t border-gray-300 relative"></div>

             <div className="flex flex-col items-center opacity-50">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-300 flex items-center justify-center mb-2"><AlertTriangle size={24} className="text-amber-500"/></div>
                <div className="text-sm font-bold text-gray-600">Leakage?</div>
                <div className="text-xs text-gray-400">Monitoring...</div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 animate-fade-in">
      
      {/* 1. Header */}
      <div className="h-20 border-b border-gray-200 bg-white/80 backdrop-blur px-8 flex justify-between items-center shrink-0 z-10">
        <div>
           <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <Fingerprint className="text-blue-600" size={24} />
             数字水印中心 (Digital Watermark)
           </h1>
           <p className="text-xs text-gray-500 mt-1">模型与数据资产的全生命周期版权保护与溯源。</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
           {TABS.map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                 activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
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