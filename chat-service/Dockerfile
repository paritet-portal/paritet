FROM public.ecr.aws/docker/library/node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM public.ecr.aws/docker/library/node:20-alpine AS runner


WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

ENV PORT=3333 
# ENV DATABASE_URL=postgresql://user:password@host:port/database_name # Пример
# ENV JWT_SECRET=your_jwt_secret_for_backend # <--- ОБЯЗАТЕЛЬНО ИЗМЕНИ ЭТО!
# ... (остальные ENV переменные, если есть)

EXPOSE 3333

CMD ["node", "dist/main"]