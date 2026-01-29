import React from 'react';
import { 
  Server, Shield, Terminal, Cpu, Box, Lock, FileText, 
  PlayCircle, StopCircle, RefreshCw, Key
} from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip 
} from 'recharts';

const NODES = [
  { id: 'tee-node-01', status: 'Running', load: 45, type: 'Intel SGX', region: 'CN-North' },
  { id: 'tee-node-02', status: 'Running', load: 32, type: 'Intel SGX', region: 'CN-North' },
  { id: 'tee-node-03', status: 'Maintenance', load: 0, type: 'AMD SEV', region: 'CN-East' },
];

const TASKS = [
  { id: 'TASK-9921', name: 'Private_Intersection_V2', status: 'Executing', time: '00:04:12' },
  { id: 'TASK-9920', name: 'Secure_Aggregation', status: 'Queued', time: '--:--:--' },
];

const DATA = Array.from({length: 20}, (_, i) => ({name: i, value: Math.random() * 40 + 20}));

export const TEE: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-[#0b1121] animate-fade-in text-slate-200">
      
      {/* 1. Console Header */}
      <div className="h-14 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-3">
            <Shield className="text-emerald-500" size={20} />
            <h1 className="font-bold text-white">可信计算控制台 (TEE Console)</h1>
            <span className="px-2 py-0.5 rounded bg-emerald-900/30 border border-emerald-900 text-emerald-400 text-xs">SGX Enclave Active</span>
         </div>
         <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400 hover:text-white cursor-pointer">Docs</span>
            <span className="text-slate-400 hover:text-white cursor-pointer">Support</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded border border-slate-700">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span className="text-xs">System Normal</span>
            </div>
         </div>
      </div>

      <div className="flex-1 flex min-h-0">
         
         {/* 2. Left Menu */}
         <div className="w-56 bg-slate-900/50 border-r border-slate-800 flex flex-col py-4">
            {[
               { icon: Server, label: '节点管理 (Nodes)' },
               { icon: Box, label: '安全容器 (Containers)' },
               { icon: PlayCircle, label: '任务管理 (Tasks)', active: true },
               { icon: Key, label: '密钥管理 (KMS)' },
               { icon: FileText, label: '远程证明 (Attestation)' },
            ].map((item, i) => (
               <div key={i} className={`flex items-center gap-3 px-6 py-3 cursor-pointer border-l-2 ${item.active ? 'bg-slate-800 border-emerald-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
               </div>
            ))}
         </div>

         {/* 3. Main Dashboard */}
         <div className="flex-1 p-6 overflow-y-auto">
            
            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-6 mb-6">
               <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
                  <div className="text-xs text-slate-500 uppercase">Active Enclaves</div>
                  <div className="text-2xl font-bold text-white">12</div>
               </div>
               <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
                  <div className="text-xs text-slate-500 uppercase">Memory Usage</div>
                  <div className="text-2xl font-bold text-blue-400">24.5 GB</div>
               </div>
               <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
                  <div className="text-xs text-slate-500 uppercase">Attestation Requests</div>
                  <div className="text-2xl font-bold text-emerald-400">1,204</div>
               </div>
               <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
                  <div className="text-xs text-slate-500 uppercase">Security Alerts</div>
                  <div className="text-2xl font-bold text-slate-200">0</div>
               </div>
            </div>

            {/* Main Split: Nodes & Execution */}
            <div className="grid grid-cols-12 gap-6 h-[500px]">
               
               {/* Node List */}
               <div className="col-span-8 bg-slate-800/30 border border-slate-700 rounded-lg flex flex-col">
                  <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                     <h3 className="font-bold text-white text-sm">计算节点状态 (Node Status)</h3>
                     <RefreshCw size={14} className="text-slate-500 cursor-pointer hover:text-white" />
                  </div>
                  <div className="flex-1 overflow-auto">
                     <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-xs text-slate-500">
                           <tr>
                              <th className="p-3">Node ID</th>
                              <th className="p-3">Type</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Load</th>
                              <th className="p-3">Region</th>
                           </tr>
                        </thead>
                        <tbody className="text-sm">
                           {NODES.map(node => (
                              <tr key={node.id} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                                 <td className="p-3 font-mono text-slate-300">{node.id}</td>
                                 <td className="p-3 text-slate-400">{node.type}</td>
                                 <td className="p-3">
                                    <span className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded border ${node.status==='Running' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900' : 'bg-amber-900/20 text-amber-400 border-amber-900'}`}>
                                       <span className={`w-1.5 h-1.5 rounded-full ${node.status==='Running'?'bg-emerald-500':'bg-amber-500'}`}></span>
                                       {node.status}
                                    </span>
                                 </td>
                                 <td className="p-3 w-32">
                                    <div className="flex items-center gap-2">
                                       <div className="flex-1 h-1 bg-slate-700 rounded overflow-hidden">
                                          <div className="h-full bg-blue-500" style={{width: `${node.load}%`}}></div>
                                       </div>
                                       <span className="text-xs text-slate-500">{node.load}%</span>
                                    </div>
                                 </td>
                                 <td className="p-3 text-slate-500">{node.region}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Task Queue & Terminal */}
               <div className="col-span-4 flex flex-col gap-6">
                  <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-lg p-4 flex flex-col">
                     <h3 className="font-bold text-white text-sm mb-3">任务队列 (Task Queue)</h3>
                     <div className="flex-1 space-y-2 overflow-y-auto">
                        {TASKS.map(task => (
                           <div key={task.id} className="p-3 bg-slate-900/50 border border-slate-700 rounded flex justify-between items-center">
                              <div>
                                 <div className="text-sm text-slate-200 font-medium">{task.name}</div>
                                 <div className="text-xs text-slate-500 font-mono">{task.id}</div>
                              </div>
                              <div className="text-right">
                                 <div className={`text-xs ${task.status==='Executing'?'text-blue-400 animate-pulse':'text-slate-500'}`}>{task.status}</div>
                                 <div className="text-[10px] text-slate-600 font-mono">{task.time}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="h-48 bg-black border border-slate-800 rounded-lg p-3 font-mono text-xs flex flex-col">
                     <div className="flex items-center gap-2 text-slate-500 border-b border-slate-900 pb-2 mb-2">
                        <Terminal size={12} /> Console Output
                     </div>
                     <div className="flex-1 overflow-y-auto space-y-1 text-slate-400">
                        <div>[TEE-01] Loading Enclave image... OK</div>
                        <div>[TEE-01] Verifying signature (RSA-4096)... OK</div>
                        <div>[TEE-01] Attestation report generated.</div>
                        <div className="text-emerald-500">[TEE-01] Secure channel established.</div>
                        <div className="text-blue-400">[TEE-01] Processing private intersection... 45%</div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};