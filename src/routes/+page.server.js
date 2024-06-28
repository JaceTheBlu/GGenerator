export function load({ cookies }) {
    // Handle the first time visiting
    const visited = cookies.get('visited');
    cookies.set('visited', 'true', { path: '/' });
    
    const rundown_list = cookies.get('rundown_list');
    const pouch_list = cookies.get('pouch_list');


    return {
        visited: visited ? JSON.parse(visited) : false,
        rundown_list: rundown_list ? JSON.parse(rundown_list) : [],
        pouch_list: pouch_list ? JSON.parse(pouch_list) : []
    };
}
