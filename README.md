# Cyber Stories

In this project, you'll be re-creating part of the website 
[Hacker News](https://news.ycombinator.com/) using the Hacker News API.

But what is Hacker News? Hacker News is a social news website that talks about all things technology and buisness.

**The documentation for the Hacker News API is available here: https://github.com/HackerNews/API**.

The first thing you'll want to do is read through the documentation starting at the "Design" section.

## Requirements

* Your website loads at least the 100 current top stories on Hacker News and displays their titles
on the page

* Each story's title should be a link to the story's URL

* Next to the story's title should be the author's username, the story's score, and number of comments.

* Your site should look better than the real Hacker News ( maybe Bootstrap?)

* Your site should be mobile responsive and use at least one CSS media query to change style rules based on your screen size

* Deploy on GitHub pages

## Steps

#### 1. Designing your layout

Your site should include a header with a title as well as a place for stories, outside of this, your layout is completely up in the air!

In your HTML and CSS, add these elements. If you need help deciding a color theme, there are a lot of online resources to help... 

When you get a design fleshed out in your HTML and CSS, than it's a good idea to set your media query requirement now. 

Additionally, if you'd like to use Bootstrap to style your buttons and such, don't forget to add the Bootstrap CSS / JS to the `<head>` of your `index.html`.

#### 2. Adding a single story to the DOM

Before even starting to request from your API, You should decide the layout of your individual stories, that you can replicate once you have real data to put in. 

To do this, use `document.createElement` along with `.appendChild` (or try with jQuery) in your Javascript.

```javascript

// Example adding two elements to the DOM

const body = document.querySelector('body');

const parent = document.createElement('div');
parent.className = 'parent';

const child = document.createElement('div');
child.className = 'child';

parent.appendChild(child);
body.appendChild(parent);

// Result:
//
// <body>
//     <div class="parent">
//         <div class="child">
//         </div>
//     </div>
// </body>

```

Recall that stories should be displayed as a title that links to the story's URL. 
Additionally, a story has a score, a number of comments, and the name of the user
that submitted the story. It might look something like this:

```
230 points - Story title goes here
20 comments - submitted by username 
```

For your test story, make up any values you want for the title, username, etc.
Do this from your JS file so when you do start calling the API, your HTML will not need to be changed.

#### 3. Reading the API's documentation

Now it's time to figure out how the HackerNews API works. As a simulation of
programming in the wild, we won't explicitly tell you which API routes you'll need
to use for this assignment. 

Read through the [API's documentation](https://github.com/HackerNews/API) and 
answer the following questions:

1) What endpoint can be used to get the IDs of the top stories?

2) What endpoint can be used to get the details of a story using its ID?

#### 4. Getting the top stories' IDs

Now that you've read the documentation, you should know which API route can be used
to fetch the IDs of the top stories. 

Notice that this API route does not provide any other information about the stories 
other than their IDs. The implication of this is that to get a top story's details, you'll first 
need to retrieve all the top stories' IDs, then for each ID, you'll need to make another API request 
to retrieve the story's details.

Anyways, in your JS, use `fetch()` to make a request to the API route that gets the top stories IDs. 
Upon receiving the response (and after doing the `.json()` thing), log out the response data. 

If you see an array of story IDs being logged- great! It's working.

#### 5. Getting each story's details

At this point, you should have a place in your code where you have an array of
story IDs. Now, what we need to do is loop through that array of IDs, and for each
ID, make an API request to fetch the details of that story. 

For now, just `console.log` the details of each story upon retrieving them.

To get the details of a story from its ID, you'll need to make another API request
to the endpoint that you found that gives you a story's details from its ID.

Your code may look something like this:

```javascript

fetch( ... )
    .then((data) => data.json())
    .then((storyIds) => {

        // TODO:
        // * For each ID...
        //   * Make an API request to get the story's details

    });

```

#### 6. Adding each story to the DOM

Finally, after retrieving each story's details, add the details to the DOM. You should
have a template on how to do this from Part 2. All you have to do now is figure out how
to do that for each story.

The previous TODO statement would look more like this now:

```javascript

// TODO:
// * For each ID...
//   * Make an API request to get the story's details
//   * Upon receiving the response, add the details to the DOM

```

After doing this, you should have a working Hacker News clone!

## Stretch Goals

#### Comments

Add a button to each story "View comments". When clicked, a section below the
story should appear that contains the story's comments. Again, you'll need
to review the API documentation to see how this could be done.

#### Tab Layout

We've got stories, great! But what about the other tabs on HackerNews (ask, show, jobs).
Lets add the "ask" section. These are essentially a different set of stories that are all
questions.

Add two buttons in the header of your page, "stories" and "ask". Clicking between them
should toggle your page between showing the top stories and the top "ask" stories (available
at a different API endpoint).
