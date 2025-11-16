// api/logger.js (En el repositorio del LOGGER)

// *** CORRECCIÓN DE IMPORTACIÓN PARA COMPATIBILIDAD CON COMMONJS ***
import pkg from '@vercel/functions';
const { log } = pkg;
// ******************************************************************

// Importamos la librería de geolocalización
import geoip from 'geoip-lite'; 

export default async (req, res) => {
    // 1. Obtener la IP real del cliente desde el encabezado que envía el proxy.
    const ipAddress = req.headers['x-forwarded-for'];

    // 2. Intentar obtener la geolocalización
    let geo = null;
    let location = 'Unknown';
    if (ipAddress) {
        // Usamos geoip-lite para obtener la ubicación del cliente
        geo = geoip.lookup(ipAddress);
        
        if (geo) {
            // Formato: Ciudad (País)
            location = `${geo.city || 'Unknown'} (${geo.country || 'Unknown'})`;
        }
    }

    // 3. Crear el objeto de log
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: ipAddress || 'N/A',
        location: location, 
        userAgent: req.headers['user-agent'] || 'N/A',
        method: req.method,
    };

    // 4. Loguear la información en los logs de Vercel
    // Usamos la función 'log' obtenida de pkg
    log(logEntry);

    // 5. Devolver el JSON (solo si se accede directamente a la función)
    res.status(200).json(logEntry);
};
