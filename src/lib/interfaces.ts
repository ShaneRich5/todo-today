export interface WithChildren {
  children: React.ReactNode;
}

export type AvailableStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: AvailableStatus;
  meta?: {
    [key: string]: string;
  };
}
