import { Validator } from 'patched-vee-validate';

const intervalPattern = /^(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{2})$/;

Validator.extend('number_between', {
  validate: (value, params) => {
    const numberRegex = /^\d+$/;
    const min = parseInt(params[0], 10);
    const max = parseInt(params[1], 10);
    const realValue = parseInt(value, 10);
    return numberRegex.test(value) && min <= realValue && max >= realValue;
  },
});





Validator.extend('max_string_length', {
  validate: (value, params) => {
    const max = parseInt(params[0], 10);
    return max >= value.length;
  },
});

Validator.extend('min_string_length', {
  validate: (value, params) => {
    const min = parseInt(params[0], 10);
    return min <= value.length;
  },
});

Validator.extend('number_range', {
  validate: (value, param) => {
    const numberRegex = /^\d+$/;
    const realValue = parseInt(value, 10);
    const min = parseInt(param[0], 10);
    const max = parseInt(param[1], 10);
    const fixedValue = parseInt(param[2], 10);
    if (numberRegex.test(param[0]) && numberRegex.test(param[1]) && numberRegex.test(param[2])) {
      return ((realValue >= min && realValue <= max) || (realValue === fixedValue));
    }
    return false;
  },
});

function checkDate(dateValue) { // mm/dd/yyyy
  const dateArray = dateValue.split('/');
  return ((parseInt(dateArray[0], 10) > 0) && (parseInt(dateArray[0], 10) < 13) &&
    (parseInt(dateArray[1], 10) > 0) && (parseInt(dateArray[1], 10) < 32));
}

Validator.extend('my_date', {
  validate: (intervalValue) => {
    if (intervalPattern.test(intervalValue)) {
      const intrvlArray = intervalValue.split(' ');
      return (checkDate(intrvlArray[0]));
    }
    return false;
  },
});

Validator.extend('my_time', {
  validate: (value) => {
    const timePattern = /^($|^(([01][0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9])$/;
    return timePattern.test(value);
  },
});



Validator.extend('my_hours', {
  validate: (value) => {
    const timePattern = /^($|^(([01][0-9])|(2[0-3])):[0-5][0-9])$/;
    return timePattern.test(value);
  },
});


Validator.extend('only_letters_numbers', {
    validate: (value) => {
      const regex = /^[A-Za-z0-9]+$/;
      return regex.test(value);
    },
  });
  
  Validator.extend('only_letters_numbers_space', {
    validate: (value) => {
      const regex = /^[A-Za-z0-9\s]+$/;
      return regex.test(value);
    },
  });
  
  Validator.extend('only_numbers', {
    validate: (value) => {
      const regex = /^[0-9]+$/;
      return regex.test(value);
    },
  });

  Validator.extend('string_or_number_between', {
    validate: (value, params) => {
      const numberRegex = /^\d+$/;
      const min = parseInt(params[1], 10);
      const max = parseInt(params[2], 10);
      const realValue = parseInt(value, 10);
      return (numberRegex.test(value) && min <= realValue && max >= realValue) || value === params[0];
    },
  });
