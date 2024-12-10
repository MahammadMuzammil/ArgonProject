const technicians = [
    {
        id: 1,
        name: 'John Doe',
        photo: 'https://img.freepik.com/premium-photo/computer-repair-hd-image-computer-technician-laptop-repair-desktop-repair-it-support_1012565-21367.jpg',
        specialization: 'Electrical',
        rating: 4,
        description: 'Experienced electrical technician with over 10 years of expertise in residential and commercial installations.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        photo: 'https://img.freepik.com/premium-photo/hvac-technician-hd-stock-images_1012565-36673.jpg',
        specialization: 'Plumbing',
        rating: 5,
        description: 'Skilled plumber specializing in pipe repairs, water heater installations, and emergency plumbing services.'
    },
    {
        id: 3,
        name: 'Michael Brown',
        photo: 'https://spng.pngfind.com/pngs/s/568-5682641_travel-medical-lab-technician-jobs-nurses-photoshoot-hd.png',
        specialization: 'HVAC',
        rating: 4,
        description: 'Certified HVAC technician with a focus on air conditioning and heating system maintenance and repairs.'
    },
    {
        id: 4,
        name: 'Sara Lee',
        photo: 'https://spng.pngfind.com/pngs/s/124-1241254_locksmith-fayetteville-nc-locksmith-technician-hd-png-download.png',
        specialization: 'Carpentry',
        rating: 3,
        description: 'Professional carpenter with expertise in custom furniture design and woodworking for home improvement.'
    },
    {
        id: 5,
        name: 'David Wilson',
        photo: 'https://spng.pngfind.com/pngs/s/124-1241254_locksmith-fayetteville-nc-locksmith-technician-hd-png-download.png',
        specialization: 'Painting',
        rating: 5,
        description: 'Experienced painter specializing in interior and exterior home painting with a focus on high-quality finishes.'
    }
];


const addIntoDataBase= async(obj)=>{
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(obj)
    }
    const response = await fetch('http://localhost:3000/addTech',options)
    const responseData = await response.json()
    console.log(responseData)

}

for(let obj of technicians){
    addIntoDataBase(obj)
}


