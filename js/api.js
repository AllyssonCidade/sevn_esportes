const url= 'https://sevn-pleno-esportes.deno.dev/';

export async function getApiData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao consumir a API');
        }else{
            const data = await response.json()
            return data
        }
    } catch (error) {
        throw error;
    }
}

