/*
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
*/


if(document.URL.includes('scirate')){
//console.log('scirate');
links=document.head.getElementsByTagName('link');
if(links!=undefined){
    //console.log(links[0].href);
    links[0].disabled=1;
};
};
if(document.URL.includes('https://arxiv.org/abs/')){
    //console.log('arxiv');
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
