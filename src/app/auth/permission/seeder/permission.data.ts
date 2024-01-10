import { Permission } from '../entities/permission.entity';

export const Permissions: Partial<Permission>[] = [
  {
    id: '0ea3998c-6b5d-4749-a07f-bce37559e750',
    code: 'dashboard',
    availableActions: ['read'],
    groupCode: null,
    title: 'Dashboard',
  },
  {
    id: '552f81e0-9728-4115-8a49-e86d3cb11992',
    code: 'counter',
    availableActions: ['read', 'create', 'update', 'delete'],
    groupCode: 'master',
    title: 'Counter',
  },
  {
    id: 'c501753f-8dd7-45bd-bdf2-af0d0743470a',
    code: 'services',
    availableActions: ['read', 'create', 'update', 'delete'],
    groupCode: 'master',
    title: 'Services',
  },
  {
    id: '8b88a704-efb0-4dcc-9ed1-cef32cb73244',
    code: 'users',
    availableActions: ['read', 'create', 'update', 'delete'],
    groupCode: 'master',
    title: 'Users',
  },
  {
    id: '2e38c79e-e0d8-4335-8517-fd89a95ab685',
    code: 'roles',
    availableActions: ['read', 'create', 'update', 'delete'],
    groupCode: 'settings',
    title: 'Roles',
  },
  {
    id: '9e476db3-e35a-4410-bd12-06b63f433190',
    code: 'application',
    availableActions: ['read', 'update'],
    groupCode: 'settings',
    title: 'Application Setting',
  },
];
