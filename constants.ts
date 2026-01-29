import {
  LayoutDashboard,
  Database,
  Network,
  ShieldAlert,
  FileKey,
  Activity,
  Settings,
  BrainCircuit,
  Lock,
  Eye,
  Fingerprint,
  Server,
  Search,
  Box
} from 'lucide-react';
import { NavItem, PageRoute, DataAsset, WorkflowNode, AuditLog } from './types';

// --- Navigation Structure ---
export const APP_NAVIGATION: NavItem[] = [
  {
    id: 'dashboard',
    label: '仪表盘 (Dashboard)',
    icon: LayoutDashboard,
    path: PageRoute.DASHBOARD
  },
  {
    id: 'data-center',
    label: '数据资产中心 (Data Assets)',
    icon: Database,
    subItems: [
      { id: 'data-assets', label: '资产管理 (Management)', path: PageRoute.DATA_ASSETS },
      { id: 'data-catalog', label: '数据目录 (Catalog)', path: PageRoute.DATA_CATALOG },
      { id: 'data-watermark', label: '数字水印 (Watermark)', path: PageRoute.DATA_WATERMARK },
    ]
  },
  {
    id: 'computation',
    label: '隐私计算 (Privacy Compute)',
    icon: BrainCircuit,
    subItems: [
      { id: 'fl', label: '联邦学习 (Federated Learning)', path: PageRoute.FEDERATED_LEARNING },
      { id: 'mpc', label: '多方计算 (Secure MPC)', path: PageRoute.MPC },
      { id: 'tee', label: 'TEE 可信计算', path: PageRoute.TEE },
      { id: 'pir', label: 'PIR 隐匿查询', path: PageRoute.PIR },
    ]
  },
  {
    id: 'security',
    label: '安全与审计 (Security)',
    icon: ShieldAlert,
    subItems: [
      { id: 'audit', label: '可信审计 (Trusted Audit)', path: PageRoute.AUDIT },
      { id: 'privacy-budget', label: '隐私预算 (Privacy Budget)' },
      { id: 'compliance', label: '合规中心 (Compliance)' },
    ]
  },
  {
    id: 'system',
    label: '系统设置 (Settings)',
    icon: Settings,
    path: PageRoute.SETTINGS
  }
];

// --- Mock Data: Assets ---
export const MOCK_ASSETS: DataAsset[] = [
  { id: 'DA-001', name: 'Retail_Transaction_Q3 (零售交易)', type: '结构化 (Structured)', provider: '商业银行 A', sensitivity: 'L3 (机密)', rows: 4500000, status: '在线 (Active)', lastUpdate: '2023-10-24 10:00' },
  { id: 'DA-002', name: 'User_Behavior_Logs (行为日志)', type: '非结构化 (Unstructured)', provider: '电商平台', sensitivity: 'L2 (内部)', rows: 12000000, status: '同步中 (Syncing)', lastUpdate: '2023-10-24 11:15' },
  { id: 'DA-003', name: 'Credit_Risk_Blacklist (黑名单)', type: '结构化 (Structured)', provider: '金融科技联盟', sensitivity: 'L4 (绝密)', rows: 85000, status: '在线 (Active)', lastUpdate: '2023-10-23 09:30' },
  { id: 'DA-004', name: 'Marketing_Graph_V2 (营销图谱)', type: '图数据 (Graph)', provider: '电信运营商', sensitivity: 'L3 (机密)', rows: 2500000, status: '离线 (Offline)', lastUpdate: '2023-10-20 16:45' },
  { id: 'DA-005', name: 'Healthcare_Records_Anon (医疗)', type: '结构化 (Structured)', provider: '三甲医院集群', sensitivity: 'L4 (绝密)', rows: 500000, status: '在线 (Active)', lastUpdate: '2023-10-24 08:00' },
];

// --- Mock Data: Workflow Nodes (Federated Learning) ---
export const INITIAL_NODES: WorkflowNode[] = [
  { id: 'n1', type: 'data', label: '银行A数据 (Host)', x: 50, y: 100, status: 'ready' },
  { id: 'n2', type: 'data', label: '科技公司B数据 (Guest)', x: 50, y: 300, status: 'ready' },
  { id: 'n3', type: 'process', label: 'PSI (隐私求交)', x: 300, y: 200, status: 'completed' },
  { id: 'n4', type: 'model', label: 'SecureBoost (纵向建模)', x: 550, y: 200, status: 'running' },
  { id: 'n5', type: 'output', label: '模型评估 (Evaluation)', x: 800, y: 200, status: 'ready' },
];

// --- Mock Data: Audit Logs ---
export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: 'LOG-9921', timestamp: '10:24:12', action: '启动 PSI 求交协议', user: 'System_Admin', entity: 'Task #8821', status: 'Success', hash: '0x7f...a92' },
  { id: 'LOG-9920', timestamp: '10:23:45', action: '请求访问数据资产', user: 'Analyst_J', entity: 'Retail_Trans_Q3', status: 'Success', hash: '0x3a...b11' },
  { id: 'LOG-9919', timestamp: '10:15:00', action: '检查隐私预算消耗', user: 'Policy_Engine', entity: 'Query #102', status: 'Warning', hash: '0x1c...d44' },
  { id: 'LOG-9918', timestamp: '09:55:22', action: '联邦模型参数聚合', user: 'Arbiter_Node', entity: 'FL_Job_Risk_V1', status: 'Success', hash: '0xe2...f55' },
  { id: 'LOG-9917', timestamp: '09:40:10', action: '导出计算结果数据', user: 'User_Unknown', entity: 'Dataset_X', status: 'Denied', hash: '0x99...001' },
];
