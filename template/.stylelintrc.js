module.exports = {
 "extends": "stylelint-config-standard",
 "rules": {
   "indentation": 2,
   "max-nesting-depth": 3,
   "at-rule-no-unknown": [ true, {
     "ignoreAtRules": [
       "extends",
       "extend",
       "ignores",
       "mixin",
       "include",
       "content",
       "if",
       "else"
     ]
   }],
 }
}
