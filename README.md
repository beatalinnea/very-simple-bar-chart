# BarChart
- BarChart version 1.1.0
- This is a module created as a student project for Laboration 2 in the course 1DV610 Mjukvarukvalitet at Linnaeus University.
- This module is written in, and compatible with, JavaScript

## What is BarChart?
- BarChart provides functionality for your Canvas Element. The purpose of BarChart is for you to be able to send data to the BarChart object - which will create a diagram, a bar chart, showing the frequency for each value in the data you send in. 
- The data sent in must be an array. If the elements are objects with given values for x and y - each x value would represent a bar in the diagram with the given y value for its y axis. Else if the array is not recognized as containing objects with x and y properties, each element counts as a vote for the value that the element represents. Meaning, adding [3, 3, 5] will give two votes for '3' and one vote for '5'. You can also choose to add a headline for the bar chart, as shown in the example below.


## Instructions
- The module can be installed as a npm package in your own project by running ```npm i very-simple-bar-chart``` 
- When installed in your project, you import the package within your file ```import { BarChart } from 'very-simple-bar-chart'``` and are then able to create objects of the BarChart type.
```const barChart = new BarChart(canvas)```
- BarChart does NOT create an HTML Canvas Element for you, the constructor needs a Canvas Element, from your own project, as an argument.

## Create an instance
By creating a new BarChart instance, you will send your chosen Canvas Element as an argument to the constructor. The methods provided on the BarChart object will modify the diagram to what you prefer.

## Interface
Once you have created your BarChart object you can call the methods provided on it.
### addValues(data)
Example 1:
Argument type: Array
```const data = ['cat', 'cat', 'dog', 'hamster']```
```barChart.addValues(data)```                  
Explaination: When calling addValues(data) with an argument being an array where the elements are NOT objects with x and y properties - each unique element within the array of data will represent one bar in the bar chart. The frequency of each unique element will decide the height of each bar. The example above would give us one bar for 'cat' where y value would be 2, and one bar with y value 1 each for 'dog' and 'hamster'.               
Example 2:         
Argument type: Array of objects containing x and y properties
```const data = []```
```const obj1 = { x: 'a', y: 4 }```  
```const obj2 = { x: 'b', y: 4 }```   
```data.push(obj1, obj2)```   
```barChart.addValues(data)``` 
Explaination: When calling addValues(data) with an argument being an array containing objects with x and y properties - All x values represents a bar and the y value represents their value on the y axis. The example above would give us one bar with 4 "votes" each for both bar 'a' and 'b'.                 
Note: If BarChart already containts data, is viewing a diagram, and the methods get called - all previous data will be reset and a new bar chart will be viewed representing the new data.
### changeBackgroundColor(color)     
Example:
```barChart.changeBackgroundColor('#efdefd')```         
Argument type: String           
Explanation: When calling changeBackgroundColor(color) the background of the bar chart will set to the color sent in as argument. The method expects a valid color code, either written in rgb format('rgb(0,0,255)') or hexadecimal('#00ff00'), or (if valid) the color name ('red').           
Note: If the color code is not an actual color, the diagram will not show a color.
### changeSize(width, height)     
Example:
```barChart.changeSize(500, 400)```           
Argument type: number, number          
Explanation: When calling changeSize(width, height) the bar chart will adjust to the new size.              
Note: The BarChart will not adjust to the size of the data you send in. If the diagram gets to crowded - you can adjust the size, setting a new width or height.
### addHeadline(text)    
```barChart.addHeadline('How many hours do you sleep per day?')```      
Argument type: String           
Explanation: When calling addHeadline(text) a text will be visible within the canvas above the bar chart.              
Note: If you call this when you already have a headline, the new method call will replace the old headline.       
### getAmountOfVotes()   
```barChart.getAmountOfVotes()```       
Return type: int   
Explanation: When calling getAmountOfVotes() the method returns the total amount of votes.
Note: This does not affect the canvas or the bar chart in any way.
### clearHeadline()     
```barChart.clearHeadline()```        
Explanation: When calling clearHeadline() the previously set headline will be removed from the bar chart.