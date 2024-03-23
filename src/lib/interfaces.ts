export interface WithChildren {
  children: React.ReactNode;
}

export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  is_verified: boolean;
  backups: any[];
  roles: Role[];
  permissions: Permission[];
  entities_count: MaxTargetCountByEntityType;
}

interface MaxTargetCountByEntityType {
  [entityType: string]: MaxEntityTargetCount;
}

interface MaxEntityTargetCount {
  total: number;
  target: number;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  type: string;
}
