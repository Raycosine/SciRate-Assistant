if(document.URL.includes('scirate')){

    links=document.head.getElementsByTagName('link');
    if(links!=undefined){
        chrome.storage.sync.get(
            'isLoveSen', function(data) {
              if(data!==undefined){
                  if(data.isLoveSen==false){
                    links[0].disabled=1;
                  }
                  else{
                      links[0].disabled=0;
                  }
              }
              else{
                  links[0].disabled=1;
              }
              chrome.storage.sync.set({
                currentSen: links[0].disabled
              }, function() {

              });
          });

    };
};
if(document.URL.includes('https://arxiv.org/abs/')){

    if(document.getElementById('scirate')==undefined){
        var srLink=document.createElement("a");
        srLink.href='https://scirate.com/arxiv/'+document.URL.substring(22,document.URL.length);
        srLink.class='abs-button download-format';
        srLink.id='scirate';
        srLink.text='SciRate';
        var li=document.createElement("li");
        li.appendChild(srLink);
        var ul=document.createElement("ul");
        ul.appendChild(li);
        var dl=document.createElement("h2");
        dl.textContent='External links';
        es=document.getElementsByClassName('extra-services');
        ft=es[0].firstElementChild;
        ft.insertBefore(dl, ft.children[4]);
        ft.insertBefore(ul, ft.children[5]);
    }
};
if(document.URL.includes('arxiv.org/search')){
    if(document.getElementById('scirate')==undefined){
        lists=document.getElementsByClassName('list-title');
        for (l of lists){
            var srhref='https://scirate.com/arxiv/'+l.firstChild.href.substring(22,document.URL.length);
            var span=document.createElement('span');
            span.innerHTML="&nbsp;[<a href='"+srhref+"'>SciRate</a>]&nbsp;";
            l.appendChild(span);
        }
        var sr=document.createElement("SCRIPT");
        sr.id='scirate';
        document.head.appendChild(sr);
    }
}
if(document.URL.includes('arxiv.org/list')){
    if(document.getElementById('scirate')==undefined){
        lists=document.getElementsByClassName('list-identifier');
        for (l of lists){
            var srhref='https://scirate.com/arxiv/'+l.firstChild.href.substring(22,document.URL.length);
            var span=document.createElement('span');
            span.innerHTML="&nbsp;[<a href='"+srhref+"'>SciRate</a>]&nbsp;";
            l.appendChild(span);
        }
        var sr=document.createElement("SCRIPT");
        sr.id='scirate';
        document.head.appendChild(sr);
    }
}
