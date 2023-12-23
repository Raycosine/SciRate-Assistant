// Saves options to chrome.storage
function save_options() {
    var checkedSen = document.getElementById('isLoveSen').checked;
    chrome.storage.sync.set({
      isLoveSen: checkedSen
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
    //console.log('option saved');
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  
  chrome.storage.sync.get(
    'isLoveSen', function(data) {
      if(data!==undefined){
          document.getElementById('isLoveSen').checked = data.isLoveSen;
      }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

function exportReadList(){
  chrome.storage.sync.get('readList', function(data) {
    if(data!==undefined){
      let blob = new Blob([JSON.stringify(data.readList)]);
      let url = URL.createObjectURL(blob);
      let file = document.createElement('a');
      file.download = 'reading_list.txt';
      file.href = url;
      document.body.appendChild(file);
      file.click();
      file.remove();
      URL.revokeObjectURL(url);
    }
});
}

document.getElementById('exportReadList').addEventListener('click', exportReadList);
var content="";
function loadReadList(){
  //console.log('load list started');
  if(content==""){
    document.getElementById('loadStatus').textContent="Nothing loaded";
      
      setTimeout(function() {
        document.getElementById('loadStatus').textContent = '';
      }, 750);
    return;
  }
  try{
    var rl=JSON.parse(content);
    chrome.storage.sync.get('readList', function(data) {
      if(data!==undefined){
        var rlnew=data.readList;
        for (var key in rl){
          if(rlnew[key]==undefined){
            rlnew[key]=rl[key];
          }
          else{
            if(rlnew[key]<rl[key])
              rlnew[key]=rl[key];
          };
        };
        chrome.storage.sync.set({
          readList: rlnew
        }, function(){});
        //console.log('loaded list');
        //console.log(rlnew);
        document.getElementById('loadStatus').textContent="List loaded!";
        
        setTimeout(function() {
          document.getElementById('loadStatus').textContent = '';
        }, 750);
      };
    });
  } catch(e){
    document.getElementById('loadStatus').textContent="Wrong file format";
      
      setTimeout(function() {
        document.getElementById('loadStatus').textContent = '';
      }, 750);
  }
}

var loadFile=document.getElementById("loadFile");

loadFile.onchange = e => {
  var file = e.target.files[0]; 
  var reader = new FileReader();
  reader.readAsText(file,'UTF-8');
  reader.onload = readerEvent => {
  content = readerEvent.target.result; // this is the content!

    //loadReadList(content);
 }
}

document.getElementById('confirmLoad').addEventListener('click', loadReadList);

//loadFile.click();


function deleteReadList2(){
  chrome.storage.sync.set({
    readList: {}
  }, function(){});
  
  //console.log("reading list deleted!");
  
  document.getElementById('hint').textContent="reading list deleted!";
  setTimeout(function() {
    hint.textContent = '';
  }, 750);
}

function deleteReadList1(){
  //console.log('delete 1');
  //console.log(document.getElementById('deleteText').value);
  var hint=document.getElementById('hint');
  if(document.getElementById('deleteText').value=='DELETE')
  {
    //console.log('delete confirmed');

    chrome.storage.sync.set({
      readList: {}
    }, function(){});
    
    //console.log("reading list deleted!");
    
    document.getElementById('hint').textContent="reading list deleted!";
    setTimeout(function() {
      hint.textContent = '';
    }, 750);
  }
  else{
    hint.textContent="please type DELETE";      
    setTimeout(function() {
      hint.textContent = '';
    }, 750);
  }
}

document.getElementById('hint').textContent="";
//document.getElementById('deleteText').addEventListener('click', deleteReadList1());
document.getElementById('deleteReadList').addEventListener('click', deleteReadList1);
