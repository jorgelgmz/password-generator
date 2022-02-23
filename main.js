import inquirer from 'inquirer';

(async () => {
  const questions = await inquirer.prompt([
    {
      name: 'characters',
      message: 'Which characters would you like to include? 🛠️\n',
      type: 'checkbox',
      choices: [
        {
          name: 'Letters',
        },
        {
          name: 'Numbers',
        },
        {
          name: 'Special Characters',
        },
      ],
      validate(questions) {
        if (questions.length < 1) {
          return 'You must choose at least one option.';
        } else {
          return true;
        }
      },
    },
    {
      name: 'length',
      message: 'Enter the length (must be greater than 16) #️⃣\n',
      type: 'input',
      validate: (questions) => {
        if (!/[0-9]{1,5}/.test(questions)) {
          return 'Please enter a number.';
        } else if (parseInt(questions) < 16) {
          return 'Please enter a number greater than 16.';
        } else {
          return true;
        }
      },
    },
  ]);
  password(questions.characters.toString(), parseInt(questions.length));
})();

const password = (characters, length) => {
  const letters = characters.includes('Letters');
  const numbers = characters.includes('Numbers');
  const special = characters.includes('Special Characters');
  const lower = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',');
  const upper = lower.join(',').toUpperCase().split(',');
  const alpha = [...lower, ...upper];
  const num = '0123456789'.split('');
  const spec = '~!@#$%^&*()_+-=[]{}|;:"\'`,./<>?'.split('');
  let arr = [];
  let pass = '';
  if (letters) arr.push(...alpha);
  if (numbers) arr.push(...num);
  if (special) arr.push(...spec);
  const generator = () => {
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * arr.length);
      pass += arr[random];
    }
  };
  while ((letters && !/[a-z]/gi.test(pass)) || (numbers && !/[0-9]/g.test(pass)) || (special && !/[\W]/g.test(pass))) {
    pass = '';
    generator();
  }
  console.log(`Your password is 🔐\n\n${pass}\n`);
};
