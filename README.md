# CubicBot

CubicBot es un bot de Discord de código abierto desarrollado específicamente para el servidor de **CubicLauncher Oficial**. Construido con **discord.js v14** y optimizado para **Bun**, utiliza un sistema de "Handler" dinámico para una gestión profesional de comandos slash y eventos.

## Características Principales

-   **Modularidad Total**: Comandos y eventos organizados en archivos independientes.
-   **Handler Dinámico**: Carga automáticamente nuevos archivos sin necesidad de importaciones manuales.
-   **Optimizado para Bun**: Aprovecha la velocidad y compatibilidad de Bun.
-   **Comandos Administrativos**: Incluye herramientas avanzadas como un generador de mensajes completo vía JSON.
-   **Arquitectura Escalable**: Diseñado para crecer junto a tu comunidad.

## Requisitos

-   [Bun](https://bun.sh/) (Recomendado v1.0+)
-   Una aplicación de Discord creada en el [Portal de Desarrolladores](https://discord.com/developers/applications).
-   Node.js (Opcional, si no se desea usar Bun).

## Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/CubicLauncher/CubicBot.git
    cd CubicBot
    ```

2.  **Instalar dependencias:**
    ```bash
    bun install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz (usa el archivo proporcionado como base) y añade tus credenciales:
    ```env
    TOKEN=TU_DISCORD_TOKEN
    CLIENT_ID=ID_DE_TU_APLICACION
    ```

4.  **Registrar Comandos Slash:**
    Este paso es necesario para que los comandos aparezcan en tu servidor de Discord:
    ```bash
    bun src/deploy-commands.js
    ```

5.  **Iniciar el Bot:**
    ```bash
    bun src/index.js
    ```

## Estructura del Proyecto

```text
CubicBot/
├── src/
│   ├── index.js             # Punto de entrada
│   ├── deploy-commands.js   # Registro de comandos en la API
│   ├── commands/            # Comandos organizados por carpetas
│   │   ├── admin/           # Comandos de administración
│   │   └── utility/         # Comandos de utilidad
│   ├── events/              # Controladores de eventos de Discord
│   └── handlers/            # Lógica de carga automática
├── .env                     # Configuración de secretos
└── .gitignore               # Archivos ignorados por Git
```

## Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el bot o quieres añadir nuevas características:

1. Realiza un Fork del proyecto.
2. Crea una rama para tu mejora (`git checkout -b feature/feature-name`).
3. Realiza tus cambios y haz un commit (`git commit -m 'feature: feature-name'`).
4. Haz un Push a la rama (`git push origin feature/feature-name`).
5. Abre un Pull Request.

## Licencia

Este proyecto se distribuye bajo la licencia **GPL-3.0 license**. Consulta el archivo `LICENSE` para más detalles.

---
*Desarrollado con ❤️ para la comunidad de CubicLauncher.*
