// api/logger.js (En el repositorio del LOGGER)

export default async (req, res) => {
    
    // Vercel proporciona la ciudad y el país en estos encabezados especiales
    // cuando la función se ejecuta en su red. Esto es lo que probablemente 
    // funcionaba antes y evita el uso de librerías conflictivas.
    const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';
    
    // La IP real del cliente.
    const ipAddress = req.headers['x-forwarded-for'] || 'N/A';
    
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: ipAddress,
        // Usamos los encabezados de Vercel para la ubicación
        location: `${city} (${country})`, 
        userAgent: req.headers['user-agent'] || 'N/A',
        method: req.method,
    };

    // Usamos console.log para mostrar el objeto en los logs de Vercel.
    // Esto funciona perfectamente y evita el error de '@vercel/functions'.
    console.log(JSON.stringify(logEntry));

    // Devolver un código 200 con el JSON de log
    res.status(200).json(logEntry);
};
