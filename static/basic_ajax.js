

var buton_help = document.getElementById("get_help");
buton_help.addEventListener("click",function(){
    alert('Generate a Youtube API key. Use your API key to view your playlist!');
    alert('Everytime you press Load, you will merge the old playlist with the new one!');
});

var buton_send =document.getElementById("send_credentials");

buton_send.addEventListener("click",function() {
   var api = document.getElementById("api_key").value;
   var id=document.getElementById("playlist_id").value;
   console.log(api);
   console.log(id);
   
   if(api && id)
   {
       axios.post('/credentials', {
        api_key: api,
        playlist_id: id
   }).then(function(result) {
        alert('Credentials ok!');
        $(event.target).trigger("reset")
    }).catch(function(err) {
        alert('Resource could not be saved');
    });
   }
   else{
       alert("Failed to submit playlist id | api key!");
   }
});

var buton_clear = document.getElementById("clear_videos");
buton_clear.addEventListener("click",function() {
    axios.get('/createdb').then(function(result) {
        console.log(result);
        $(event.target).trigger("reset")
    }).catch(function(err) {
    });
    window.location.reload();
});


var playlist_btn = document.getElementById("get_playlist");

var buton_search=document.getElementById("search_video");

buton_search.addEventListener("click",function() {
    var search_title=document.getElementById("search_title").value;
    if(search_title)
    {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET','https://tweb-project-final-adrianbalan.c9users.io/videos');
        ourRequest.onload = function()
        {
           var ourData = JSON.parse(ourRequest.responseText);
            for(var i=0;i<ourData.length;i++)
            {
                var title = ourData[i].title;
                
                if(title.includes(search_title))
                {
                var videoid = ourData[i].videoid;
                videoid = videoid.substr(1);
                videoid = videoid.substr(0,videoid.length-1);
                var video_link = "https://www.youtube.com/embed/"+videoid;
                var p = document.createElement("p");
                var text = document.createTextNode(title);
                p.appendChild(text);
                p.style.marginTop="20px";
                p.style.color="white";
                p.style.fontSize="32px";
                p.style.float="right";
                p.style.marginRight="10px";
                
                var div=document.createElement("div");
                var photo = document.createElement("img");
                var photo_src = ourData[i].picture;
                var background_image='url('+photo_src+')';
                photo.src=background_image;
                photo.style.opacity="0.85";
                div.style.backgroundImage=background_image;
                div.style.backgroundRepeat="no-repeat";
                div.style.backgroundPosition="center";
                div.style.backgroundSize="cover";
                //div.style.opacity="0.95";
                div.style.width="800";
                div.style.height="600";
                div.style.margin="20px";
                
                var frame = document.createElement("iframe");
                frame.style.textAlign="center";
                frame.style.width="800";
                frame.style.height="400";
                frame.style.marginTop="30px";
                frame.style.marginBottom="20px";
                frame.src = video_link;
                
                var deleteButton = document.createElement("button");
                deleteButton.textContent="Delete";
                deleteButton.style.marginBottom="10px";
                
                div.appendChild(p);
                div.appendChild(frame);
                div.appendChild(deleteButton);
                document.body.appendChild(div);
                
                
                deleteButton.addEventListener("click",function(){
                });
                console.log(video_link);
                }
            }
        };
        ourRequest.send();
    }
    else
    {
        alert("Search input is empty!");
    }
});


playlist_btn.addEventListener("click",function(){
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET','https://tweb-project-final-adrianbalan.c9users.io/videos');
        ourRequest.onload = function()
        {
           var ourData = JSON.parse(ourRequest.responseText);
            for(var i=0;i<ourData.length;i++)
            {
                var title = ourData[i].title;
                var videoid = ourData[i].videoid;
                videoid = videoid.substr(1);
                videoid = videoid.substr(0,videoid.length-1);
                var video_link = "https://www.youtube.com/embed/"+videoid;
                
                var p = document.createElement("p");
                var text = document.createTextNode(title);
                p.appendChild(text);
                p.style.marginTop="20px";
                p.style.color="white";
                p.style.fontSize="32px";
                p.style.float="right";
                p.style.marginRight="10px";
                
                var div=document.createElement("div");
                var photo = document.createElement("img");
                var photo_src = ourData[i].picture;
                var background_image='url('+photo_src+')';
                photo.src=background_image;
                photo.style.opacity="0.85";
                div.style.backgroundImage=background_image;
                div.style.backgroundRepeat="no-repeat";
                div.style.backgroundPosition="center";
                div.style.backgroundSize="cover";
                //div.style.opacity="0.95";
                div.style.width="800";
                div.style.height="600";
                div.style.margin="20px";
                
                var frame = document.createElement("iframe");
                frame.style.textAlign="center";
                frame.style.width="800";
                frame.style.height="400";
                frame.style.marginTop="30px";
                frame.style.marginBottom="20px";
                frame.src = video_link;
                
                var deleteButton = document.createElement("button");
                deleteButton.textContent="Delete";
                deleteButton.style.marginBottom="10px";
                
                div.appendChild(p);
                div.appendChild(frame);
                div.appendChild(deleteButton);
                document.body.appendChild(div);
                
                
                deleteButton.addEventListener("click",function(){
                });
                console.log(video_link);
            }
        };
        ourRequest.send();
});