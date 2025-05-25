# Repositorio del proyecto 

## Información del Equipo

**Nombre:** ChocoByte

### Integrantes

#### Componente de Gerencia TI

- [**Juan Camilo Sánchez Urrego**](https://github.com/JuanCSUCoder)
- [**Sofía Cespedes Vargas**](https://github.com/Sofia19c)
- [**Jairo Andres Sierra Combariza**](https://github.com/Jairo-Andres)
- [**Matías Gonzalez**](https://github.com/M4TI4SGV)
- [**Santiago Castro Zuluaga**](https://github.com/Santag207)

#### Componente de Diseño y Documentación

- **Carlos Coronel Fernandez**
- **Sofía Masis Loria**
- **Samuel Giraldo Contreras**
- **Sergio Andres Caro Blanco**

## Descripción del Proyecto

El proyecto consiste en una aplicación web que permite a los usuarios realizar compras de productos de tecnología. La aplicación cuenta con un un carrito de compras, un sistema de pago y validación de los lotes con blockchain.

La aplicación está desarrollada en JavaScript y utiliza tecnologías como Angular, Node.js, ExpressJS, Firebase y la blockchain de Solana. El objetivo del proyecto es crear una plataforma de comercio electrónico que sea fácil de usar y que ofrezca una experiencia de compra agradable para los usuarios.

## Listado de Tecnologías

### Backend

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para construir aplicaciones web en Node.js.
- **Firebase**: Plataforma de desarrollo de aplicaciones móviles y web que proporciona una base de datos en tiempo real, autenticación y almacenamiento.
- **Solana**: Blockchain de alto rendimiento para aplicaciones descentralizadas.
- **Anchor**: Framework para desarrollar contratos inteligentes en Solana.

### Frontend

- **Angular**: Framework para construir aplicaciones web de una sola página.

## Instrucciones de Instalación

### Requisitos Previos

- Tener instalado Node.js en tu máquina y el runtime de BunJS. Puedes descargarlo desde [aquí](https://nodejs.org/).
- Tener instalado Angular CLI. Puedes instalarlo globalmente con el siguiente comando:
```bash
bun install -g @angular/cli
```

### Descargar el Proyecto

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/Segunda-Hackaton-Internacional/Equipo-11-ChocoByte.git
```

### Ejecución del Backend

1. Navega a la carpeta del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
bun install
bun install -D ts-node
```

3. Configura las variables de entorno necesarias. Puedes crear un archivo `.env` en la raíz del proyecto y agregar las variables necesarias. Un ejemplo de archivo `.env` podría ser:
```bash
source .env
```

4. Inicia el servidor:
```bash
bun run index.ts
```

### Ejecución del Frontend

1. Navega a la carpeta del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
bun install
```

3. Inicia la aplicación:
```bash
bunx ng serve
```

4. Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación en funcionamiento.
