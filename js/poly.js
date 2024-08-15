function Brain()
{
var x = document.getElementById("nox").value;
var a = document.getElementById("noa").value;
var b = document.getElementById("nob").value;
var c = document.getElementById("noc").value;

alert(x*x);
alert(a);

x = Number(x);
a = Number(a);
b = Number(b);
c = Number(c);

var y = a*x*x + b*x + c;

document.getElementById("answer").innerHTML= "Result: " + y;

}