// api/logger.js

export default async (req, res) => {
    // Vercel proporciona la ciudad y el país en estos encabezados especiales
    const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';
    
    // La IP real o proxy. En este caso, será la IP del servidor que llamó a track.js
    // Si track.js no reenvía la IP del cliente (ver track.js), esta será la IP de Vercel.
    const ipAddress = req.headers['x-forwarded-for'] || 'N/A';
    
    // Si quieres la IP que Vercel cree que es la real del cliente (cuando es la primera petición)
    const clientIp = req.headers['x-real-ip'] || ipAddress;

    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: clientIp, 
        location: `${city} (${country})`, 
        userAgent: req.headers['user-agent'] || 'N/A',
        method: req.method,
        // Puedes agregar más datos si los envías en el body (ej. key presses)
    };

    // Esto guarda la entrada en los logs de tu despliegue de Vercel.
    console.log(`[LOG_ENTRY] ${JSON.stringify(logEntry)}`);

    // Devolver un código 200 con un JSON
    res.status(200).json(logEntry);
};
