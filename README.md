# very-simple-bar-chart
- BarChart version 1.0.0
- This is a module created as a student project for Laboration 2 in the course 1DV610 Mjukvarukvalitet at Linnaeus University.
- This module is written in, and compatible with, JavaScript

- BarChart provides functionality for your Canvas Element. The purpose of BarChart is for you to be able to send data to the BarChart object - which will create a diagram, a bar chart, showing the frequency for each value in the data you send in. 
- The data sent in must be an array where each element counts as a vote for the value that the element represents. Meaning, adding [3, 3, 5] will give two votes for '3' and one vote for '5'. You can also choose to add a headline for the bar chart.


## Usage and instructions
- BarChart does NOT create an HTML Canvas Element for you, the constructor needs you Canvas Element as an argument.

## Create an instance
By creating a new BarChart instance, you will send your chosen Canvas Element from your HTML DOM as an argument to the constructor. The methods provided on the BarChart object will modify the diagram to what you prefer.

## Interface
Once you have created your BarChart object you can call the methods provided on it.
### addValues(data)          
Argument type: Array           
Explaination: When calling addValues(data) each unique element within the array of data will represent one bar in the bar chart. The frequency of each unique element will decide the height of each bar.            
Note: If BarChart already containts data, is viewing a diagram, and the methods get called - all previous data will be reset and a new bar chart will be viewed representing the new data.
### changeBackgroundColor(color)             
Argument type: String           
Explanation: When calling changeBackgroundColor(color) the background of the bar chart will set to the color sent in as argument. The method expects a valid color code, either written in rgb format('rgb(0,0,255)') or hexadecimal('#00ff00'), or (if valid) the color name ('red').           
Note: If the color code is not an actual color, the diagram will not show a color.
### resize(width, height)             
Argument type: number, number          
Explanation: When calling resize(width, height) the bar chart will adjust to the new size.              
Note: The BarChart will not adjust to the size of the data you send in. If the diagram gets to crowded - you can adjust the size, setting a new width or height.
### addHeadline(text)        
Argument type: String           
Explanation: When calling addHeadline(text) a text will be visible within the canvas above the bar chart.              
Note: If you call this when you already have a headline, the new method call will replace the old headline.
### addTotalVotes()           
Explanation: When calling addTotalVotes() the amount of single values sent used as the data for the bar chart (meaning the total frequency, meaning elements in the array of data) will be viewed as a second headline.          
### getAmountOfVotes()          
Explanation: When calling getAmountOfVotes() the method returns the total amount of votes.
Note: This does not affect the canvas or the bar chart in any way.
### removeHeadline()           
Explanation: When calling removeHeadline() both the headline and the total votes will be removed, if either of them exists to begin with.
