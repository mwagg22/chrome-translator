var punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
var filename=""
var Dictionary_array;
var map=new Map();

function translateWord(word){
	if(map.has(word)){
		return map.get(word)
	}
	else{
		//for (const [key,value] of map.entries()) {
			//console.log(key);
		//	if(word.includes(key))
	//			return value; 
		//}
		return word;
	}
		
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
if(request.name==filename)
	translate()
else{
	filename=request.name
	var vocabulary=JSON.parse(request.translate)
	Dictionary_array=Object.entries(vocabulary)
	map = new Map(Dictionary_array);
	translate();
}		
sendResponse(1);
})

function translate(){
	var pTags=document.documentElement.getElementsByTagName('p')
	var h1Tags=document.documentElement.getElementsByTagName('h1')
	var h2Tags=document.documentElement.getElementsByTagName('h2')
	var h3Tags=document.documentElement.getElementsByTagName('h3')
	var spanTags=document.documentElement.getElementsByTagName('span')
	var aTags=document.documentElement.getElementsByTagName('a')
	
	translateTag(pTags)
	translateTag(h1Tags)
	translateTag(h2Tags)
	translateTag(h3Tags)
	translateTag(spanTags)
	translateTag(aTags)
	
}
function translateTag(Tag){
	for(var i=0;i<Tag.length;i++){
		//check with hash table and change word to it accordingly
		var words=Tag[i].innerText.split(" ")
		var newP=""
		for(word in words){
			//console.log(words[word]);
			var cleanString = words[word].replace(punctuation, '');
			//console.log(cleanString);
			var translatedWord=translateWord(cleanString.toLowerCase())
			translatedWord=MatchCases(cleanString,translatedWord);			
			newP+=words[word].replace(new RegExp(cleanString, "g"), translatedWord)+" ";
		}
		Tag[i].innerText=newP;
	}	
	
}

function MatchCases(word,translated){
	var result="";
	for(var i=0;i<=word.length;i++){
		var t = translated.charAt(i);
        var w = word.charCodeAt(i);

        if(w >= 65 && w < 65 + 26) {
            result += t.toUpperCase();
        } else {
            result += t.toLowerCase();
        }
		if(i==word.length){
			result+=translated.substring(i+1, translated.length);
		}
    }
	return result;
}