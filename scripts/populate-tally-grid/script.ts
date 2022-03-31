const node = figma.currentPage.selection[0];
const orientation = (node.width > node.height) ? "landscape" : "portrait";

const MAX_POSSIBLE_ROWS = (node.height / 24) - 1;
// const MAX_POSSIBLE_ROWS = 2;

//	If the selected node isn't set up for expected auto-layout configuration…
if (node.layoutMode === "NONE") {
	// …then do something
	node.layoutMode = "VERTICAL";
	node.primaryAxisAlignItems = "SPACE_BETWEEN";
	node.counterAxisSizingMode = "FIXED";
	node.paddingTop = 0;
	node.paddingLeft = 0;
	node.paddingBottom = 0;
	node.paddingRight = 0;
}

let { width, height } = node;

console.log("node", node);

let i;
let j;


for (i = 0; i <= MAX_POSSIBLE_ROWS; i++ ) {
	let newRow = createFrame({
		height: 24,
	});
	newRow.layoutMode = "HORIZONTAL";
	newRow.primaryAxisAlignItems = "SPACE_BETWEEN";
	newRow.name = `row ${i}`;
	newRow.resize(width, 24);
	newRow.layoutAlign = "STRETCH";
	newRow.counterAxisSizingMode = "FIXED";

	// newRow.layoutGrow = 1;
	for(j = 1; j <= 10; j++) {
			let newtext = createText();
			newtext.textAlignHorizontal = "CENTER";
			newtext.resize(24, 15);


			newtext.characters = `${(i === 0) ? (j) : (i * 10) + (j)}`;
			newRow.appendChild(newtext);
	}

	node.appendChild(newRow);
}

// node.resize(width, height);
console.log("orientation", orientation);
