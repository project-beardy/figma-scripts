/// <reference types="figma" />
const node: SceneNode = figma.currentPage.selection[0];
const ori = (node.width > node.height) ? "landscape" : "portrait";

const ROW_HEIGHT = 20;
const MAX_COLUMN_WIDTH = 24;
const MAX_POSSIBLE_ROWS = Math.round((node.height / ROW_HEIGHT) - 1);

/** If the selected node isn't alset up for auto-layout… */
if (node.layoutMode === "NONE") {
	/** then do something about it… */
	node.layoutMode = "VERTICAL";
	node.primaryAxisAlignItems = "SPACE_BETWEEN";
	node.counterAxisSizingMode = "FIXED";
	node.paddingTop = 0;
	node.paddingLeft = 0;
	node.paddingBottom = 0;
	node.paddingRight = 0;
}

/** If the selected node currently has children… */
if (node.children.length > 0) {
  /** …then burn them to the ground !! */
  node.children.forEach(c => c.remove());
}

let { width, height } = node;

let i;
let j;

for (i = 0; i <= MAX_POSSIBLE_ROWS; i++ ) {
	let newRow = createFrame({
		height: ROW_HEIGHT,
	});
	newRow.layoutMode = "HORIZONTAL";
	newRow.primaryAxisAlignItems = "SPACE_BETWEEN";
	newRow.name = `row ${i+1}`;

  /** This feels super hacky. It's the only way to FORCE */
  /** the child row items to behave as 'fill container' */
	newRow.resize(width, ROW_HEIGHT);
	newRow.layoutAlign = "STRETCH";
	newRow.primaryAxisSizingMode = "FIXED";
  newRow.counterAxisAlignItems = "CENTER";

  /** figure out how many columns we can get in */
  let MAX_COLUMNS = (ori === "portrait" && node.width <= (MAX_COLUMN_WIDTH * 10)) ? 10 : Math.round(node.width / MAX_COLUMN_WIDTH);

	// newRow.layoutGrow = 1;
	for(j = 1; j <= MAX_COLUMNS; j++) {
    let newtext = createText({
      fontName: {
      family: "Source Sans Pro",
      style: "Regular"
      }
    });
    newtext.textAlignHorizontal = "CENTER";
    newtext.resize(24, 15);

    /** render the correct number in the field */
    newtext.characters = `${(i === 0) ? (j) : (i * MAX_COLUMNS) + (j)}`;
    newRow.appendChild(newtext);
	}

	node.appendChild(newRow);
}
