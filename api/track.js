// api/track.js (En tu sitio web principal)

export default async (req, res) => {
    // 1. URL a la que queremos llamar (TU LOGGER SECRETO)
    const loggerUrl = 'https://serverless-clean-repo.vercel.app/visita';
    
    // 2. Encabezados para pasar la IP del usuario (importante)
    const headersToSend = {
        'x-forwarded-for': req.headers['x-forwarded-for'] || '',
        'user-agent': req.headers['user-agent'] || ''
        // Puedes pasar otros headers si los necesitas
    };

    try {
        // 3. Hacemos la petición al logger de Vercel desde el SERVIDOR
        // El navegador del usuario NO VE esta URL.
        const response = await fetch(loggerUrl, {
            method: 'GET',
            headers: headersToSend
        });
        
        // 4. Leer el JSON del logger y enviarlo de vuelta (opcional, pero limpia)
        const data = await response.json();
        
        // 5. Devolvemos una respuesta vacía o simple (204 No Content)
        // Esto evita que aparezca el JSON de registro en el navegador del usuario.
        res.status(204).end(); 

    } catch (error) {
        // En caso de error, devolvemos un 204 para no interrumpir al usuario
        console.error('Error al hacer proxy al logger:', error);
        res.status(204).end();
    }
};
