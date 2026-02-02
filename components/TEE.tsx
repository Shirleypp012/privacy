import React, { useState } from 'react';
import { 
  Server, Shield, Terminal, Cpu, Box, Lock, FileText, 
  PlayCircle, RefreshCw, Key, CheckCircle, AlertTriangle, 
  MoreHorizontal, Activity, Container, Network, ArrowRight,
  FileBadge
} from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// --- MOCK DATA FOR 2026 ---

const NODES = [
  { id: 'tee-n-01', type: 'Cloud', hw: 'Intel SGX2', state: 'Active', trust: 98, sec: 'L4', res: 45, attestation: 'Verified', risk: 'None' },
  { id: 'tee-n-02', type: 'Edge', hw: 'ARM TrustZone', state: 'Active', trust: 92, sec: 'L3', res: 78, attestation: 'Verified', risk: 'None' },
  { id: 'tee-n-03', type: 'Local', hw: 'AMD SEV-SNP', state: 'Offline', trust: 0, sec: 'L4', res: 0, attestation: 'Expired', risk: 'High' },
  { id: 'tee-n-04', type: 'Cloud', hw: 'Intel TDX', state: 'Active', trust: 99, sec: 'L5', res: 22, attestation: 'Verified', risk: 'None' },
];

const CONTAINERS = [
  { id: 'c-2026-a1', node: 'tee-n-01', img: 'fl-worker:v2.1', signed: true, state: 'Running', isolation: 'High', res: '2GB/1Core', task: 'T-8821' },
  { id: 'c-2026-b2', node: 'tee-n-04', img: 'mpc-psi:v1.0', signed: true, state: 'Running', isolation: 'Max', res: '8GB/4Core', task: 'T-9920' },
  { id: 'c-2026-c3', node: 'tee-n-02', img: 'pir-server:v1.2', signed: false, state: 'Stopped', isolation: 'Medium', res: '-', task: '-' },
];

const TASKS = [
  { id: 'T-26-8821', type: 'FL Training', level: 'L4', node: 'tee-n-01', status: 'Running', enc: 'Active', out: 'Trusted' },
  { id: 'T-26-9920', type: 'PSI Match', level: 'L5', node: 'tee-n-04', status: 'Queued', enc: 'Active', out: 'Pending' },
];

const KEYS = [
  { id: 'K-2026-001', type: 'Master Key', sys: 'FL-Core', life: 'Active', trust: 'L5', created: '2026-01-01' },
  { id: 'K-2026-002', type: 'Session', sys: 'MPC-Bridge', life: 'Active', trust: 'L4', created: '2026-01-15' },
  { id: 'K-2025-999', type: 'Data Key', sys: 'Storage', life: 'Expired', trust: 'L3', created: '2025-10-10' },
];

const ATTESTATIONS = [
  { id: 'ATT-2921', node: 'tee-n-01', type: 'Remote (ECDSA)', status: 'Success', trust: 'L5', time: '2026-01-15 10:00:00' },
  { id: 'ATT-2922', node: 'tee-n-02', type: 'Local', status: 'Success', trust: 'L4', time: '2026-01-15 10:05:00' },
  { id: 'ATT-2923', node: 'tee-n-03', type: 'Remote', status: 'Failed', trust: 'L0', time: '2026-01-14 23:00:00' },
];

const GRAPH_DATA = Array.from({length: 10}, (_, i) => ({name: i, val: Math.floor(Math.random() * 50) + 50}));

// --- SUB-COMPONENT RENDERERS ---

const NodeManager = () => (
  <div className="h-full flex flex-col gap-6 animate-fade-in">
    {/* Stats Bar */}
    <div className="grid grid-cols-5 gap-4">
      {[
        { l: 'Total Nodes', v: 12, c: 'text-gray-900' },
        { l: 'Trusted', v: 10, c: 'text-emerald-600' },
        { l: 'Risk', v: 1, c: 'text-rose-600' },
        { l: 'Offline', v: 1, c: 'text-gray-400' },
        { l: 'Trust Index', v: '96.5', c: 'text-blue-600' },
      ].map((s, i) => (
        <div key={i} className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
          <div className="text-xs text-gray-500 uppercase font-bold">{s.l}</div>
          <div className={`text-2xl font-mono font-bold ${s.c}`}>{s.v}</div>
        </div>
      ))}
    </div>

    {/* Main Content */}
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Server size={18} className="text-blue-600"/> 节点列表 (Node List)</h3>
          <RefreshCw size={14} className="text-gray-500 cursor-pointer hover:text-gray-800" />
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0">
               <tr>
                 <th className="p-3 font-semibold">Node ID</th>
                 <th className="p-3 font-semibold">Type</th>
                 <th className="p-3 font-semibold">Hardware</th>
                 <th className="p-3 font-semibold">State</th>
                 <th className="p-3 font-semibold">Trust Level</th>
                 <th className="p-3 font-semibold">Resources</th>
                 <th className="p-3 font-semibold">Attestation</th>
                 <th className="p-3 font-semibold">Risk</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {NODES.map(node => (
                 <tr key={node.id} className="hover:bg-gray-50 group cursor-pointer transition-colors">
                   <td className="p-3 font-mono text-gray-600 group-hover:text-blue-600">{node.id}</td>
                   <td className="p-3 text-gray-600">{node.type}</td>
                   <td className="p-3 text-gray-600">{node.hw}</td>
                   <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs border ${node.state === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{node.state}</span></td>
                   <td className="p-3"><div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div style={{width: `${node.trust}%`}} className="h-full bg-blue-500"></div></div></td>
                   <td className="p-3 text-gray-600">{node.res}%</td>
                   <td className="p-3 flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12}/> {node.attestation}</td>
                   <td className="p-3"><span className={`text-xs ${node.risk === 'None' ? 'text-gray-400' : 'text-rose-600 font-bold'}`}>{node.risk}</span></td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
      
      {/* Right Detail / Viz Panel */}
      <div className="w-80 flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1 shadow-sm">
           <h3 className="font-bold text-gray-800 mb-4 text-sm">可信节点拓扑 (Topology)</h3>
           <div className="h-48 relative flex items-center justify-center bg-gray-50 rounded-lg">
              {/* Mock Topology */}
              <div className="absolute w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                 <Shield size={32} className="text-blue-500 opacity-50" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
           </div>
           <div className="space-y-3 mt-4">
              <div className="text-xs text-gray-500 uppercase font-bold">Details (tee-n-01)</div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200 text-xs space-y-2">
                 <div className="flex justify-between"><span className="text-gray-500">FW Ver:</span> <span className="text-gray-700">2.14.0</span></div>
                 <div className="flex justify-between"><span className="text-gray-500">Boot:</span> <span className="text-emerald-600">Secure</span></div>
                 <div className="flex justify-between"><span className="text-gray-500">Enclaves:</span> <span className="text-gray-700">4 Active</span></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const ContainerManager = () => (
  <div className="h-full flex flex-col gap-6 animate-slide-in-right">
     <div className="grid grid-cols-4 gap-4">
        {[{l:'Total Containers',v:24},{l:'Trusted',v:22, c:'text-emerald-600'},{l:'Running',v:18, c:'text-blue-600'},{l:'Isolation Level',v:'High'}].map((s,i) => (
           <div key={i} className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500 uppercase">{s.l}</div>
              <div className={`text-xl font-bold font-mono ${s.c || 'text-gray-900'}`}>{s.v}</div>
           </div>
        ))}
     </div>
     <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
           <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                 <th className="p-4">Container ID</th>
                 <th className="p-4">Node</th>
                 <th className="p-4">Image</th>
                 <th className="p-4">Signed</th>
                 <th className="p-4">State</th>
                 <th className="p-4">Isolation</th>
                 <th className="p-4">Task</th>
                 <th className="p-4">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
              {CONTAINERS.map(c => (
                 <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-blue-600">{c.id}</td>
                    <td className="p-4 text-gray-600">{c.node}</td>
                    <td className="p-4 text-gray-700">{c.img}</td>
                    <td className="p-4">{c.signed ? <CheckCircle size={14} className="text-emerald-500"/> : <AlertTriangle size={14} className="text-amber-500"/>}</td>
                    <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${c.state === 'Running' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>{c.state}</span></td>
                    <td className="p-4 text-gray-900 font-bold">{c.isolation}</td>
                    <td className="p-4 font-mono text-gray-500">{c.task}</td>
                    <td className="p-4"><MoreHorizontal size={16} className="text-gray-400 cursor-pointer hover:text-gray-700"/></td>
                 </tr>
              ))}
           </tbody>
        </table>
     </div>
  </div>
);

const TaskManager = () => (
   <div className="h-full flex gap-6 animate-slide-in-right">
      <div className="flex-1 flex flex-col gap-4">
         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50 font-bold text-gray-800 text-sm">任务执行队列 (Execution Queue)</div>
            <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                     <th className="p-4">Task ID</th>
                     <th className="p-4">Type</th>
                     <th className="p-4">Level</th>
                     <th className="p-4">Node</th>
                     <th className="p-4">Status</th>
                     <th className="p-4">Encryption</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {TASKS.map(t => (
                     <tr key={t.id} className="hover:bg-gray-50">
                        <td className="p-4 font-mono text-gray-900">{t.id}</td>
                        <td className="p-4 text-gray-600">{t.type}</td>
                        <td className="p-4 text-amber-600 font-bold">{t.level}</td>
                        <td className="p-4 text-gray-500">{t.node}</td>
                        <td className="p-4"><span className={`flex items-center gap-1.5 ${t.status === 'Running' ? 'text-blue-600' : 'text-gray-500'}`}>{t.status==='Running' && <Activity size={12} className="animate-spin"/>} {t.status}</span></td>
                        <td className="p-4 text-emerald-600 text-xs flex items-center gap-1"><Lock size={12}/> {t.enc}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
      <div className="w-1/3 bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm">
         <h3 className="font-bold text-gray-800 mb-6 text-sm">可信执行链路 (Trusted Chain)</h3>
         <div className="flex-1 relative flex flex-col items-center gap-6">
            {['Input Encryption', 'Node Verification', 'Container Isolation', 'Result Signing'].map((step, i) => (
               <React.Fragment key={i}>
                  <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3 relative z-10">
                     <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center text-blue-600 font-bold shadow-sm">{i+1}</div>
                     <div className="text-sm font-bold text-gray-700">{step}</div>
                     <CheckCircle size={16} className="ml-auto text-emerald-500" />
                  </div>
                  {i<3 && <div className="h-6 w-0.5 bg-gray-300"></div>}
               </React.Fragment>
            ))}
         </div>
      </div>
   </div>
);

const KMSManager = () => (
   <div className="h-full flex flex-col gap-6 animate-slide-in-right">
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
         <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between">
            <h3 className="font-bold text-gray-800 text-sm">密钥列表 (Key Management)</h3>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">Create Key</button>
         </div>
         <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
               <tr>
                  <th className="p-4">Key ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">System</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Trust Level</th>
                  <th className="p-4">Created</th>
                  <th className="p-4">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {KEYS.map(k => (
                  <tr key={k.id} className="hover:bg-gray-50">
                     <td className="p-4 font-mono text-amber-600"><Key size={14} className="inline mr-2"/>{k.id}</td>
                     <td className="p-4 text-gray-800">{k.type}</td>
                     <td className="p-4 text-gray-500">{k.sys}</td>
                     <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${k.life === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500'}`}>{k.life}</span></td>
                     <td className="p-4 text-blue-600 font-bold">{k.trust}</td>
                     <td className="p-4 text-gray-500">{k.created}</td>
                     <td className="p-4 text-blue-600 cursor-pointer hover:underline">Rotate</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      <div className="h-48 bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm">
         <div className="flex-1">
            <div className="text-xs text-gray-500 uppercase font-bold mb-2">Key Usage Activity</div>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={GRAPH_DATA}>
                  <Bar dataKey="val" fill="#3b82f6" radius={[2,2,0,0]} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
   </div>
);

const AttestationManager = () => (
   <div className="h-full flex gap-6 animate-slide-in-right">
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
         <div className="p-4 border-b border-gray-200 bg-gray-50 font-bold text-gray-800 text-sm">远程证明请求 (Remote Attestation)</div>
         <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
               <tr>
                  <th className="p-4">Request ID</th>
                  <th className="p-4">Target Node</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Trust Level</th>
                  <th className="p-4">Timestamp</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {ATTESTATIONS.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50">
                     <td className="p-4 font-mono text-gray-600">{a.id}</td>
                     <td className="p-4 text-gray-900">{a.node}</td>
                     <td className="p-4 text-gray-500">{a.type}</td>
                     <td className="p-4"><span className={`flex items-center gap-1 ${a.status==='Success'?'text-emerald-600':'text-rose-600'}`}>{a.status==='Success'?<CheckCircle size={14}/>:<AlertTriangle size={14}/>} {a.status}</span></td>
                     <td className="p-4 text-blue-600 font-bold">{a.trust}</td>
                     <td className="p-4 text-gray-500 font-mono text-xs">{a.time}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      <div className="w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
         <h3 className="font-bold text-gray-800 mb-6 text-sm flex items-center gap-2"><FileText size={16}/> 证明详情 (Details)</h3>
         <div className="space-y-4">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600 break-all">
               <div className="text-gray-400 mb-1 font-sans font-bold uppercase">Measurement Hash</div>
               0x7a91...b2c9
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-2">
               <div className="flex justify-between"><span className="text-gray-500">Signature:</span> <span className="text-emerald-600">Valid</span></div>
               <div className="flex justify-between"><span className="text-gray-500">Root CA:</span> <span className="text-blue-600">Intel</span></div>
               <div className="flex justify-between"><span className="text-gray-500">Revocation:</span> <span className="text-gray-800">Checked</span></div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors">Download Report</button>
         </div>
      </div>
   </div>
);

// --- MAIN COMPONENT ---

export const TEE: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nodes');

  const MENU = [
     { id: 'nodes', icon: Server, label: '节点管理 (Nodes)' },
     { id: 'containers', icon: Container, label: '安全容器 (Containers)' },
     { id: 'tasks', icon: PlayCircle, label: '任务管理 (Tasks)' },
     { id: 'kms', icon: Key, label: '密钥管理 (KMS)' },
     { id: 'attestation', icon: FileBadge, label: '远程证明 (Attestation)' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 animate-fade-in text-gray-800">
      
      {/* 1. Console Header */}
      <div className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
         <div className="flex items-center gap-3">
            <Shield className="text-emerald-600" size={20} />
            <h1 className="font-bold text-gray-800">可信计算平台控制台 (TEE Platform Console)</h1>
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-mono">System Secure</span>
         </div>
         <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400 font-mono text-xs">v2.4.0-2026</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded border border-gray-200">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-xs text-gray-600">Cluster Healthy</span>
            </div>
         </div>
      </div>

      <div className="flex-1 flex min-h-0">
         
         {/* 2. Left Menu */}
         <div className="w-64 bg-white border-r border-gray-200 flex flex-col py-4">
            {MENU.map((item) => (
               <div 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer border-l-2 transition-all
                     ${activeTab === item.id 
                        ? 'bg-blue-50 border-blue-600 text-blue-700' 
                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                  `}
               >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
               </div>
            ))}
         </div>

         {/* 3. Main Dashboard Area */}
         <div className="flex-1 p-6 overflow-hidden bg-gray-50 relative">
             {/* Removed radial gradient for cleaner look */}
            {activeTab === 'nodes' && <NodeManager />}
            {activeTab === 'containers' && <ContainerManager />}
            {activeTab === 'tasks' && <TaskManager />}
            {activeTab === 'kms' && <KMSManager />}
            {activeTab === 'attestation' && <AttestationManager />}
         </div>
      </div>
    </div>
  );
};