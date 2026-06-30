/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'protection' | 'repayment';
  status: 'pending' | 'completed' | 'projected';
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'upcoming' | 'predicted_shortfall' | 'protected' | 'paid';
  shortfallAmount?: number;
}

export type Theme = 'dark' | 'light';

export interface WaitlistSubmission {
  id: string;
  firstName: string;
  email: string;
  phone?: string;
  primaryConcern: string;
  launchInterest: string;
  rank: number;
  submittedAt: string;
}

export type SimulationStep =
  | 'start'
  | 'shortfall_detected'
  | 'enable_protection'
  | 'bill_paid'
  | 'repay';
