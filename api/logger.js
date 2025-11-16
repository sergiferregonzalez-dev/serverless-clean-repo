// api/logger.js

export default async (req, res) => {
    
    // 1. Obtener la IP del cliente (la real) desde el encabezado reenviado por track.js
    const clientIp = req.headers['x-forwarded-for'] || 'N/A';
    
    // 2. Usar un servicio de geolocalización de terceros (¡requiere FETCH!)
    let location = 'Unknown Location';

    if (clientIp !== 'N/A') {
        try {
            // Ejemplo usando ipinfo.io (sin clave API)
            const geoResponse = await fetch(`https://ipinfo.io/${clientIp}/json`);
            const geoData = await geoResponse.json();
            
            // Formatear la ubicación
            location = `${geoData.city || geoData.region} (${geoData.country})`;
        } catch (error) {
            console.error('Error fetching geolocation:', error);
            // Si falla la geolocalización, volvemos a usar la de Vercel como fallback (Ashburn)
            const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
            const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';
            location = `${city} (${country}) [Vercel Fallback]`;
        }
    }
    
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: clientIp, // <-- AHORA USA LA IP REAL
        location: location, // <-- AHORA USA LA UBICACIÓN REAL
        userAgent: req.headers['user-agent'] || 'N/A',
        method: req.method,
    };

    console.log(`[LOG_ENTRY] ${JSON.stringify(logEntry)}`);
    res.status(200).json(logEntry);
};
