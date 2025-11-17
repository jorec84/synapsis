import crypto from 'crypto';

/**
 * Utilidad para generar y verificar claves de idempotencia.
 * Se usa para evitar duplicados en el procesamiento de mensajes.
 */
export class Idempotency {
  /**
   * Genera un hash único a partir de un valor (ej. body del mensaje).
   * @param value string base para generar el hash
   * @returns string hash SHA256
   */
  static generateKey(value: string): string {
    return crypto.createHash('sha256').update(value).digest('hex');
  }

  /**
   * Verifica si una clave ya existe en memoria temporal.
   * En producción se recomienda usar Redis, DynamoDB o RDS con índice único.
   */
  private static cache: Set<string> = new Set();

  static exists(key: string): boolean {
    return this.cache.has(key);
  }

  static register(key: string): void {
    this.cache.add(key);
  }

  static clear(key: string): void {
    this.cache.delete(key);
  }
}
