const endpoints = [
  {
    path: '/api/users/getAll', //change to all
    method: 'GET',
    table: 'users',
    fields: '',
    handler: 'getUserData', // Назва функції-обробника
    params: ['param1', 'param2'], // Параметри, що передаються в обробник
  },
  {
    path: '/api/users/get',
    method: 'GET',
    table: 'users',
    fields: '',
    handler: 'getUserData', // Назва функції-обробника
    params: ['param1', 'param2'], // Параметри, що передаються в обробник
  },
  {
    path: '/api/users-create/post',
    method: 'POST',
    table: 'users',
    fields: '',
    handler: 'createUser',
    params: ['username', 'password', 'email'], // Параметри, що передаються в обробник
  },
  {
    path: '/api/games/get',
    method: 'GET',
    table: 'games',
    fields: '',
    handler: 'getGames',
    params: ['gamesId'], // Параметри, що передаються в обробник
  },
  {
    path: '/api/active-users/get',
    method: 'GET',
    table: 'users',
    fields: '',
    handler: 'getActiveUsers',
    params: ['startTime', 'endTime'], // Параметри, що передаються в обробник
  },
];

module.exports = endpoints;
