// api/track.js (En el repositorio de tu SITIO WEB PRINCIPAL)

export default async (req, res) => {
    // 1. Usamos la URL del dominio personalizado, con la ruta de la función
    const loggerUrl = 'https://miprimeraweb2025.com/api/logger'; 
    
    // 2. Encabezados para asegurar que la IP y el User-Agent del usuario se pasen correctamente
    const headersToSend = {
        'x-forwarded-for': req.headers['x-forwarded-for'] || '', 
        'user-agent': req.headers['user-agent'] || ''
    };

    try {
        // 3. Hacemos la llamada al logger desde el SERVIDOR (invisible al usuario)
        const response = await fetch(loggerUrl, {
            method: 'GET',
            headers: headersToSend
        });
        
        // 4. Devolvemos un código 204 (No Content) al navegador del usuario.
        res.status(204).end(); 

    } catch (error) {
        // En caso de error, devolvemos 204
        console.error('Error al hacer proxy al logger:', error);
        res.status(204).end();
    }
};
