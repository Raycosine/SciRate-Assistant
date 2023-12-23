# SciRate-Assistant
SciRate Assistant is a Chrome extension to offer SciRate users a personalized experience...

## Before use
0. Download zip and unzip it, or clone this project.
1. Install this extension using 'Load unpacked' from the project folder.
2. (Modify site access)

## Features

### A reading list (Dec 22, 2023)
This extension now maintains a reading list locally. By clicking buttons in the popup window with the opened tab about a specific paper on Scirate, one can mark the paper as 'reading'/'read' or remove it from the reading list, in a Goodreads-like manner (hence 'Scited' corresponds to 'Want to read').

On Scirate, right next to the paper title in a search/personal scites/newest paper page, there will be a 'Read'/'Reading' tag for any on the reading list.

The reading list can be exported and saved locally as a txt file, or be synced with a reading list txt file.

<p style="display:flex; flex-direction:row;justify-content:space-between;gap:10px;align-items:center;">
<img src="/images/option.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/reading1.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/reading2.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/reading3.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/reading4.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/reading5.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/reading6.jpg" height="100px" style="margin:10px 0px; border:2px;">
</p>

### To use Scirate's default font or not to use (deprecated)
Scirate's ~~current~~ (20201005) font-family is : ("Sen", "Helvetica Neue", Helvetica, Arial, sans-serif). The first one is [added](https://github.com/scirate/scirate/commit/a6e666a7ffa8519e81adcea2464b3563198382d3) early this year as requested (by someone I didn't find out).

Some people don't really like this new font, while some others love it.

Now (Dec 2023) there is a new font family in use, but you can still set and save your preference by clicking the <kbd>Use/Disable default font</kbd> button in the popup or the **options** window. 

**Options** can be found either by right-clicking the extension icon or in Extension - SciRate Assistant 1.0 - Details - Extension Options).


### Scirate (almost) everywhere

#### ArXiv
Provide a SciRate link & scites directly on any accessed arXiv page about one specific paper/new submissions/recent submissions/searching results.

The number of scites is shown when the mouse is over *[SciRate]*.  

#### Google Scholar
Provide a SciRate link & scites for arXiv papers directly on searching results/author pages. 

The number of scites is shown when the mouse is over *[SciRate]*.  

#### Popup
Find the scites quickly by entering arXiv ID.

### Permissions & privacy

Permissions can be found in manifest.json. All functions run locally on your browser. User data will not be uploaded to any place.

### Preview
<p style="display:flex; flex-direction:row;justify-content:space-around;gap:10px;align-items:center;">
<img src="/images/popup.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/arxiv-search.jpg" width="300px" style="margin:10px 0px; border:2px;">
<img src="/images/arxiv-recent.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/arxiv-single-paper.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/scholar-search.jpg" height="100px" style="margin:10px 0px; border:2px;">
<img src="/images/scholar-profile.jpg" height="100px" style="margin:10px 0px; border:2px;">
</p>

## Never-to-do list
- improve the "searching arXiv ID" function
- show/hide abstracts
- adjust the loc of left/right sidebar
- allow font/font-size personalization
