// api/track.js (En el repositorio de tu SITIO WEB PRINCIPAL)

export default async (req, res) => {
    // URL del logger (Asegúrate de que esta URL sea la correcta)
    const loggerUrl = 'https://serverless-clean-repo.vercel.app/api/logger'; 
    
    // Encabezados para asegurar que la IP y el User-Agent del usuario se pasen
    const headersToSend = {
        'x-forwarded-for': req.headers['x-forwarded-for'] || '', 
        'user-agent': req.headers['user-agent'] || ''
    };

    try {
        // Hacemos la llamada al logger desde el SERVIDOR
        await fetch(loggerUrl, {
            method: 'GET',
            headers: headersToSend
        });
        
        // Devolvemos 204 (No Content) para ocultarlo del navegador
        res.status(204).end(); 

    } catch (error) {
        console.error('Error al hacer proxy al logger:', error);
        res.status(204).end();
    }
};
