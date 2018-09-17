# Butter Slide Toggle

The slide toggle is one of the simplest and most common web problems but ends up being one of the more difficult solutions to implement well with respect to performance and behavior. This is an effort to make a tool as simple to use as jQuery's `slideToggle` method, but way more performant. Butter Slide Toggle leverages CSS transitions, Javascript, and some trickery to bypass the complications of trying to transition height or max height manually to get the slide toggle effect you're looking for.

## Installation

You can get Butter Slide Toggle with either npm or bower. You can also manually include the main `dist/js/butter-slide-toggle.js` file as a script tag your project if you like.

NPM

```bash
npm install butter-slide-toggle --save
```
Bower

```bash
bower install butter-slide-toggle --save
```
Manual

```html
<script src="path/to/js/dir/butter-slide-toggle.js"></script>
<link href="path/to/css/dir/butter-slide-toggle.css" rel="stylesheet" type="text/css">
```

### Prerequisites

Butter Slide Toggle is plain Javascript and has no dependencies.

### Getting Started

Once you've included Butter Slide Toggle in your project it is very simple to use. Behavior is a little different from jQuery's slide toggle in that you'll first need to initialize your toggle before you can use it. The simplest implementation in plain javascript looks something like the following.

```js
const contentSelection = document.querySelector('.toggle-content'),
  contentToggle = new ButterSlideToggle(contentSelection);

document.querySelector('.toggle-button').addEventListener('click', e => {
  e.preventDefault();
  contentToggle.toggle();
});
```
Once a Butter Slide Toggle is initialized, you can use the `toggle()` method to trigger the toggle. Simple!

### Butter Slide Toggle Responsibilities

Butter Slide Toggle aims to provide you with a tool that implements a toggle behavior with CSS transitions, and all the extras around that you might want to have access to. It does not aim to handle theming (outside of the base transition definitions), presentation, or implementation of the tool. That's up to you!

Butter Slide Toggle functionality has some conditional requirements, just like any slide toggle implementation would have.

1. **Consider Margins** - Placing margins on any element that collapses in one way or another will usually end up with jumping behavior when the element opens or closes. Butter Slide Toggle will not handle this, or any other theming considerations, for you.
2. **Implementation** - Butter Slide Toggle doesn't provide a default implementation, so you'll need to determine and implement that on your own. Though something like the above example is all you really need for a basic trigger implementation!
3. **Wrapper** - Butter Slide Toggle creates and extra `<div>` wrapper, which is necessary for the `max-height` transition. When theming, be aware that this is there, as you might need to occasionally take it into account.

## Parameters

### Element

Type: object (required)

The first parameter is the DOM element to initialize as a toggleable element. If you are using jQuery to select items, then you'll just need to get the native DOM element from the jQuery selection. For example:

```js
var $toggle = $('.toggle'),
    toggle = new ButterSlideToggle($toggle[0]);

toggle.toggle()
```

### Options

The second parameter is a settings object and is optional. The following settings can be defined.

#### transitionClass

Type: string

Default: `butter-slide-toggle-transition`

Set the transition class to use for this item's toggle transition. The default class has a default CSS definition. This is how you can implement many different types and lengths of transitions. Since the transition is being defined by CSS, that's where you'll go to change the length of the toggle transition.

## Methods

#### toggle

Initiates the toggle transition on an initialized element. This will always change the state of the item from it's current. Open to closed, or closed to open.

#### isCollapsed

A helper method that returns a boolean to determine if an item is collapsed or not.

## Events

All events are triggered from the element that is passed on the initialization of a toggle.

#### butterToggle.opened

Triggered after the open transition is complete.

#### butterToggle.closed

Triggered after the close transition is complete.

#### butterToggle.openStart

Triggered immediately before the open transition begins.

#### butterToggle.closeStart

Triggered immediately before the close transition begins.

## Development Build

Butter Slide Toggle uses Webpack to compile a development build and compiles script and css assets to the `dist` folder. The project is set up with Browser Sync to view the demo locally. You can view the demo locally by cloning the repo and running the following.

```bash
npm install
npm run dev
```

## Authors

* **Tanner Langley** ([github](https://github.com/tandroid1))
* **Anthony Simone** ([github](https://github.com/anthonysimone))

## License

This project is free and open source under the ISC License.

## Acknowledgments

The original inspiration came from a Stack Overflow post from years ago which unfortunately couldn't be found again.