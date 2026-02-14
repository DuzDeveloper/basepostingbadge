# 🎨 NFT Mint Mini App - Base

Una mini app para mintear NFTs gratuitos en Base, construida con Next.js, OnchainKit y el SDK de Farcaster.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración del Contrato](#configuración-del-contrato)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Desarrollo Local](#desarrollo-local)
- [Deployment](#deployment)
- [Publicación en Base App](#publicación-en-base-app)

## ✨ Características

- ✅ Mint de NFTs completamente gratuito (solo gas fees)
- ✅ Un NFT por wallet
- ✅ Integración con Coinbase Wallet
- ✅ Funciona en Base App y Farcaster
- ✅ Diseño responsive y moderno
- ✅ Contador de supply en tiempo real
- ✅ Feedback visual del estado del mint

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener:

1. **Node.js** (v18 o superior)
2. **npm** o **yarn**
3. **Cuenta de Farcaster** (puedes crear una en [Warpcast](https://warpcast.com))
4. **Cuenta de Vercel** para deployment
5. **Wallet de Ethereum** (MetaMask o Coinbase Wallet)
6. **ETH en Base Sepolia** para deployar el contrato (obtenlo en el [faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))

## 📦 Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone <tu-repositorio>
cd nft-mint-miniapp
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

## 🔐 Configuración del Contrato

### Paso 1: Desplegar el Contrato NFT

1. **Abrir Remix IDE**
   - Ve a [remix.ethereum.org](https://remix.ethereum.org)

2. **Crear el archivo del contrato**
   - Crea un nuevo archivo llamado \`FreeNFT.sol\`
   - Copia el contenido de \`contracts/FreeNFT.sol\`

3. **Compilar el contrato**
   - Ve a la pestaña "Solidity Compiler"
   - Selecciona versión 0.8.20 o superior
   - Haz click en "Compile FreeNFT.sol"

4. **Conectar tu wallet**
   - Ve a la pestaña "Deploy & Run Transactions"
   - En "Environment", selecciona "Injected Provider - MetaMask"
   - Asegúrate de estar conectado a **Base Sepolia** (Chain ID: 84532)

5. **Desplegar el contrato**
   - Ingresa los parámetros del constructor:
     - \`name\`: "My Free NFT" (o el nombre que quieras)
     - \`symbol\`: "FNFT" (o el símbolo que quieras)
     - \`baseTokenURI\`: "https://tu-dominio.com/metadata/" (URL donde estarán los metadatos)
     - \`_maxSupply\`: 1000 (cantidad máxima de NFTs)
   - Haz click en "Deploy"
   - Confirma la transacción en tu wallet

6. **Copiar la dirección del contrato**
   - Una vez desplegado, copia la dirección del contrato
   - La necesitarás para la configuración

### Paso 2: Preparar Metadatos (Opcional)

Si quieres que tus NFTs tengan imágenes y descripciones:

1. **Estructura de archivos**
   \`\`\`
   metadata/
   ├── 0.json
   ├── 1.json
   ├── 2.json
   └── ...
   \`\`\`

2. **Ejemplo de metadata (0.json)**
   \`\`\`json
   {
     "name": "My Free NFT #0",
     "description": "Un NFT gratuito de la colección",
     "image": "https://tu-dominio.com/images/0.png",
     "attributes": [
       {
         "trait_type": "Rarity",
         "value": "Common"
       }
     ]
   }
   \`\`\`

3. **Subir a IPFS o hosting**
   - Sube tus metadatos a IPFS (usando Pinata, NFT.Storage, etc.)
   - O súbelos a tu propio servidor
   - Actualiza la \`baseTokenURI\` del contrato si es necesario

## ⚙️ Configuración del Proyecto

### 1. Obtener API Key de Coinbase Developer Platform

1. Ve a [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia tu API Key

### 2. Configurar variables de entorno

Crea un archivo \`.env.local\` en la raíz del proyecto:

\`\`\`env
NEXT_PUBLIC_PROJECT_NAME="NFT Mint Mini App"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_tu_contrato_aqui
NEXT_PUBLIC_CHAIN_ID=84532
\`\`\`

**Importante:**
- \`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS\`: La dirección del contrato que desplegaste
- \`NEXT_PUBLIC_CHAIN_ID\`: 84532 para Base Sepolia, 8453 para Base Mainnet

## 🚀 Desarrollo Local

### Ejecutar el servidor de desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Probar la aplicación

1. Abre http://localhost:3000
2. Conecta tu wallet
3. Asegúrate de estar en Base Sepolia
4. Haz click en "Mintear NFT Gratis"
5. Confirma la transacción

## 📤 Deployment

### 1. Desplegar a Vercel

#### Opción A: Desde la terminal

\`\`\`bash
# Instalar Vercel CLI si no lo tienes
npm install -g vercel

# Desplegar
vercel --prod
\`\`\`

#### Opción B: Desde GitHub

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno
5. Despliega

### 2. Configurar variables de entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:

\`\`\`
NEXT_PUBLIC_PROJECT_NAME=NFT Mint Mini App
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key
NEXT_PUBLIC_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_tu_contrato
NEXT_PUBLIC_CHAIN_ID=84532
\`\`\`

### 3. Actualizar configuración local

Actualiza tu \`.env.local\` con la URL de producción:

\`\`\`env
NEXT_PUBLIC_URL=https://tu-proyecto.vercel.app
\`\`\`

### 4. Re-desplegar

\`\`\`bash
vercel --prod
\`\`\`

## 🔑 Account Association (Firma del Manifest)

### 1. Firmar el manifest

1. Ve a [farcaster.xyz/~/developers/mini-apps/manifest](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Pega tu dominio (ej: tu-proyecto.vercel.app)
3. Click en "Generate account association"
4. Firma con tu wallet de Farcaster
5. Copia el objeto \`accountAssociation\` generado

### 2. Actualizar la configuración

Edita \`farcaster.config.ts\` y pega los valores:

\`\`\`typescript
accountAssociation: {
  "header": "tu-header-aqui",
  "payload": "tu-payload-aqui",
  "signature": "tu-signature-aqui"
}
\`\`\`

### 3. Re-desplegar

\`\`\`bash
vercel --prod
\`\`\`

## 📱 Publicación en Base App

### 1. Verificar tu app

Ve a [base.dev/preview](https://base.dev/preview) y verifica:

1. **Embeds**: Verifica que se vean correctamente
2. **Account Association**: Verifica las credenciales
3. **Metadata**: Revisa que no falten campos

### 2. Publicar

Para publicar tu app en Base App:

1. Abre Base App
2. Crea un nuevo post
3. Incluye la URL de tu app
4. Publica el post

¡Tu mini app ahora estará disponible en Base App!

## 🎨 Personalización

### Cambiar colores

Edita \`components/MintNFT.tsx\` y ajusta las clases de Tailwind:

\`\`\`tsx
className="bg-gradient-to-br from-blue-500 to-purple-600"
\`\`\`

### Cambiar textos

Edita los textos directamente en \`components/MintNFT.tsx\`

### Agregar imágenes

1. Agrega tus imágenes a la carpeta \`public/\`
2. Actualiza las referencias en \`farcaster.config.ts\`

## 🐛 Solución de Problemas

### Error: "Network mismatch"
- Asegúrate de estar conectado a Base Sepolia en tu wallet

### Error: "Contract not found"
- Verifica que la dirección del contrato sea correcta
- Asegúrate de que el contrato esté desplegado en la red correcta

### Error: "Already minted"
- Solo puedes mintear un NFT por wallet
- Intenta con otra wallet si quieres probar de nuevo

### La app no se carga en Base App
- Verifica que el manifest esté firmado correctamente
- Revisa que todas las URLs sean HTTPS (no HTTP)
- Verifica en base.dev/preview que todo esté correcto

## 📚 Recursos Adicionales

- [Documentación de Base](https://docs.base.org)
- [OnchainKit Docs](https://onchainkit.xyz)
- [Farcaster Mini Apps](https://docs.farcaster.xyz/developers/frames/spec)
- [Wagmi Documentation](https://wagmi.sh)

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor abre un issue o PR.

---

Hecho con ❤️ para la comunidad de Base
\`\`\`
