// api/logger.js (En el repositorio del LOGGER)

import { log } from '@vercel/functions';
import ipCity from 'ip-city'; 

export default async (req, res) => {
    // 1. Obtener la IP real del cliente desde el encabezado que envía el proxy.
    const ipAddress = req.headers['x-forwarded-for'];

    // 2. Intentar obtener la geolocalización
    let geo = { city: 'Unknown', country: 'Unknown' };
    if (ipAddress) {
        try {
            geo = ipCity.lookup(ipAddress);
        } catch (e) {
            console.error("Error al buscar ciudad/país:", e);
        }
    }

    // 3. Crear el objeto de log
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: ipAddress || 'N/A',
        // Formato: Ciudad (País)
        location: `${geo.city || 'Unknown'} (${geo.country || 'Unknown'})`, 
        userAgent: req.headers['user-agent'] || 'N/A',
        method: req.method,
    };

    // 4. Loguear la información en los logs de Vercel
    log(logEntry);

    // 5. Devolver el JSON (solo si se accede directamente a la función)
    res.status(200).json(logEntry);
};
