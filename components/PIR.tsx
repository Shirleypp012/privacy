import React, { useState } from 'react';
import { 
  Search, Shield, Database, ArrowRight, Lock, EyeOff, 
  FileText, Settings, History
} from 'lucide-react';

export const PIR: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if(!query) return;
    setIsSearching(true);
    setTimeout(() => {
       setIsSearching(false);
       setResult({
          id: 'RES-991',
          data: { credit_score: 750, risk_level: 'Low', last_active: '2023-10-24' },
          proof: 'zk-SNARK-proof-0x1a2b...'
       });
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 animate-fade-in">
       
       <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full max-w-3xl">
             <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-slate-900 border border-slate-800 rounded-xl mb-6 shadow-2xl">
                   <EyeOff size={32} className="text-blue-500" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">PIR 隐匿查询系统</h1>
                <p className="text-slate-400 text-lg">查询方隐匿意图，数据方保护库隐私。基于同态加密与不经意传输 (OT) 协议。</p>
             </div>

             {/* Search Bar */}
             <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-2 flex items-center shadow-xl shadow-black/50 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50">
                <div className="pl-4 pr-3 text-slate-500">
                   <Search size={24} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="请输入加密查询索引 (例如: User_ID_Hash)..." 
                  className="flex-1 bg-transparent border-none text-white text-lg placeholder:text-slate-600 focus:outline-none h-14"
                />
                <div className="pr-2">
                   <button 
                     onClick={handleSearch}
                     disabled={isSearching}
                     className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                   >
                      {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '隐匿查询'}
                   </button>
                </div>
             </div>

             {/* Settings / Tags */}
             <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                   <Lock size={14} className="text-emerald-500" />
                   <span>AES-256 + HE Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                   <Database size={14} className="text-blue-500" />
                   <span>Target: Credit_Database_V1</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800 cursor-pointer hover:border-slate-600 hover:text-white transition-colors">
                   <Settings size={14} />
                   <span>高级设置</span>
                </div>
             </div>
          </div>

          {/* Result Area */}
          {result && !isSearching && (
             <div className="relative z-10 w-full max-w-3xl mt-12 animate-slide-up">
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden">
                   <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                   <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                               <Shield size={20} className="text-emerald-400" /> 查询成功
                            </h3>
                            <div className="text-sm text-slate-500 mt-1">耗时: 1.2s • 通信量: 24KB</div>
                         </div>
                         <button onClick={() => setResult(null)} className="text-slate-500 hover:text-white">&times;</button>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Decrypted Result</div>
                            <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-sm text-emerald-400">
                               {JSON.stringify(result.data, null, 2)}
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zero-Knowledge Proof</div>
                            <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-xs text-slate-500 break-all">
                               {result.proof}
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="bg-slate-900 p-3 border-t border-slate-800 flex justify-between items-center px-6">
                      <div className="text-xs text-slate-500">此查询记录已上链存证 (Hash: 0x9a...b2)</div>
                      <button className="text-xs text-blue-400 hover:text-white">下载证明报告</button>
                   </div>
                </div>
             </div>
          )}
       </div>

    </div>
  );
};