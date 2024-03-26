/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'create a new ui component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Provide a name for you component',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
    ],
  });

  plop.setGenerator('context', {
    description: 'create a new context',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Provide a name for you context',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/contexts/{{pascalCase name}}Context.tsx',
        templateFile: 'plop-templates/Context.tsx.hbs',
      },
    ],
  });

  plop.setGenerator('page', {
    description: 'create a new page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Provide a name for you page',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}Page.tsx',
        templateFile: 'plop-templates/Page.tsx.hbs',
      },
    ],
  });
};
