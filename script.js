document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const profileDataDiv = document.getElementById('profileData');
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://geeks-for-geeks-api.vercel.app/${username}`;
    
    try {
        const response = await fetch(corsProxy + apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (!data.info) {
            throw new Error('Profile info not found in the response');
        }
        
        const info = data.info;

        profileDataDiv.innerHTML = `
            <div class="profile-card">
                <img src="${info.profilePicture}" alt="${info.userName}'s profile picture" class="profile-picture">
                <h2>${info.userName}</h2>
                <p><strong>Institute Rank:</strong> ${info.instituteRank}</p>
                <p><strong>Current Streak:</strong> ${info.currentStreak}</p>
                <p><strong>Institution:</strong> ${info.institution}</p>
                <p><strong>Languages Used:</strong> ${info.languagesUsed}</p>
                <p><strong>Coding Score:</strong> ${info.codingScore}</p>
                <p><strong>Total Problems Solved:</strong> ${info.totalProblemsSolved}</p>
                <p><strong>Monthly Coding Score:</strong> ${info.monthlyCodingScore}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        profileDataDiv.innerHTML = `<p>Profile not found or an error occurred. ${error.message}</p>`;
    }
});
