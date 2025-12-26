# 🛒 E-commerce Backend REST API

API RESTful robusta para una plataforma de comercio electrónico, construida con **Node.js**, **Express** y **MySQL**. Este proyecto maneja la lógica completa de compras, desde la autenticación de usuarios hasta la gestión de inventario y procesamiento de órdenes.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/Node.js-v22+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Base de Datos](#-base-de-datos)
- [Documentación de la API](#-documentación-de-la-api)
- [Autores](#-autores)

## 🚀 Características

- **Autenticación y Seguridad:**
  - Registro y Login de usuarios con hash de contraseñas (`bcryptjs`).
  - Protección de rutas mediante JSON Web Tokens (`JWT`).
  - Roles de usuario (`client`, `admin`).
- **Gestión de Productos:** CRUD completo de inventario.
- **Carrito de Compras Persistente:**
  - El estado del carrito se guarda en base de datos (MySQL), permitiendo persistencia entre sesiones y dispositivos.
- **Sistema de Órdenes Transaccional:**
  - Conversión de carrito a orden.
  - Cálculo automático de totales en el backend (seguridad de precios).
  - **Control de Stock:** Descuento automático del inventario al confirmar la compra.
  - Validación de estado para cancelaciones.

## 🛠 Tecnologías

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MySQL
- **ORM/Driver:** mysql2 (Consultas SQL nativas optimizadas)
- **Autenticación:** JWT (JsonWebToken) & Bcryptjs

## 📂 Arquitectura

El proyecto sigue el patrón de diseño **MVC (Modelo-Vista-Controlador)** para asegurar la separación de responsabilidades y escalabilidad del código.

```text
backend/
├── config/         # Configuración de BD y variables
├── controllers/    # Lógica de negocio (Request/Response)
├── middlewares/    # Verificación de JWT y roles
├── models/         # Consultas SQL y lógica de datos
├── routes/         # Definición de endpoints
├── src/            # Entry point (app.js)
└── package.json