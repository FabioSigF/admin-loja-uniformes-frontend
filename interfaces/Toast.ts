export interface ToastInfo {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  life: number;
}