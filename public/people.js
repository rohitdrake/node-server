let people = [{
  name: 'Rohit',
  age:  22
              },
              {
  name: 'Lucky',
  age: 21.5
              }];

let template = "<h1>{{name}} is {{age}} year old.</h1>";

module.exports = {
  people,
  template
}
