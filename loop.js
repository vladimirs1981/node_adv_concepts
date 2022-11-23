// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// kada izvršimo komandu iznad Node ne pokreće odmah eventloop, on prvo izvrši sve iz tog fajla i onda startuje eventLoop.
// Novi tajmeri, operacije, taskovi se beleže kada se pokrene myFile
myFile.runContents();

function shouldContinue() {
	// Check 1: Any pending setTimeout, setInterval, setImmediate?
	// Check 2:  Any pending OS tasks? (Like server listening to port)
	// Check 3: Any pending long running operation? (Like fs module)
	return (
		pendingTimers.length || pendingOSTasks.length || pendingOperations.length
	);
}

//eventLoop - entire body executes in one tick
while (shouldContinue) {
	// 1) Node gleda u pendingTimers i gleda da li neke funkcije čekaju da se pozovu. (setTimeout, setInterval)
	// 2) Node gleda u pendingOSTasks i pendingOperations i izvršava odgovarajuće callback funkcije
	// 3) Puzira izvršavanje. Nastavlja kada...
	//      - novi pendingOSTask je gotov
	//      - novi pendingOperation je gotov
	//      - tajmer završava izvršavanje
	// 4) Node gleda u pendingTimers (setImmediate)
	// 5) Hendluje 'close' evente.
}

// exit back to terminal
