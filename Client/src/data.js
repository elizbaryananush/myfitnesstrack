let data;
async function get() {
    const response = await fetch('https://myfitnesstrack-server2-genabmqwa-elizbaryananush.vercel.app/api/getWorkouts', {
        method: 'GET',
    })

    return data = await response.json();
};

export{get}
