// api/logger.js

// La función debe usar la sintaxis 'export default' para que Vercel la reconozca
export default async (req, res) => {
    // 1. Obtener la información del User-Agent desde los encabezados de la petición
    const userAgent = req.headers['user-agent'] || 'Desconocido';

    // 2. Registrar la visita en los logs de Vercel
    // Esta es la línea que debes ver en la pestaña 'Logs' de Vercel
    console.log(`--- Nuevo Evento de Visita ---`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`Ruta Solicitada: ${req.url}`);
    console.log(`Método: ${req.method}`);

    // 3. Devolver una respuesta JSON al cliente
    res.status(200).json({
        status: "success",
        message: "Petición recibida éticamente.",
        user_agent: userAgent
    });
};