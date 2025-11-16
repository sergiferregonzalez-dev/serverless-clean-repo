// api/track.js

export default async (req, res) => {
    // La URL del logger es ahora interna
    // El track.js llama al logger.js dentro del mismo despliegue.
    const loggerUrl = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/logger`;
    
    // Encabezados que queremos reenviar al logger
    const headersToSend = {
        // MUY IMPORTANTE: Reenviar la IP del cliente para que logger.js la reciba
        'x-forwarded-for': req.headers['x-forwarded-for'] || '', 
        'user-agent': req.headers['user-agent'] || ''
    };

    try {
        // Hacemos la llamada al logger desde el SERVIDOR
        // NOTA: Usamos un método POST para reenviar los datos, aunque en este caso GET es válido.
        await fetch(loggerUrl, {
            method: 'GET',
            headers: headersToSend
        });
        
        // Devolvemos 204 (No Content) o una imagen de 1x1 para evitar que el navegador muestre errores
        // El 204 es la mejor práctica para llamadas exitosas sin contenido.
        res.status(204).end(); 

    } catch (error) {
        console.error('Error al hacer proxy al logger:', error);
        // Devolvemos 204 incluso en caso de error para evitar alertar al usuario
        res.status(204).end();
    }
};
