
//String fontName = "TitilliumWeb-Regular";
String fontName = "Tahoma-48.vlw";

color bgColor = color(0);

String[] words;
int wordIndex = 0;

int time;
int[] wait = {2000, 3000, 4000};

PFont font;

void setup () {
  size(800,600);
  background(bgColor);
  font = loadFont(fontName);
  //myFont = createFont("Georgia", 32);
  words = new String[3];
  words[0] = "Artificial";
  words[1] = "Intelligence";
  words[2] = "Enabling";
}

void draw() {
  background(bgColor);
  textSize(80);
  text(words[wordIndex],mouseX,mouseY);
  if(millis() - time >= wait[wordIndex]){
    wordIndex += 1;
    if (wordIndex >=3) {
      wordIndex = 0;
    }
    time = millis();
  }
}