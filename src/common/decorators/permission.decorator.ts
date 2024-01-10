import { SetMetadata } from '@nestjs/common';

export const ALLOWED_PERMISSION = 'ALLOWED_PERMISSION' as const;
export const Permission = (...permissions: string[]) =>
  SetMetadata(ALLOWED_PERMISSION, permissions);
