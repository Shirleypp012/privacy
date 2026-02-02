import React, { useState } from 'react';
import { MOCK_AUDIT_LOGS } from '../constants';
import { Shield, FileCheck, AlertOctagon, Download, CheckCircle, ArrowRight, Clock, FileText, User, ShieldCheck } from 'lucide-react';

const AuditChainNode = ({ label, status, time }: { label: string, status: 'done' | 'active' | 'pending', time?: string }) => (
  <div className="flex flex-col items-center relative z-10">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all
       ${status === 'done' ? 'bg-white border-emerald-500 text-emerald-500' : 
         status === 'active' ? 'bg-white border-blue-500 text-blue-500 shadow-lg shadow-blue-100' : 
         'bg-gray-100 border-gray-300 text-gray-400'}
    `}>
       {status === 'done' ? <CheckCircle size={18} /> : status === 'active' ? <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" /> : <div className="w-3 h-3 bg-gray-400 rounded-full" />}
    </div>
    <div className="mt-2 text-xs font-medium text-gray-600 text-center w-24">{label}</div>
    {time && <div className="text-[10px] text-gray-400 mt-0.5 font-mono">{time}</div>}
  </div>
);

const AuditChainConnector = ({ active }: { active: boolean }) => (
  <div className="flex-1 h-0.5 mx-2 bg-gray-200 relative top-[-24px] -z-0">
    {active && <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-400/0 opacity-50"></div>}
  </div>
);

export const AuditCenter: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState(MOCK_AUDIT_LOGS[0]);

  return (
    <div className="p-6 h-full flex flex-col gap-6 animate-fade-in overflow-hidden">
      
      {/* 1. Top Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
           <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
             <FileCheck size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-gray-800">99.9%</div>
             <div className="text-xs text-gray-500">合规率 (Compliance Rate)</div>
           </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
           <div className="p-3 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
             <Shield size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-gray-800">45,201</div>
             <div className="text-xs text-gray-500">已验证日志 (Validated)</div>
           </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
           <div className="p-3 bg-rose-50 rounded-lg text-rose-600 border border-rose-100">
             <AlertOctagon size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-gray-800">3</div>
             <div className="text-xs text-gray-500">近期风险 (Recent Risks)</div>
           </div>
        </div>
      </div>

      {/* 2. Main Content Area (Split View) */}
      <div className="flex-1 min-h-0 flex gap-6 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        
        {/* Left: Audit Task/Log List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
           <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
             <h3 className="font-bold text-gray-800 text-sm">审计日志列表 (Audit Logs)</h3>
             <button className="text-xs text-blue-600 hover:text-blue-800">Filters</button>
           </div>
           <div className="flex-1 overflow-y-auto">
             {MOCK_AUDIT_LOGS.map((log) => (
               <div 
                 key={log.id}
                 onClick={() => setSelectedLog(log)}
                 className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-white
                   ${selectedLog.id === log.id ? 'bg-white border-l-2 border-l-blue-500 shadow-sm' : 'border-l-2 border-l-transparent'}
                 `}
               >
                 <div className="flex justify-between items-start mb-1">
                   <span className="text-xs font-mono text-gray-400">{log.timestamp}</span>
                   <span className={`text-[10px] px-1.5 rounded border ${log.status === 'Success' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-amber-600 border-amber-200 bg-amber-50'}`}>
                     {log.status}
                   </span>
                 </div>
                 <div className="text-sm text-gray-800 font-medium mb-1">{log.action}</div>
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                   <User size={12} /> {log.user}
                   <span className="text-gray-300">|</span>
                   <span className="truncate max-w-[100px]">{log.entity}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Center/Right: Chain Visualization & Details */}
        <div className="flex-1 flex flex-col bg-white">
           
           {/* Top: Visual Chain (Data Provenance) */}
           <div className="h-1/2 border-b border-gray-200 p-8 flex flex-col items-center justify-center relative bg-gray-50/50">
              <div className="absolute top-4 left-4 text-sm font-bold text-gray-700 flex items-center gap-2">
                 <ShieldCheck size={16} className="text-blue-600" />
                 可信溯源链路 (Provenance Chain)
              </div>
              
              {/* The Chain Visualization */}
              <div className="flex items-center w-full max-w-2xl mt-4">
                 <AuditChainNode label="身份认证" status="done" time="10:24:10" />
                 <AuditChainConnector active={true} />
                 <AuditChainNode label="访问鉴权" status="done" time="10:24:11" />
                 <AuditChainConnector active={true} />
                 <AuditChainNode label="隐私计算" status="active" time="Running" />
                 <AuditChainConnector active={false} />
                 <AuditChainNode label="结果上链" status="pending" />
              </div>
           </div>

           {/* Bottom: Log Details & Validation */}
           <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                       <FileText size={16} className="text-gray-400" /> 
                       详细信息 (Details)
                    </h3>
                    <div className="space-y-4">
                       <div className="grid grid-cols-3 gap-2 text-xs border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Log ID</span>
                          <span className="col-span-2 text-gray-700 font-mono select-all">{selectedLog.id}</span>
                       </div>
                       <div className="grid grid-cols-3 gap-2 text-xs border-b border-gray-100 pb-2">
                          <span className="text-gray-500">User Context</span>
                          <span className="col-span-2 text-gray-700">{selectedLog.user} (IP: 192.168.1.X)</span>
                       </div>
                       <div className="grid grid-cols-3 gap-2 text-xs border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Resource</span>
                          <span className="col-span-2 text-blue-600 cursor-pointer hover:underline">{selectedLog.entity}</span>
                       </div>
                       <div className="grid grid-cols-3 gap-2 text-xs">
                          <span className="text-gray-500">Operation</span>
                          <span className="col-span-2 text-gray-700">READ (Access Type: Full)</span>
                       </div>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                       <Shield size={16} className="text-gray-400" /> 
                       区块链验证 (Blockchain Verification)
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                       <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                             <CheckCircle size={20} />
                          </div>
                          <div>
                             <div className="text-sm text-emerald-600 font-bold">哈希验证通过</div>
                             <div className="text-xs text-gray-500">该日志未被篡改</div>
                          </div>
                       </div>
                       <div className="space-y-2 mt-4">
                          <div>
                             <label className="text-[10px] text-gray-400 uppercase font-bold">Transaction Hash</label>
                             <div className="text-xs text-gray-600 font-mono break-all bg-white p-2 rounded border border-gray-200 shadow-sm">
                                {selectedLog.hash}99281...e21
                             </div>
                          </div>
                          <div>
                             <label className="text-[10px] text-gray-400 uppercase font-bold">Block Height</label>
                             <div className="text-xs text-blue-600 font-mono">#12,400,291</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};