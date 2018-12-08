
var playlist_btn = document.getElementById("get_playlist");

playlist_btn.addEventListener("click",function(){
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET','https://new-project-adrianbalan.c9users.io/videos');
        ourRequest.onload = function()
        {
           var ourData = JSON.parse(ourRequest.responseText);
            for(var i=0;i<ourData.length;i++)
            {
                var videoid = ourData[i].videoid;
                videoid = videoid.substr(1);
                videoid = videoid.substr(0,videoid.length-1);
                var video_link = "https://www.youtube.com/embed/"+videoid;
                var frame = document.createElement("iframe");
                frame.style.textAlign="center";
                frame.style.width="800";
                frame.style.height="400";
                frame.style.margin ="40px";
                frame.src = video_link;
                
                var deleteButton = document.createElement("button");
                deleteButton.textContent="Delete";
                var element = document.getElementById("playlist-info");
                element.appendChild(frame);
                element.appendChild(deleteButton);
                
                deleteButton.addEventListener("click",function(){
                });
                console.log(video_link);
            }
        };
        ourRequest.send();
});

