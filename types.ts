import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  subItems?: NavItem[];
  path?: string;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: string;
}

export interface DataAsset {
  id: string;
  name: string;
  type: string; 
  provider: string;
  sensitivity: string; 
  rows: number;
  status: string; 
  lastUpdate: string;
}

export interface Task {
  id: string;
  name: string;
  type: string;
  status: 'Running' | 'Completed' | 'Waiting' | 'Failed';
  progress: number;
  nodes: number;
  route: string;
}

export interface WorkflowNode {
  id: string;
  type: 'data' | 'process' | 'model' | 'output';
  label: string;
  x: number;
  y: number;
  status: 'ready' | 'running' | 'completed' | 'error';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  entity: string;
  status: string; 
  hash: string;
  type?: 'info' | 'success' | 'warn' | 'error'; // Added for UI styling
}

export enum PageRoute {
  DASHBOARD = 'dashboard',
  DATA_ASSETS = 'data_assets',
  DATA_CATALOG = 'data_catalog',
  DATA_WATERMARK = 'data_watermark',
  FEDERATED_LEARNING = 'federated_learning',
  MPC = 'mpc',
  TEE = 'tee',
  PIR = 'pir',
  AUDIT = 'audit',
  SETTINGS = 'settings',
}