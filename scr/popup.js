var madea={
"hi":"hellur",
"hello":"hellur",
"boy":"boii",
"anger":"angression",
"you":"yo azz",
"doing":"during",
"police":"po po",
"with":"wit",
"the":"da",
"morning":"mornTing",
"lord":"lort(Praise him)",
"your":"ur",
"doing":"during",
"isn't":"ain't",
"halleluya":"hallelujer",
"lunch":"lernch",
"how":"how",
"friend":"homie",
"friends":"homies",
"for":"fo",
"go":"gow",
"in":"n",
"let":"le",
"me":"meh",
"explain":"splain",
"help":"hep",
"hair":"hare",
"i've":"i'don",
"that":"dat",
"um":"urrrm",
"juice":"jurrrrce",
"alright":"urrright",
"ham":"hurrrm",
"worry":"wurrry",
"politically":"politicle",
"everything":"errything"
}
var filename=((localStorage.getItem("vocabFile") === null))?"madea.json":localStorage.getItem("vocabFile")
var dictionary=((localStorage.getItem("dictionary") === null))?JSON.stringify(madea):localStorage.getItem("dictionary")
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
	console.log(dictionary);
	localStorage.setItem("dictionary", dictionary);
  };

  reader.onerror = function() {
    console.log(reader.error);
	alert('Couldnt load file');
  };
}