function getDetails(){

  // fetching github profile data
    document.getElementById('output').style.display="flex";
    const name=document.getElementById('username').value;
    fetch(`https://api.github.com/users/${name}`)
    .then(response=>response.json().then(data=>{
        console.log(data)
        document.getElementById('name').innerHTML=data.name;
        document.getElementById('bio').innerHTML=data.bio;
        document.getElementById('followers').innerHTML=data.followers +" Followers";
        document.getElementById('following').innerHTML=data.following + " Following";
        document.getElementById('profile').innerHTML=`
        <img class="rounded-full h-[8rem] sm:h-[12rem] border-2 border-notblack mx-auto" src="${data.avatar_url}" />
        `;
        document.getElementById('repo').innerHTML=data.public_repos + " Repositories";

        // fetching followers details
        document.getElementById('follwers_data').style.display="flex";
        const followers = data.followers_url;
        fetch(followers)
        .then(response=>response.json().then(followers_list=>{
          for (let i = 0; i < followers_list.length; i++) {
            // for (let i = 0; i < followers_list.length; i++) {
            const api_url = followers_list[i].url;
            console.log(api_url);
            fetch(api_url)
            .then(response=>response.json().then(follower_data=>{
              console.log(follower_data.name)
              const htmlCodeArray = [];
              const html_element=`
              <div class="flex px-4 py-2 w-[25rem] h-[6rem] m-2 bg-black rounded-xl ">
                <img class="h-[5rem] w-[5rem] rounded-full mx-4" src="${follower_data.avatar_url}" alt="" />
                <div class="flex flex-col ">
                  <a class="text-2xl" href="${api_url}">${follower_data.name}</a>
                  <a href="">${follower_data.followers} Follwers ${follower_data.following} Follwing </a>
                </div>
              </div>
                `;
              htmlCodeArray.push(html_element)
              const parentDiv = document.getElementById('followers_list');
              htmlCodeArray.forEach(htmlCode => {
                const newDiv = document.createElement('div');
                newDiv.innerHTML = htmlCode;
                parentDiv.appendChild(newDiv);
              });
            }))
          }
        }))
    }))
}