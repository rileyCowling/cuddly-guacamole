/* 
*   ECE 513 IOT Project
*/

//this is to test github

//Inclusion of library header files
#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255


uint32_t irBuffer[100]; //infrared LED sensor data
uint32_t redBuffer[100];  //red LED sensor data


int32_t bufferLength; //data length
int32_t spo2; //SPO2 value
int8_t validSPO2; //indicator to show if the SPO2 calculation is valid
int32_t heartRate; //heart rate value
int8_t validHeartRate; //indicator to show if the heart rate calculation is valid

//Added Vas
//Status LEDs
int R_LED=D2, G_LED=D6, B_LED=D5, W_LED=A0;

int fingerPresent;
bool rangeSetter = false;


void setup()
{
  Serial.begin(115200); // initialize serial communication at 115200 bits per second:

  //setting up status LEDS
  pinMode(R_LED,OUTPUT);
  pinMode(G_LED,OUTPUT);
  pinMode(B_LED,OUTPUT);
  pinMode(W_LED,OUTPUT);

  // Initialize sensor, if something is wrong go into the following infinite loop
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    while (1);
  }

  //Print the OK Message to continue
  Serial.println(F("Attach sensor to finger with rubber band to Begin!"));

  //Sensor configuration variables
  byte ledBrightness = 60; //Options: 0=Off to 255=50mA
  byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; //Options: 69, 118, 215, 411
  int adcRange = 4096; //Options: 2048, 4096, 8192, 16384

  //Configure sensor with these settings
  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); 
}

void loop(){ 
  /** Finger detection before getting started **/
  if (particleSensor.getIR() < 50000){
    //Setting finger status to zero for not present
    fingerPresent=0;

    //No finger turn turn off B/G LEDs
    digitalWrite(G_LED,LOW);
    digitalWrite(B_LED, LOW);
    Serial.println(" No finger?");
    
    //we dont want to take unnecessary data
    //while there is no finger flash red LED
    while(fingerPresent==0){ 
      digitalWrite(R_LED,HIGH);
      delay(200);
      digitalWrite(R_LED,LOW);
      delay(200);
      if(!(particleSensor.getIR() < 50000)){
        fingerPresent=1; //Set finger status to 1 for present
        Serial.println("Finger Detected -- Initializing");
      }
    }
    rangeSetter=false; // this recalculates the range if the finger has been removed 
  }

  bufferLength = 100; //buffer length of 100 stores 4 seconds of samples running at 25sps
  
  //Finger present turn off Red LED and turn on Green LED
  digitalWrite(G_LED,HIGH);
  digitalWrite(R_LED,LOW);

  if(!rangeSetter){
    //read the first 100 samples, and determine the signal range
    digitalWrite(W_LED,HIGH);
    Serial.println("...");
    for (byte i = 0 ; i < bufferLength ; i++)
    {
      while (particleSensor.available() == false) //do we have new data?
        particleSensor.check(); //Check the sensor for new data

      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample(); //We're finished with this sample so move to next sample

    }
    rangeSetter=true; 
    digitalWrite(W_LED,LOW);
    //calculate heart rate and SpO2 after first 100 samples (first 4 seconds of samples)
    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
    //** DATA PRINTING **//
    //Heart Rate Values
    Serial.print(F("HR= "));
    Serial.print(heartRate, DEC);
    Serial.print(F(" BPM"));
    //Blood Oxygen Values 
    Serial.print(F(", SPO2= "));
    Serial.print(spo2, DEC);
    Serial.print(F("%"));
    Serial.println();  
  }
  
  //Continuously taking samples from MAX30102.  Heart rate and SpO2 are calculated every 1 second
  
  digitalWrite(B_LED,HIGH); //Status

  //dumping the first 25 sets of samples in the memory and shift the last 75 sets of samples to the top
  for (byte i = 25; i < 100; i++)
  {
    redBuffer[i - 25] = redBuffer[i];
    irBuffer[i - 25] = irBuffer[i];
  }
  
  //take 25 sets of samples before calculating the heart rate.
  for (byte i = 75; i < 100; i++)
  {

    while (particleSensor.available() == false) //do we have new data?
      particleSensor.check(); //Check the sensor for new data

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample
  }
  
  //After gathering 25 new samples recalculate HR and SP02
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
  
  //** DATA PRINTING **//
  //Heart Rate Values
  Serial.print(F("HR= "));
  Serial.print(heartRate, DEC);
  Serial.print(F(" BPM"));
  //Blood Oxygen Values 
  Serial.print(F(", SPO2= "));
  Serial.print(spo2, DEC);
  Serial.print(F("%"));
  Serial.println();
  
  //Webhook for sending data to the server
  String data = String(heartRate);
  Particle.publish("dataEntry", data, PRIVATE);

}
