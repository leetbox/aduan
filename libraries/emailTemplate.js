const Mailgen = require('mailgen');
const { HTTPS_DOMAIN, PORT_SECURE } = require('../settings/express');

exports.register = (name, password, phone) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'E-Aduan',
      link: `${HTTPS_DOMAIN}:${PORT_SECURE}/borang`,
      copyright: 'Copyright © 2019 https://www.linkedin.com/in/leetcat69/. All rights reserved.',
      //logo: 'https://mailgen.js/img/logo.png'
    }
  });

  const email = {
      body: {
          greeting: 'Selamat Bertugas',
          signature: 'Sekian',
          name,
          intro: [
            'Pihak kami telah mendaftar akaun E-Aduan anda.',
            'Sila masuk ke dalam sistem dengan menggunakan email dan kata laluan sementara.',
            'Sila tukar kata laluan sebaik sahaja anda mendapatkan akses ke laman web E-Aduan.',
            `Kata laluan sementara anda ialah : ${password}`,
          ],
          outro: `Perlu bantuan? Sila hantar soalan anda kepada email ini atau telefon ${phone}. Kami bersedia membantu.`,
      }
  };

  const emailBody = mailGenerator.generate(email);

  const emailText = mailGenerator.generatePlaintext(email);

  return ({
    html: emailBody,
    text: emailText,
  });
}

exports.resetPassword = (name, password, phone) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'E-Aduan',
      link: `${HTTPS_DOMAIN}:${PORT_SECURE}/borang`,
      copyright: 'Copyright © 2019 https://www.linkedin.com/in/leetcat69/. All rights reserved.',
      //logo: 'https://mailgen.js/img/logo.png'
    }
  });

  const email = {
      body: {
          greeting: 'Hai',
          signature: 'Sekian',
          name,
          intro: [
            'Pihak kami telah menjana semula kata laluan sementara bagi akaun anda.',
            'Sila tukar kata laluan sebaik sahaja anda mendapatkan akses ke laman web E-Aduan.',
            `Kata laluan baru anda ialah : ${password}`,
          ],
          outro: `Perlu bantuan? Sila hantar soalan anda kepada email ini atau telefon ${phone}. Kami bersedia membantu.`,
      }
  };

  const emailBody = mailGenerator.generate(email);

  const emailText = mailGenerator.generatePlaintext(email);

  return ({
    html: emailBody,
    text: emailText,
  });
}

exports.prePayment = (name, phone) => {
  const mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
      name: 'E-Aduan',
      link: `${HTTPS_DOMAIN}:${PORT_SECURE}/borang`,
      copyright: 'Copyright © 2019 https://www.linkedin.com/in/leetcat69/. All rights reserved.',
      //logo: 'https://mailgen.js/img/logo.png'
    }
  });

  const email = {
      body: {
          greeting: 'Hi',
          signature: 'Sekian',
          name,
          intro: [
            'Terima kasih kerana menggunakan sistem E-Aduan.',
            'Aduan anda sudah diterima dan kami sedang menanti status pembayaran anda.',
            'Kami akan mula proses aduan anda apabila pembayaran anda berjaya.',
            'Sila nantikan email seterusnya daripada pihak kami.'
          ],
          outro: `Perlu bantuan? Sila hantar soalan anda kepada email ini atau telefon ${phone}. Kami bersedia membantu.`,
      }
  };

  const emailBody = mailGenerator.generate(email);

  const emailText = mailGenerator.generatePlaintext(email);

  return ({
    html: emailBody,
    text: emailText,
  });
}

exports.successPayment = (name, phone) => {
  const mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
      name: 'E-Aduan',
      link: `${HTTPS_DOMAIN}:${PORT_SECURE}/borang`,
      copyright: 'Copyright © 2019 https://www.linkedin.com/in/leetcat69/. All rights reserved.',
      //logo: 'https://mailgen.js/img/logo.png'
    }
  });

  const email = {
      body: {
          greeting: 'Hi',
          signature: 'Sekian',
          name,
          intro: [
            'Terima kasih kerana menggunakan sistem E-Aduan',
            'Pembayaran anda telah berjaya dan pihak kami sedang membuat penelitian terhadap aduan anda.',
            'Kami akan menghubungi anda dalam kadar masa terdekat.',
            'Kami berharap anda dapat bersabar dalam tempoh tersebut.',
          ],
          outro: `Perlu bantuan? Sila hantar soalan anda kepada email ini atau telefon ${phone}. Kami bersedia membantu.`,
      }
  };

  const emailBody = mailGenerator.generate(email);

  const emailText = mailGenerator.generatePlaintext(email);

  return ({
    html: emailBody,
    text: emailText,
  });
}

exports.failedPayment = (name, phone) => {
  const mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
      name: 'E-Aduan',
      link: `${HTTPS_DOMAIN}:${PORT_SECURE}/borang`,
      copyright: 'Copyright © 2019 https://www.linkedin.com/in/leetcat69/. All rights reserved.',
      //logo: 'https://mailgen.js/img/logo.png'
    }
  });

  const email = {
      body: {
          greeting: 'Hi',
          signature: 'Sekian',
          name,
          intro: [
            'Terima kasih kerana menggunakan sistem E-Aduan.',
            'Kami memohon maaf, aduan anda tidak berjaya diproses oleh sistem.',
            `Sekiranya pembayaran telah berjaya dibuat dan wang anda telah masuk ke akaun kami, sila hubungi kami.`,
            'Kami memohon maaf bagi kesulitan yang anda hadapi.',
          ],
          outro: `Perlu bantuan? Sila hantar soalan anda kepada email ini atau telefon ${phone}. Kami bersedia membantu.`,
      }
  };

  const emailBody = mailGenerator.generate(email);

  const emailText = mailGenerator.generatePlaintext(email);

  return ({
    html: emailBody,
    text: emailText,
  });
}
