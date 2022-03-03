export interface HumidityAlert {
    id: number;
    name: string;
    minValue: number;
    maxValue: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}