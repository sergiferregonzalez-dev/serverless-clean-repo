// api/logger.js (En el repositorio del LOGGER)

// Este código no necesita librerías externas y simplemente loguea
// la IP que Vercel ve de tu solicitud.

export default async (req, res) => {
    
    // Vercel establece la IP real en este encabezado. Si no la encuentra, 
    // usa la IP del servidor de Vercel (la de Virginia).
    const ip = req.headers['x-forwarded-for'] || 'N/A';

    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: ip,
        // Al no usar geoip-lite, la ubicación será inexacta (Virginia)
        location: 'Inaccurate (Virginia/Vercel Server)', 
        userAgent: req.headers['user-agent'] || 'N/A',
        method: req.method,
    };

    // Imprimir el log directamente en la consola de Vercel (Logs)
    console.log(JSON.stringify(logEntry));

    // Devolver el JSON (sólo si se accede directamente a la función)
    res.status(200).json(logEntry);
};
