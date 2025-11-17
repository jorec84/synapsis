\# SaaS WhatsApp – NestJS Serverless



Arquitectura y microservicio para encolar y procesar mensajes (SMS/WhatsApp simulado) con SQS, Lambda y RDS MySQL.



\## Características

\- API Gateway `POST /send-message` valida y encola mensajes.

\- Lambda consumidor guarda estado `PENDING` en RDS.

\- Lambda de entrega simula `DELIVERED` tras X segundos (EventBridge).

\- Observabilidad con CloudWatch, DLQ y alarmas.



\## Diagrama

(ver `docs/architecture.mmd` y el README del repo principal)



\## Despliegue rápido

```bash

npm install

npx serverless deploy

curl -X POST https://{api-id}.execute-api.{region}.amazonaws.com/send-message \\

&nbsp; -H "Content-Type: application/json" \\

&nbsp; -d '{"channel":"WHATSAPP","to":"+51999999999","body":"Hola!"}'



