import Travel from './models/travel';

export default function () {
  Travel.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const travel1 = new Travel(
      {
        cuid: 'cikqgkv4q01ck745qwec3hd',
        author: '5bae3d317b8d9275f4ebf7bb',
        from: 'Medellin',
        to: 'Bogota',
        date: '2018-09-25 17:00:00.000',
        plate: 'XLN034',
        price: '12000',
        content: 'Sin mascotas',
        traveltype: 'nacional',
      });
    const travel2 = new Travel(
      {
        cuid: 'cikqgkv4q01fv7453ualdn3hd',
        author: '5bae3d317b8d9275f4ebf7bb',
        from: 'Popayan',
        to: 'Pasto',
        date: '2018-09-27 09:00:00.000',
        plate: 'BHN854',
        price: '9000',
        content: '',
        traveltype: 'nacional',
      });
    const travel3 = new Travel(
      {
        cuid: 'cikxcvc899vflkl9053udn3hd',
        author: '5bae3d317b8d9275f4ebf7ba',
        from: 'Bogota',
        to: 'Medellin',
        date: '2018-10-01 01:00:00.000',
        plate: 'KLG264',
        price: '30000',
        content: '',
        traveltype: 'nacional',
      });
    const travel4 = new Travel(
      {
        cuid: 'cikdfgv98iqweqeqw89aldn3hd',
        author: '5bae3d317b8d9275f4ebf7bb',
        from: 'Cali',
        to: 'Monteria',
        date: '2018-10-01 01:00:00.000',
        plate: 'CDR465',
        price: '25000',
        content: '',
        traveltype: 'nacional',
      });
    const travel5 = new Travel(
      {
        cuid: 'cikdfgv98iqwhuc1i89aldn3hd',
        author: '5bae3d317b8d9275f4ebf7ba',
        from: 'Manizales',
        to: 'Medellin',
        date: '2018-09-30 13:00:00.000',
        plate: 'CDR465',
        price: '22000',
        content: '',
        traveltype: 'nacional',
      });
    const travel6 = new Travel(
      {
        cuid: 'cikdfgv98iqw8gq5d89aldn3hd',
        author: '5bae3d317b8d9275f4ebf7bb',
        from: 'Robledo',
        to: 'La villa',
        date: '2018-09-27 20:00:00.000',
        plate: 'VMG497',
        price: '10000',
        content: 'paso por la 80',
        traveltype: 'local',
      });
    const travel7 = new Travel(
      {
        cuid: 'cikd1l798iqw8gq5d89al3cvhd',
        author: '5bae3d317b8d9275f4ebf7bb',
        from: 'Laureles',
        to: 'parque de envigado',
        date: '2018-09-29 7:30:00.000',
        plate: 'MLK142',
        price: '20000',
        content: 'Arranco muy puntual',
        traveltype: 'local',
      });
    const travel8 = new Travel(
      {
        cuid: 'ccfd1l798iqw8gq5d89al3cvhd',
        author: '5bae3d317b8d9275f4ebf7bb',
        from: 'La floresta',
        to: 'El poblado',
        date: '2018-09-30 15:20:00.000',
        plate: 'LER421',
        price: '8000',
        content: '',
        traveltype: 'local',
      });
    const travel9 = new Travel(
      {
        cuid: 'ccfd1l798iqwm41fd89al3cvhd',
        author: '5bae3d317b8d9275f4ebf7ba',
        from: 'Santa monica',
        to: 'San javier',
        date: '2018-09-28 19:20:00.000',
        plate: 'MNM456',
        price: '3000',
        content: '',
        traveltype: 'local',
      });
    const travel10 = new Travel(
      {
        cuid: 'ccfd1l798iqnd11fd89al3cvhd',
        author: '5bae3d317b8d9275f4ebf7ba',
        from: 'San antonio',
        to: 'Itagui',
        date: '2018-09-29 12:20:00.000',
        plate: 'vbf123',
        price: '8000',
        content: '',
        traveltype: 'local',
      });
    Travel.create([travel1, travel2, travel3, travel4, travel5, travel6, travel7, travel8, travel9, travel10], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
