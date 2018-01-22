color bgColor = color(0);
String fontName = "TitilliumWeb-Regular";

String[] words;
int wordIndex = 0;

int time;
int[] wait = {2000, 2000};

void setup() {
  size(800,600);
  noCursor();
  background(bgColor);
  words = new String[2];
  words[0] = "ARTIFICIAL INTELLIGENCE";
  words[1] = "Enabling machines to learn";
}

void draw() {
  background(bgColor);
  textSize(50);
  text(words[wordIndex],width/2,height/2);
  if(millis() - time >= wait[wordIndex]){
    wordIndex += 1;
    if (wordIndex >= 2) { 
      wordIndex = 0;
    }
    time = millis();//also update the stored time
  }
}