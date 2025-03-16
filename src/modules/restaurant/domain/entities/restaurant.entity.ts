export class Restaurant {
  constructor(data?: Partial<Restaurant>) {
    Object.assign(this, {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      ...data,
    });
  }

  id: number;
  name: string;
  UF: string;
  city: string;
  taxNumber: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
