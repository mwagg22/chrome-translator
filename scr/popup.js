var filename=((localStorage.getItem("vocabFile") === null))?"":localStorage.getItem("vocabFile")
var dictionary=((localStorage.getItem("dictionary") === null))?"":localStorage.getItem("dictionary")
document.addEventListener('DOMContentLoaded', function () {
document.querySelector('input[type="file"]').addEventListener('change',function(){
	filename=this.files[0];
	localStorage.setItem("vocabFile", filename);
	openFile();
	},false) 
document.querySelector('#translate').addEventListener('click',onclick,false)

 
  function onclick(){
	 chrome.tabs.query({currentWindow:true,active:true},
	 function(tabs){
		 chrome.tabs.sendMessage(tabs[0].id,{name:filename,translate:dictionary},resMessage)
	 })
  }
  
  function resMessage(res){
	  const div=document.createElement('div')
	  div.textContent="Translated"
	  document.body.appendChild(div)
  }
}, false)

function openFile(){
var reader = new FileReader();
reader.readAsText(filename)
reader.onload = function() {
	dictionary=reader.result
	localStorage.setItem("dictionary", dictionary);
  };

  reader.onerror = function() {
    console.log(reader.error);
	alert('Couldnt load file');
  };
}