Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'layout',
});

Router.route('/', {
  yieldTemplates: {
    'about': {to: 'content'},
  }
});

Router.route('leaderboard', {
  yieldTemplates: {
    'leaderboard': {to: 'content'},
  }
});

Router.route('submit', {
  yieldTemplates: {
    'submit': {to: 'content'},
  }
});
