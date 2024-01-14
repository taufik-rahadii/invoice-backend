// import { Injectable, Scope } from '@nestjs/common';
// import DataLoader from 'dataloader';
// import { ServiceService } from './service.service';

// @Injectable({ scope: Scope.REQUEST })
// export class ServiceLoader {
//   constructor(private readonly service: ServiceService) {}

//   public readonly singleService = new DataLoader(async (ids: string[]) => {
//     const services = await this.service.getByIds(ids);
//     return ids.map((id) => services.find((service) => service.id === id));
//   });
// }
