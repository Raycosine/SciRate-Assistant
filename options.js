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