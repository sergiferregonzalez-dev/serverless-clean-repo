// api/logger.js
export default async (req, res) => {
    // La funciÃ³n debe usar la sintaxis 'export default'

    // 1. Obtener la informaciÃ³n del User-Agent
    const userAgent = req.headers['user-agent'] || 'Desconocido';

    // 2. Registrar la visita en los logs de Vercel
    console.log(`--- Nuevo Evento de Visita ---`);
    console.log(`User-Agent: ${userAgent}`);

    // 3. Devolver una respuesta JSON al cliente (usando res.status(200).json)
    res.status(200).json({
        status: "success",
        message: "PeticiÃ³n recibida Ã©ticamente.",
        user_agent: userAgent
    });
};
