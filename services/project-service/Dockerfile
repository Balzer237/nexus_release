# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copier et Installer les dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copier tout le code source et deplacer dans le dossier courant (ici /usr/src/app)
COPY . ./

# Compiler le projet
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Ici, les operations lourdes sont deja faient dans le stage de build
# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json

# Exposer le port de l'application (facultatif, mais utile pour docker-compose)
EXPOSE 3000

# Une fois l'image generee, commande pour démarrer 
CMD ["npm", "run", "start"]
