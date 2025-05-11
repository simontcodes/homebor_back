// import { Injectable } from '@nestjs/common';
// import { Model, FilterQuery } from 'mongoose';

// interface PaginationQuery {
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
// }

// @Injectable()
// export class PaginationService {
//   async paginate<T>(
//     model: Model<T>,
//     filter: FilterQuery<T>,
//     query: PaginationQuery & { search?: string },
//     populate?: string | string[],
//     searchFields: (keyof T)[] = [],
//   ): Promise<{
//     items: T[];
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   }> {
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 10;
//     const skip = (page - 1) * limit;

//     if (query.search && searchFields.length) {
//       filter.$or = searchFields.map((field) => {
//         return {
//           [field as string]: { $regex: query.search, $options: 'i' },
//         } as FilterQuery<T>;
//       });
//     }

//     const [items, total] = await Promise.all([
//       model
//         .find(filter)
//         .populate(populate || [])
//         .sort({
//           [query.sortBy || 'createdAt']: query.sortOrder === 'asc' ? 1 : -1,
//         })
//         .skip(skip)
//         .limit(limit)
//         .exec(),
//       model.countDocuments(filter),
//     ]);

//     return {
//       items,
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     };
//   }
// }
