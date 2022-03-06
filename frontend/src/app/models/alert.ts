export interface Alert {
    id: number;
    nodeId: number;
    temperatureAlertId: number;
    humidityAlertId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}