export default {
    mergeRuleList(rules) {
      let veeRule = '';
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          veeRule = `${veeRule}|${rule}`;
        });
      }
      return veeRule;
    },
    mergeRules(...args) {
      let veeRule = '';
      if (args) {
        args.forEach((argument) => {
          if (argument) {
            if (argument instanceof Array) {
              veeRule = `${veeRule}|${this.mergeRuleList(argument)}`;
            } else {
              veeRule = `${veeRule}|${argument}`;
            }
          }
        });
      }
      return veeRule;
    },
  };