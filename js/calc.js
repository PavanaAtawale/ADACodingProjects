/*
We need a bunch of variables to store the state information
*/

var num1 = 0; //first number
var num2 = 0;  //2nd number
var result = 0; //result to display
var isFirst = true;  //flag to remember if we are handling 1st or 2nd number
var isDot = false;  //flag to remember if the decimal point is pressed
var opcode = 0;  //variable to remember the operation key pressed

/*
Button controller function
*/
function btnCtrl(btn) {
	//Handle the digit buttons.
	if (btn < 10) {
    	if (isFirst) { //Handling first number
			if(isDot) 
				num1 += btn/10; //Handle decimal number
            else
				num1 = num1 * 10 + btn; //Number is integer.

			document.getElementById("ans").innerHTML = num1;
        } else {
			if(isDot)            
				num2 += btn/10;
            else
				num2 = num2 * 10 + btn;
            document.getElementById("ans").innerHTML = num2;
        }
        return;
	}

	//Handle clear button
	if (btn == 'c') {
    	resetCalc();
        document.getElementById("ans").innerHTML = result;
        return;
	}

	if (btn == '%') {
    	if(isFirst == true) {
        	num1 = num1 / 100.00
            document.getElementById("ans").innerHTML = num1;
        } else {
        	num2 = num2 / 100.00
            document.getElementById("ans").innerHTML = num2
        }
        return;
	} 


	//Handle operator buttons
	if (btn == '+' || btn == '-' || btn == 'x' || btn == '/' ) {
    	opcode = btn;
        isFirst = false;
        isDot = false;
        num2 = 0;
        return;
	}
	
    //Handle sign change button:
	if (btn == '+/-' ) {
    	if (isFirst == true ) {
			num1 = num1 * -1;
            document.getElementById("ans").innerHTML = num1;
        } else {
			num2 = num2 * -1;        
            document.getElementById("ans").innerHTML = num2;
        }
        return;
	}  

	if ( btn == '.' ) {
        isDot = true;
        return;
	}


}

/*
Perform the calculations when the = button is pressed
*/
function calculate() {	
    if(opcode == '+') {
        result= num1 + num2;
    }
    
    if(opcode == '-') {
        result= num1 - num2;
    }
    
    if(opcode == 'x') {
        result= num1 * num2;
    }
    
    if(opcode == '/') {
        if (num2 == 0) {
            result = "NAN";
        } else {
            result = num1 / num2;
        }
    }

	document.getElementById("ans").innerHTML= result;
    resetCalc();
}

/*
Reset the variables used to remember various pieces of information
*/
function resetCalc() {
    num1 = 0;
    num2 = 0;
	result = 0;
    isFirst = true;
    isDot = false;
}



