// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Counter, CounterDocument } from './schemas/counter.schema';

// @Injectable()
// export class CountersService {
//   constructor(
//     @InjectModel(Counter.name)
//     private readonly counterModel: Model<CounterDocument>,
//   ) {}

//   async getNext(entityName: string): Promise<number> {
//     const result = await this.counterModel.findByIdAndUpdate(
//       entityName,
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true },
//     );
//     return result.seq;
//   }
// }
