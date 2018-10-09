import User from './models/user';

export default function () {
  User.count().exec((err, count) => {
    if (count > 3) {
      return;
    }
    const user1 = new User(
      {
        name: 'Andres Saldarriaga Gaviria',
        email: 'jandreus87@hotmail.com',
        ratevalue: '0',
        ratecount: '0',
        likes: [],
        dateCreated: '2018-09-25 16:53:25.879',
        avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
        city: 'Medellin',
        cellphone: '3015999375',
        credit: '200',
      });
    const user2 = new User(
      {
        name: 'Cindy Sierra',
        email: 'cindanys@gmail.com',
        ratevalue: 'Medellin',
        ratecount: 'Bogota',
        likes: [],
        dateCreated: '2018-09-25 16:53:25.879',
        avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
        city: '12000',
        cellphone: '3025212385',
        credit: '200',
      });

    User.create([user1, user2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
