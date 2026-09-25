import React from 'react';
import { Shield, Sparkles, CheckCircle2, FileQuestion, Users, Database } from 'lucide-react';

export type ProvenanceType =
  | 'VERIFIED'
  | 'ESTIMATED'
  | 'MODELLED'
  | 'USER PROVIDED'
  | 'COMMUNITY REPORTED'
  | 'AI GENERATED';

interface ProvenanceBadgeProps {
  type: ProvenanceType;
  source?: string;
  confidence?: number;
  timestamp?: string;
  className?: string;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  type,
  source = 'Official Census / APMC Agmarknet',
  confidence = 95,
  timestamp = 'Sept 2026',
  className = '',
}) => {
  const config = {
    VERIFIED: {
      label: 'VERIFIED',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      dot: 'bg-emerald-600',
      icon: CheckCircle2,
    },
    ESTIMATED: {
      label: 'ESTIMATED',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      dot: 'bg-amber-600',
      icon: FileQuestion,
    },
    MODELLED: {
      label: 'MODELLED',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-300',
      dot: 'bg-blue-600',
      icon: Database,
    },
    'USER PROVIDED': {
      label: 'USER PROVIDED',
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-300',
      dot: 'bg-purple-600',
      icon: Shield,
    },
    'COMMUNITY REPORTED': {
      label: 'COMMUNITY REPORTED',
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-300',
      dot: 'bg-indigo-600',
      icon: Users,
    },
    'AI GENERATED': {
      label: 'AI GENERATED',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      dot: 'bg-slate-500',
      icon: Sparkles,
    },
  }[type];

  const Icon = config.icon;

  return (
    <span
      title={`Provenance: ${type} | Source: ${source} | Confidence: ${confidence}% | Date: ${timestamp}`}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${config.bg} ${config.text} ${config.border} shadow-2xs select-none cursor-help ${className}`}
    >
      <Icon className="w-2.5 h-2.5" />
      <span>{config.label}</span>
      {confidence && <span className="opacity-75 font-mono text-[9px]">{confidence}%</span>}
    </span>
  );
};
