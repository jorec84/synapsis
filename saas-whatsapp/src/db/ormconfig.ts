import { DataSourceOptions } from 'typeorm';
import { Message } from '../common/entities/message.entity';

/**
 * Configuración de TypeORM para conectarse a RDS MySQL.
 * Se recomienda usar RDS Proxy para manejar conexiones desde Lambdas.
 */
export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.RDS_PROXY_ENDPOINT || process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT || 3306),
  username: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  entities: [Message],
  synchronize: false, // usar migraciones en producción
  migrations: ['dist/migrations/*.js'],
  ssl: {
    rejectUnauthorized: true, // asegura conexión TLS
  },
  extra: {
    connectionLimit: 5, // evita saturación en Lambdas concurrentes
  },
};
