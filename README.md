# meme-generator-btech
A meme generator for the Summer Academy 2021 by Bridgerland Applied Technical College

This project follows a tutorial by Geek Launch, which can be found at https://www.youtube.com/watch?v=aIgWxXlpRvU

## Tutorial
### Context
A meme generator is an application that takes input text and an image and then formats the text on top of the image. In this exercise, you will have two text inputs (one for the top of the image and the other for the bottom) and will also make a way for a user to upload their own background image. Finally, a button click will run the function that formats the text and imposes it on top of the image in genuine "meme style".
### Getting started
Download the starter code and open up the _meme-generator-btech project_ folder in a code editor of your choice. Then, open up the ```index.html``` file in a browser.

Then, add your name and the date to the ```memeGenerator.js``` file.

Observe in your code editor that there is no code in the ```memeGenerator.js``` or ```style.css``` files. There is some basic starter code in the ```index.html``` file. You will be working on all three files and submitting them in a single zip folder.

### Add elements to the HTML file
A meme generator specifically needs five HTML elements to work: two text inputs, a file upload input, a button to run the function that creates the meme, and a space where the finished meme will appear. Create each of those five elments:
- Create two text input areas using the ```textarea``` tag. To make the tags easier to find using JavaScript, give each text area a unique, descriptive ```id``` attribute (Ex. id="topText").
- Create an input tag whose type is set to "file". Give it a unique ```id``` attribute for easy access later on, and set the input to only accept images.
- Create a button with a value that says "Generate Meme!". Give it a unique ```id``` attribute as well.
- Create a ```canvas``` element that has a unique ```id``` attribute. The canvas won't show up on the screen for now since there is nothing in it, but we will use JavaScript soon to fill it with a finished meme.

Save your ```index.html``` file and refresh your browser window to see the changes you made take effect. You should see two text areas, a file upload input, and a button.

### Grab the elements using querySelector
Using JavaScript, you can grab the user's input to the text areas with querySelector. In your memeGenerator.js file, add code that grabs each of the important elements (the ones with an ```id```) and stores them in a variable.

- Create a constant variable ```topTextInput``` that is equal to the first ```textarea``` element.
- Create a constant variable ```bottomTextInput``` that is equal to into the second ```textarea``` element.
- Create a constant variable ```imageInput``` that is equal to the input where users can upload a file.
- Create a constant variable ```generateButton``` that is equal to the button that will be used to generate the meme.
- Create a constant variable ```canvas``` that is equal to the canvas element.
- Let there be a variable ```context``` that is equal to ```canvas.getContext('2d');```. This context variable allows us to interact with the display properties of the canvas element, such as the background image and text.

Now that you have each of the elements stored in a variable, it will be easier to retrieve data from them and interact with your HTML page.

### Add an event listener to the button
##### Define what event the button should listen for
Your button can be clicked, but until you add a "click" event listener, the button won't know what to do when it happens. Add a "click" event listener to the ```generateButton``` defined previously.
- Add a click event listener to the ```generateButton```.
##### Make a callback function for the event listener
The second argument to the event listener is a callback function. The first argument defines what event the button will listen for (a click) and the callback function defines what to do when the event is triggered.
- Inside the callback function, let there be a variable ```fileReader```, which is a new FileReader object. You can read more about the FileReader object at [this link](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).
- Set the ```fileReader``` so that it's "onload" property is equal to an anonymous callback function. In other words, when a file is loaded, do a function defined as follows:
  - Inside the onload callback function, let there be a new variable ```image``` that is a new Image. Then, set the "src" of ```image``` equal to the result of the ```fileReader```.
- After the ```fileReader.onload``` function (not inside it), use the following code to get the first image (and the only image) that the user submitted, and read it as a data URL:
    fileReader.readAsDataURL(imageInput.files[0]);

### Managing the canvas
Now it's time to actually generate the meme. To make things more organized, write a separate functions at the bottom of your file called ```generateMeme```. For now, this function will take a single parameter called ```image```.
- Create a named function called ```generateMeme``` that takes a single parameter ```image```.

Inside the function body, set the canvas width equal to the width of the image, and the height of the canvas height equal to the height of the image.
- Set the width of the canvas equal to the width of the image.
- Set the height of the canvas equal to the height of the image.

Using the ```context``` variable, clear the canvas with the ```clearRect``` method. This method takes four parameters:
1. The x starting position in the canvas.
2. The y starting position in the canvas
3. The x ending position in the canvas.
4. The y ending position in the canvas.

The ```clearRect``` method will clear an entire rectangle in the space that you indicate. For this reason, the x and y starting positions will each be 0 and the ending positions will be the canvas width and height, respectively.
- Use the ```clearRect``` method of the ```context``` variable to clear the canvas.

Now draw an image on the canvas using ```context``` and its method ```drawImage```. This method takes three parameters:
1. The Image object to draw
2. The x starting position.
3. The y starting position.

Starting at (0, 0), draw ```image``` on the canvas using ```context``` and its method ```drawImage```.

> ##### Test it out!
> Your meme generator isn't fully functional yet, but you should at least be able to upload an image and see it appear on the screen.
> What do you see?

### Add CSS to the image
As you might notice, you can now upload an image and make it appear on the screen. However, big images might go off the screen, and small images are microscopic. To change this, add a property to our CSS file that makes our canvas have a fixed width of 300px.
- In your ```style.css``` file, select the canvas element and set its width to 300px.

### Draw the text onto the image
Go back to the ```generateMeme``` function. Observe that it has a single argument, which is an Image. However, we know that a meme needs at least two lines of text as well. For this reason, add two more arguments to the function, ```topText``` and ```bottomText```. Then, make sure to add the value of ```topTextInput``` and ```bottomTextInput``` as arguments where the function is called in the event listener.
- Add two arguments, ```topText``` and ```bottomText``` to the ```generateMeme``` function.
- Add the value of ```topTextInput``` and ```bottomTextInput``` to the function call in the button's event listener.

##### Add the top text
Back in the body of the ```generateMeme``` function, after clearing the image, let there be a new variable called ```fontSize``` that is equal to the width of the canvas divided by 15. This will make the font size approximately well-sized for the image. Then, use string concatenation to set the ```font``` property of ```context``` equal to ```fontSize``` number of pixels and the font family "Impact". Set the ```fillStyle``` equal to white, the ```strokeStyle``` equal to black, and the ```lineWidth``` equal to the fontSize divided by 15. 

Finally, set the ```textBaseline``` to 'top' and the ```textAlign``` to 'center'. TextBaseline is, by default, set to 'bottom', meaning that text position is determined by the bottom of the letter. Thus, if you omit this setting, writing text will not appear correctly because the text is written bottom up from the very top of the canvas.
- Create a new variable ```fontSize``` equal to the width of the canvas divided by 15.
- Set the ```font``` property of ```context``` equal to the ```fontSize``` number of pixels and the Impact font family using string concatenation. You can read about setting the font at [this link](https://www.w3schools.com/tags/canvas_font.asp).
- Set the ```fillStyle``` property of ```context``` equal to white.
- Set the ```strokeStyle``` property of ```context``` equal to black.
- Set the ```lineWidth``` equal to ```fontSize``` divided by 15.
- Set the ```textBaseline``` to 'top'.
- Set the ```textAlign``` to 'center'.

Use the ```fillText``` method of ```context``` to add the ```topText``` to the canvas. Remember that fillText takes four parameters:
1. The text to be written.
2. The x starting position in the canvas.
3. The y starting position in the canvas.
4. The max width for the text.

Write the first text input to the canvas, using ```topText``` as the first parameter, the canvas width divided by 2 as the second, 0 as the third, and the canvas width as the final parameter. Then, use the same parameters to add stroke to the text, using the ```strokeText``` method of the ```context```.
- Write ```topText``` to the canvas using the ```fillText``` method of ```context```.
- Write the stroke of ```topText``` to the canvas using the ```strokeText``` of ```context```.

##### Add the bottom text
Use the same approach to add the bottom text to the canvas. Set the ```textBaseLine``` to bottom (since we are writing from the bottom of the canvas up), and then use the ```fillText``` and ```strokeText``` methods to determine where to write the text. Make sure to set the y starting position (the third parameter) to the canvas height, rather than 0.
- Set the ```textBaseline``` to 'bottom'.
- Write ```bottomText``` to the canvas using the ```fillText``` method of ```context```.
- Write the stroke of ```bottomText``` to the canvas using the ```strokeText``` of ```context```.

> ##### Test it out!
> Now you should be able to enter text and see it overlaid on your image. Nice job!
> However, you aren't quite done. As you can see, if you have multiple lines of text, the line brakes just appear as spaces. Next, you'll see a simple strategy for fixing this issue.

 ### Format the text
 As you may have seen, your meme generator is now working, for the most part. However, adding multiple lines of text in the textarea doesn't translate to multiple lines of text on the image. To fix this, we will split the text by the newline character '\n' and use a ```for``` loop to cycle through each string of text.

 Above the line where you used the ```fillText``` method (the first time), use the ```topText``` and call its ```split``` method to split by the newline character ```\n```. This method will return an array of strings (text). After the split method, use the array method ```forEach``` to define an anonymous function that will execute for each line of text. Make this function take two parameters ```lineOfText``` and ```i```, where ```i``` is the iteration number of the loop. Then, move your ```fillText``` and ```strokeText``` lines of code inside the body of the function. Modify the ```fillText``` and ```strokeText``` methods to take the ```lineOfText``` instead of ```topText```, and ```fontSize``` multiplied by ```i``` rather than 0. This way, with each iteration of text (each new line), the text will be written lower and lower.

 Do the same for the ```bottomText```, substituting the starting y position of the canvas height for the canvas height minus the ```fontSize``` multiplied by ```i```.

 - Use the ```split``` method to split ```topText``` by the newline character ```\n```.
 - Use the ```forEach``` array method on the result to define an anonymous function that has two parameters, ```lineOfText``` and ```i```.
 - In the function body, use the ```fillText``` and ```strokeText``` methods to write text to the canvas, subsituting ```lineOfText``` for ```topText``` and ```fontSize``` multiplied by ```i``` for the y starting position, 0.
 - Do the same for the ```bottomText```, substituting the starting y position of the canvas height for the canvas height minus the ```fontSize``` multiplied by ```i```.

> ##### Test it out!
> Now you can see that the meme generator turns multiple lines of input into multiple lines on the image. However, there is still a problem. Because the bottomText is written from the bottom of the meme upwards, the first line of the bottom text input is on the bottom.
> To fix this, use the array method ```reverse``` to reverse the order of the text elements and write them to the image in reverse order immediately after you split the bottomText.

- Insert the ```reverse``` method immediately after splitting ```bottomText``` to write the text in reverse order.

### Add a slider input to change the text size
Your meme generator is almost finished. Now it's time to add the finishing touches: a slider that will allow the user to choose a different font size easily. There will be two sliders, one for each text.
