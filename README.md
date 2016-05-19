# jquery-mtabs
JQuery plugin that creates multitabs

##HTML Structure
The main div must include:
- div.tabs_navigation_panel - this div will display navigation tabs
- div.tabs_list - this div displays list of divs with content (div.tabs_content)

##Options
Every div with content must include this data attributes:
- id - unique tab id
- title - tab title which will be displayed inside tabs_navigation_panel

##Events
- select - event invoked after tab is changed, event will trigger function placed in data-onselect attribute
