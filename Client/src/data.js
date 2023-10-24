let data;
async function get() {
    const response = await fetch('http://localhost:8000/api/getWorkouts', {
        method: 'GET',
    })

    return data = await response.json();
};

export{get}
