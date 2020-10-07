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
        dl.textContent='External links:';
        es=document.getElementsByClassName('extra-services');
        ft=es[0].firstElementChild;
        ft.insertBefore(dl, ft.children[4]);
        ft.insertBefore(ul, ft.children[5]);
        chrome.storage.sync.get(
            'nscites', function(data){
                chrome.storage.sync.remove('nscites', function(){});
            }
        );
        var shref='https://scirate.com/arxiv/'+document.URL.substring(22,document.URL.length)+"/scites";
        chrome.runtime.sendMessage({sciteshref: shref}, function(response) {
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                  console.log(sender.tab ?
                              "from a content script:" + sender.tab.url :
                              "from the extension");
                  if (request.sciteshref == shref){
                    sendResponse({farewell: "goodbye"});
                    srLink.text='Scites: '+request.nscites;
                  }
                });
            /*
            chrome.storage.sync.get(
                'nscites', function(data) {
                    //console.log('nscites get by bg_1');
                    //console.log(data);
                    srLink.text='Scites: '+data.nscites;
                    chrome.storage.sync.remove('nscites', function(){
                        console.log(data.scites);
                        console.log('nscites removed');
                    });
                    
            });*/
          });        
    };

};

function setScitesSpan(span, a){
    if(a.text.includes('Scites')==false){
        span.onmouseover = function(element){
            var a =span.firstElementChild;
            if(a.text.includes('Scites')==false){
                var shref=a.href+"/scites";               
                chrome.storage.sync.get(
                    'nscites', function(data){
                        chrome.storage.sync.remove('nscites', function(){});
                    }
                );
                chrome.runtime.sendMessage({sciteshref: shref}, function(response) {
                    console.log(response.farewell);
                    chrome.runtime.onMessage.addListener(
                        function(request, sender, sendResponse) {
                        console.log(sender.tab ?
                                    "from a content script:" + sender.tab.url :
                                    "from the extension");
                        if (request.sciteshref == shref){
                            sendResponse({farewell: "goodbye"});
                            a.text='Scites: '+request.nscites;
                        }
                        });
                });
            }
        };
    }
}

if(document.URL.includes('arxiv.org/search')){
    if(document.getElementById('scirate')==undefined){
        lists=document.getElementsByClassName('list-title');
        for (l of lists){
            if(l.innerHTML.includes('scirate')==false){
                var srhref='https://scirate.com/arxiv/'+l.firstChild.href.substring(22,document.URL.length);
                var a=document.createElement('a');
                a.href=srhref;
                a.text='SciRate';
                var span=document.createElement('span');
                span.innerHTML="&nbsp;[";
                span.appendChild(a);
                span.innerHTML+="]&nbsp;";
                span.className='scirate';
                l.appendChild(span);
                setScitesSpan(span, a);
            }
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
            if(l.innerHTML.includes('scirate')==false){
                var srhref='https://scirate.com/arxiv/'+l.firstChild.href.substring(22,document.URL.length);
                var a=document.createElement('a');
                a.href=srhref;
                a.text='SciRate';
                var span=document.createElement('span');
                span.innerHTML="&nbsp;[";
                span.appendChild(a);
                span.innerHTML+="]&nbsp;";
                span.className='scirate';
                l.appendChild(span);
                setScitesSpan(span, a);
            }
        }
        var sr=document.createElement("SCRIPT");
        sr.id='scirate';
        document.head.appendChild(sr);
    }
};

function setScitesA(a){
    a.onmouseover = function(element){
        if(a.text.includes('Scites')==false){
            var shref=this.href+"/scites";
            chrome.storage.sync.get(
                'nscites', function(data){
                    chrome.storage.sync.remove('nscites', function(){});
                }
            );
            var scitebutton=this;
            chrome.runtime.sendMessage({sciteshref: shref}, function(response) {
                console.log(response.farewell);
                chrome.runtime.onMessage.addListener(
                    function(request, sender, sendResponse) {
                    console.log(sender.tab ?
                                "from a content script:" + sender.tab.url :
                                "from the extension");
                    if (request.sciteshref == shref){
                        sendResponse({farewell: "goodbye"});
                        scitebutton.text='[Scites: '+request.nscites+']';
                       
                    }
                    });
            });
        }
    };
}
if(document.URL.includes('scholar.google.com/scholar')){
    if(document.getElementById('scirate')==undefined){
        lists=document.getElementsByClassName('gs_r gs_or gs_scl');
        for (l of lists){
            var title=l.lastElementChild.firstElementChild.firstElementChild;
            if(title.href!==undefined){
                if(title.href.includes('arxiv')){
                    var srhref='https://scirate.com/arxiv/'+title.href.substring(22,document.URL.length);
                    var a=document.createElement('a');
                    a.href=srhref;
                    a.text='[SciRate]';
                    a.class='gs_ctg2';
                    l.firstElementChild.appendChild(a);
                    setScitesA(a);
                }
            }
        }
        var sr=document.createElement("SCRIPT");
        sr.id='scirate';
        document.head.appendChild(sr);
    }
};
var listlength=0;
function addScirateLinkOnScholarProfile(){
    var lists=document.getElementsByClassName('gsc_a_tr');
    listlength=lists.length;
    //console.log(lists.length);
    for (l of lists){
        var fullinfo=l.firstElementChild.firstElementChild;
        if(fullinfo.className.includes('scirate')==false){
            var info=l.firstElementChild.lastElementChild;
            if(info!==undefined){
                var s=info.innerText;
                if(s.includes('arXiv') || s.includes('arxiv') || s.includes('Arxiv')){
                    if(s.includes(':')){//new arXiv ID
                        var srhref='https://scirate.com/arxiv/'+s.split(':')[1];
                    }
                    else{//old arXiv ID
                        var srhref='https://scirate.com/arxiv/'+s.split(' ')[2];
                    }
                    var space=document.createTextNode('\u00A0');
                    var a=document.createElement('a');
                    a.href=srhref;
                    a.text='[SciRate]';
                    a.className='gsc_a_at';
                    fullinfo.appendChild(space);
                    l.firstElementChild.insertBefore(a, l.firstElementChild.children[1]);
                    fullinfo.className+=' scirate';
                    setScitesA(a);
                }
            }
        }
    }
}

if(document.URL.includes('scholar.google.com/citations')){
    if(document.getElementById('scirate')==undefined){
        addScirateLinkOnScholarProfile();
        var sr=document.createElement("SCRIPT");
        sr.id='scirate';
        document.head.appendChild(sr);
    };
    var more=document.getElementById('gsc_bpf_more');
    more.onclick = function(element) {
        //console.log('clicked');
        //var lists=document.getElementsByClassName('gsc_a_tr');
        //console.log(lists.length);
    };
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        // fired when a mutation occurs
        addScirateLinkOnScholarProfile();
    });
    
    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document.getElementById('gsc_a_nn'), {
      subtree: true,
      attributes: true,
      characterData:true,
      childList:true
    });
}


