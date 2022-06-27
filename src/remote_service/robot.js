// Include the robotjs package
import pkg from 'robotjs';
const { moveMouseSmooth, mouseClick, typeString, keyTap, keyToggle } = pkg;

// Timeout to wait if system is slow
setTimeout(startOpenBoard, 1000);

//Opening the openboard
//Can learn more about these
//properties from the robotjs site

function startOpenBoard(){
	moveMouseSmooth(98,844);
	mouseClick();
	typeString(" openboard ");
	keyTap("enter");
	
	//Minimize openboard
	moveMouseSmooth(1433,28);
	mouseClick();
	
	//Start sublime text after 1s
	setTimeout(startSublimeText, 1000);
}

function startSublimeText(){
	moveMouseSmooth(98,844);
	mouseClick();
	typeString(" sublime text ");
	keyTap("enter");
	
//Minimize sublime
	moveMouseSmooth(1418,8);
	mouseClick();
	
	//Start chrome after 1s
	setTimeout(startChrome, 1000);
}

function startChrome(){
	moveMouseSmooth(98,844);
	mouseClick();
	typeString(" chrome ");
	keyTap("enter");
	
	//Open whatsapp web
	moveMouseSmooth(506,516);
	mouseClick();
	typeString("whatsapp web");
	keyTap("enter");

	moveMouseSmooth(349,389);
	mouseClick();
	
	//Open a new tab
	keyToggle("control","down");
	keyTap("t");
	keyToggle("control","up");
	
	//Open gfg practice
	moveMouseSmooth(506,516);
	mouseClick();
	typeString("gfg practice");
	keyTap("enter");

	moveMouseSmooth(362,788);
	mouseClick();

	//Open a new tab
	keyToggle("control","down");
	keyTap("t");
	keyToggle("control","up");

	//Minimize chrome
	moveMouseSmooth(1398,23);
	mouseClick();
	
	//Start one note after 1s
	setTimeout(startOneNote, 1000);
}

function startOneNote(){
	moveMouseSmooth(98,844);
	mouseClick();
	typeString(" oneNote ");
	keyTap("enter");
	
	//Minimize one note
	moveMouseSmooth(1443,10);
	mouseClick();
	
	//Start notepad after 1s
	setTimeout(startNotePad, 1000);
}

function startNotePad(){
	moveMouseSmooth(98,844);
	mouseClick();
	typeString(" notepad ");
	keyTap("enter");
	moveMouseSmooth(600,500);
	mouseClick();
	//Type a "Set up done" message
	typeString(" Your System is ready to use, Sir.");
}
