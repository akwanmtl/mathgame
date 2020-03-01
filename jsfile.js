


$(document).ready(function(){

//window.onload = function() {

	
	let list = [];
	$.ajax({ 
	    url: "https://spreadsheets.google.com/feeds/list/1x_ebWC4RSmPdgRnfReThUEL_sYGegoRtO1PlQdAjrIs/od6/public/values?alt=json", 
	    dataType: 'json', 
	    //data: data, 
    	async: false, 
	    success: function(data){ 
	        let rows = data.feed.entry;
      
      		for (let i = 0; i < rows.length; i++){
		      	let item = {
		      		numbers : [parseInt(rows[i]['gsx$num1']['$t']),parseInt(rows[i]['gsx$num2']['$t']),parseInt(rows[i]['gsx$num3']['$t']),parseInt(rows[i]['gsx$num4']['$t'])],
		      		answer : rows[i]['gsx$answer']['$t']
		      	};
		      	list.push(item);
		     } 
		     //console.log(list.length)
		 }

	});
/*
	$.getJSON("https://spreadsheets.google.com/feeds/list/1x_ebWC4RSmPdgRnfReThUEL_sYGegoRtO1PlQdAjrIs/od6/public/values?alt=json", function(data) {
      let rows = data.feed.entry;
      
      for (let i = 0; i < rows.length; i++){
      	let item = {
      		numbers : [parseInt(rows[i]['gsx$num1']['$t']),parseInt(rows[i]['gsx$num2']['$t']),parseInt(rows[i]['gsx$num3']['$t']),parseInt(rows[i]['gsx$num4']['$t'])],
      		answer : rows[i]['gsx$answer']['$t']
      	};
      	list.push(item);
      	listNumbers.push([parseInt(rows[i]['gsx$num1']['$t']),parseInt(rows[i]['gsx$num2']['$t']),parseInt(rows[i]['gsx$num3']['$t']),parseInt(rows[i]['gsx$num4']['$t'])])
      	listAnswers.push(rows[i]['gsx$answer']['$t']);
      };
      
    });
*/
    //console.log(list.length)
	let possible = list.filter(function(x) { return x.answer != 'none'; });
    
    let index = Math.floor(Math.random()*possible.length);
    //console.log(possible[index].numbers)
    let originalNumbers = possible[index].numbers;

    originalNumbers = shuffle(originalNumbers);

    function shuffle(numbers){
    	let s = numbers.sort(func);  

		function func(a, b) {  
		  return 0.5 - Math.random();
		}	
		return s;	  
    }
	document.getElementById("num1").innerHTML= originalNumbers[0];
	document.getElementById("num2").innerHTML = originalNumbers[1];
	document.getElementById("num3").innerHTML = originalNumbers[2];
	document.getElementById("num4").innerHTML = originalNumbers[3];

	document.getElementsByTagName("body")[0].style.transition = "2s";
	document.getElementsByTagName("body")[0].style.opacity = "1";

	function add(a, b){
		return a + b;
	}
	function subtract(a,b){
		return a - b;
	}
	function multiply(a,b){
		return a * b;
	}
	function divide(a,b){
		return a / b;
	}
	function operate(operator, num1, num2){
		switch(operator){
			case 'add':
				console.log('hi')
				return add(num1, num2);
				break;
			case 'subtract':
				return subtract(num1, num2);
				break;
			case 'multiply':
				return multiply(num1, num2);
				break;
			case 'divide':
				return divide(num1, num2);
				break;
			default:
				return (num2 != null) ? num2 : num1;
				break;
		}
	}

	
	let counter = 0;
	let array = ['',''];
	let operator = "equal";
	let step = 0;

	document.getElementById("clear").addEventListener('click', reset);
	
	function reset(){

		console.log('reset')

		document.getElementById("num1").innerHTML= originalNumbers[0];
		document.getElementById("num2").innerHTML = originalNumbers[1];
		document.getElementById("num3").innerHTML = originalNumbers[2];
		document.getElementById("num4").innerHTML = originalNumbers[3];

		document.getElementById("num1").style.background = "#7406f9";
		document.getElementById("num2").style.background = "#7406f9";
		document.getElementById("num3").style.background = "#7406f9";
		document.getElementById("num4").style.background = "#7406f9";


		document.getElementById("num1").disabled = false;
		document.getElementById("num2").disabled = false;
		document.getElementById("num3").disabled = false;
		document.getElementById("num4").disabled = false;

		document.getElementById("num1").style.visibility = "visible";
		document.getElementById("num2").style.visibility = "visible";
		document.getElementById("num3").style.visibility = "visible";
		document.getElementById("num4").style.visibility = "visible";

		counter = 0;
		array = ['',''];
		operator = "equal";
		step = 0;

	}

	document.getElementById("next").addEventListener('click', next);

	function next(){
		index = Math.floor(Math.random()*possible.length);
	   	originalNumbers = possible[index].numbers;
	   	originalNumbers = shuffle(originalNumbers);
		reset();

	}

	document.getElementById("answer").addEventListener('click', answer);

	function answer(){
		alert(possible[index].answer);

	}
	/*
	
	function reset(){

		//console.log('reset')

		document.getElementById("num1").innerHTML= originalNumbers[0];
		document.getElementById("num2").innerHTML = originalNumbers[1];
		document.getElementById("num3").innerHTML = originalNumbers[2];
		document.getElementById("num4").innerHTML = originalNumbers[3];

		document.getElementById("num1").style.background = "";
		document.getElementById("num2").style.background = "";
		document.getElementById("num3").style.background = "";
		document.getElementById("num4").style.background = "";

		document.getElementById("num1").style.visibility = "visible";
		document.getElementById("num2").style.visibility = "visible";
		document.getElementById("num3").style.visibility = "visible";
		document.getElementById("num4").style.visibility = "visible";

		counter = 0;
		array = ['',''];
		operator = "equal";
		step = 0;

	}
	*/


	let allNum = document.querySelectorAll('.myButton2');

	allNum.forEach(function(num){
		num.addEventListener('click', function (){

			if(counter != 2){
				let numID = this.id;
				array[counter] = numID; 
				counter++;
				document.getElementById(numID).style.background = "LightBlue"; 
				//console.log('hello')
				valid();
			}

		});
	});

	let allOp = document.querySelectorAll('.myButton1');
	
	allOp.forEach(function(op){
		op.addEventListener('click', function (){
			operator = this.id;
			//console.log(operator)
			valid();
		});
	});


	function valid(){
		if(operator == 'equal' || counter <= 1){
		}
		else {
			let num1 = parseFloat(document.getElementById(array[counter-2]).innerHTML);
			let num2 = parseFloat(document.getElementById(array[counter-1]).innerHTML);
			let result = operate(operator, num1, num2);
			//console.log(operator)

			document.getElementById(array[counter-2]).style.visibility = 'hidden';
			document.getElementById(array[counter-1]).innerHTML = result;
			document.getElementById(array[counter-1]).style.background = "#7406f9";
			operator = "equal";
			step++;
			//console.log(step)
			//console.log(result);
			if (step == 3 && result == 24){
				document.getElementById(array[counter-1]).style.background = "#3AC823";
				//console.log('yay')
				document.getElementById(array[counter-1]).disabled = true;

			}
			else if (step == 3 && result != 24){
				document.getElementById(array[counter-1]).style.background = "LightCoral";
			}
			counter = 0;
		
		}
	}

	//document.getElementById("check").addEventListener('click', check);

	//function check(){
		

	//}
	
});
