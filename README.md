# js-pattern-matching
In waiting Pattern Matching proposal adoption

https://github.com/tc39/proposal-pattern-matching#motivating-examples

# Install
```
npm install @tpoisseau/pattern-matching
npm install 'https://github.com/tpoisseau/js-pattern-matching#1.0.5'
```

# Getting Starting
```js
import pattern from '@tpoisseau/pattern-matching'
import {objectStrictLike} from '@tpoisseau/pattern-matching/comparators'

function todoApp(state=initialState, action) {
    return pattern(action)
     .match({type: 'set-visibility-filter'}, ({filter: visFilter}) => ({...state, visFilter}))
     .match(objectStrictLike({type: 'add-todo'}), ({text}) => ({...state, todos: [...state.todos, {text}]})
     .match({type: 'toggle-todo'}, ({index}) => ({
         ...state,
         todos: state.todos.map(({...item, done}, idx) => ({...item, done: idx === index ? !done : done}),
     })
     .default(state)();
}
```

# API Doc
- https://tpoisseau.github.io/js-pattern-matching/
