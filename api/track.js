// api/track.js (En tu sitio web principal)

export default async (req, res) => {
    // URL completa del logger secreto
    const loggerUrl = 'https://serverless-clean-repo.vercel.app/visita';
    
    // Encabezados para pasar la IP y el navegador del usuario
    const headersToSend = {
        'x-forwarded-for': req.headers['x-forwarded-for'] || '',
        'user-agent': req.headers['user-agent'] || ''
    };

    try {
        // Hacemos la petición al logger de Vercel desde el SERVIDOR
        // El navegador del usuario NO VE esta URL.
        const response = await fetch(loggerUrl, {
            method: 'GET',
            headers: headersToSend
        });
        
        // Devolvemos una respuesta vacía (204) para que el navegador no muestre nada
        res.status(204).end(); 

    } catch (error) {
        // En caso de error, también devolvemos un 204
        console.error('Error al hacer proxy al logger:', error);
        res.status(204).end();
    }
};
