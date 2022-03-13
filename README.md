# CTEC3451 Final Year Project / Data-Visualisation-Using-d3.js
### Folders
**"docs" folder contains index.html, print.css, screen.css, chart.js, d3.v7.js**

**"graphics" folder contains web graphics and artists photos (.svg, .jpg, .png)**

**"mockups" folder contains mockups first showcased in 1st deliverable and as a reference point within readme.md**


## Questions for supervisor
- [ ] Shall I run my code through HTML validator?
- [ ] What to do about floating mark?
- [ ] Do I make a mobile.css stylesheet as well?
- [ ] Is it ok that I'm using public API instead of the spotify data set?

## APIs
> Instead of using the smaller dataset from Kaggle, I've looked at a few APIs that can automatically grab the data for the visualization. Below I have listed the APIs that have caught my interest.
- https://developer.spotify.com/documentation/web-api/ [09/03/2022 - struggle to use this]
- https://developer.spotify.com/console/get-playlist-images/ [09/03/2022 - struggle to use this]
- https://calendarific.com/api-documentation [13/03/2022 - decided not to use]
- https://www.fruityvice.com/doc/index.html [13/03/2022 - decided not to use]
- https://openlibrary.org/developers/api [13/03/2022 - decided not to use]
- http://www.penguinrandomhouse.biz/webservices/rest/ [13/03/2022 - decided not to use, but may possibly change mind]
- **https://www.thecocktaildb.com/api.php?ref=apilist.fun [13/03/2022 - chosen api]**

## **General To Do List**
- [x] Submit 1st deliverable [14/01/2022]
- [x] Update readme.md with more information + add the mockups + checklist w/ dates [02/03/2022]
- [x] Improve organization of the readme.md [02/03/2022]
- [x] Resize mockups [02/03/2022]
- [x] Find suitable public API to stick with [13/03/2022]
- [x] Brainstorm what possible charts could be made using d3.js with this API [13/03/2022]
- [x] Create a Project management Section within the GitHub readme.md [13/03/2022]
- [ ] Revise the graphics + mockups folder, perhaps delete the artist images and get rid of mockups since they are outdated?
- [ ] Structure the final deliverable report
- [ ] Make sure to implement a variety of media screens amongst all pages




## **CSS To Do List**
- [ ] Change the h1/h2/h3/h4 code to be consistent throughout every page
- [ ] Change header styles to be more attractive
- [ ] https://www.penguinrandomhouse.com/ I like how the nav links get orange outlines once hovered!

## **index.html To Do List**
![Home Page](https://raw.githubusercontent.com/erica63/Data-Visualisation-Using-d3.js/571f2b8fa8bf24f487f8cbdfe05c323af227f53e/mockups/landingpage.png "Home Page")

- [x] Make the nav bar stay in a fixed position (it currently moves down with you if you scroll) [02/03/2022]
- [x] Resize hero image [02/03/2022]
- [x] Interact button works [02/03/2022]
- [ ] Revise index.html information in between sections and replace information with applicable new API information
- [ ] Uncomment the menu toggler code in HTML & CSS
- [ ] Review menu toggler JS code
- [ ] Make sure there is decent margin and padding all throughout each section

### Quick Statistics 
- [ ] Should I implement one or two simple and static data visualizations in this quick statistics section?
- [ ] Definitely should give more information about the public API json attributes/elements, what they look like, what they contain, etc
- [ ] Perhaps use the public API to add a few images of cocktails here?
- [ ] Don't forget to link/reference the API being used


# **interact.html To Do List**
![Interact Page](https://github.com/erica63/Data-Visualisation-Using-d3.js/blob/main/mockups/bubblechart.png?raw=true "Home Page")
- [ ] Create the skeleton of page
- [ ] Implement the data visualization

###  Visualization Use Cases
- [ ] View data
- [ ] Filter data
- [ ] Undo changes
- [ ] Select data
- [ ] Highlight data
- [ ] View help guide
- [ ] Restart

## **help.html To Do List**
- [ ] Create the skeleton of page
- [ ] Should this be revised and turned into an about page?

## **scripts.js To Do List**
- [ ] Make sure bubblechart shows up on page
- [ ] See if bubbles are correctly connected to dataset
- [ ] Create the buttons with icons for interaction bar
- [ ] Change buttons colour on hover
- [ ] https://archive.nytimes.com/www.nytimes.com/interactive/2013/05/25/sunday-review/corporate-taxes.html (great reference point for search bar usage)

## Blackbox Testing
> Insert more information as mentioned in the first deliverable

## Project Management
> My project plan was originally created as an excel file with a product & sprint backlog. I've moved the tasks into the project repository to make the information easier to find and update. 

| Milestone                             | Tasks                                                                           | Completion  |
| -------------                         |:-------------:                                                                  | -----:      |
| Find and source an open database      | <li>Found Spotify dataset on Kaggle</li> <li>Made simple bar chart</li>         | 10/09/2021  |
| Populate the **index.html** page      | <li>Added nav bar</li> <li>Created different sections</li>                      | insert accurate date |
| Populate the **interact.html** page   | <li>Add go back button</li> <li>Create a section for data visualization</li>    | insert accurate date |
| Create an interactive bubble chart    | <li>Bubbles can be clicked</li>    | insert accurate date |

