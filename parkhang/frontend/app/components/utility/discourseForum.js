import React, { useEffect } from "react";

function postMessageReceived(e) {
    if (!e) {
      return;
    }

    if (e.data && e.data.type === "discourse-resize" && e.data.embedId) {
      var elem = document.getElementById(e.data.embedId);
      if (elem) {
        elem.height = e.data.height + "px";
      }
    }
  }
window.addEventListener("message", postMessageReceived, false);


export function DiscourseForum({topicId}) {
    useEffect(() => {
        window.DiscourseEmbed = {
            discourseUrl: "https://lopenling.org/",
            topicId:topicId?topicId:null,
            discourseEmbedUrl: !topicId && '{{url absolute="true"}}'
        };
        const d = document.createElement("script");
        d.type = "text/javascript";
        d.async = true;
        d.src = window.DiscourseEmbed.discourseUrl + "javascripts/embed.js";
        (
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]
        ).appendChild(d);
    }, [topicId]);

    return (
        <div>
            <div id="discourse-comments"></div>
        </div>
    );
}

export function DiscourseTopicList({category='',perPage=5}){

React.useEffect(()=>{
 var lists = document.querySelectorAll("#topics");
    for (var i = 0; i < lists.length; i++) {
      var list = lists[i];
      var url = list.getAttribute("url");
      console.log(url)
      if (!url || url.length === 0) {
        console.error("Error, `discourse-url` was not found");
        continue;
      }
      var frameId = "de-" + Math.random().toString(36).substr(2, 9);
      var params = ["discourse_embed_id=" + frameId];
      list.removeAttribute("discourse-url");

      for (var j = 0; j < list.attributes.length; j++) {
        var attr = list.attributes[j];
        params.push(attr.name.replace("-", "_") + "=" + attr.value);
      }

      var iframe = document.createElement("iframe");
      iframe.src = url + "/embed/topics?" + params.join("&");
      iframe.id = frameId;
      iframe.frameBorder = 0;
      iframe.scrolling = "no";
      iframe.width='100%';
      list.appendChild(iframe);
    }
  
},[])

return <div id='topics' url="https://lopenling.org/" style={{maxHeight:'70vh',overflow:'scroll'}}
               per-page={perPage} category={category} template='complete'status="open" allow-create='true'
               ></div>
    
}
