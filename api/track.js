// api/track.js (En el repositorio de tu SITIO WEB PRINCIPAL)

export default async (req, res) => {
    // 1. URL completa del logger en el otro proyecto (serverless-clean-repo, renombrado)
    // **¡IMPORTANTE! Reemplaza [TU-NUEVO-NOMBRE].vercel.app con la URL real de tu logger.**
    const loggerUrl = 'https://[TU-NUEVO-NOMBRE].vercel.app/api/logger'; 
    
    // 2. Encabezados para asegurar que la IP y el User-Agent del usuario se pasen correctamente
    const headersToSend = {
        'x-forwarded-for': req.headers['x-forwarded-for'] || '', // Pasa la IP real del visitante
        'user-agent': req.headers['user-agent'] || ''
    };

    try {
        // 3. Hacemos la llamada al logger desde el SERVIDOR (invisible al usuario)
        const response = await fetch(loggerUrl, {
            method: 'GET',
            headers: headersToSend
        });
        
        // 4. Devolvemos un código 204 (No Content) al navegador del usuario.
        // Esto confirma que la petición se completó sin errores, pero NO envía el JSON del logger.
        res.status(204).end(); 

    } catch (error) {
        // Si hay algún problema (ej. logger caído), devolvemos 204 para no mostrar errores al usuario
        console.error('Error al hacer proxy al logger:', error);
        res.status(204).end();
    }
};
