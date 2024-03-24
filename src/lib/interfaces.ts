export interface WithChildren {
  children: React.ReactNode;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  meta?: {
    [key: string]: string;
  };
}
