if (!!window.EventSource) {
  // const xcsrf = document.head.querySelector("[name~=csrf-token][content]").content;

  const dashSource = new EventSource('/live/dashboard', { withCredentials: true });
  const notiSource = new EventSource('/live/notification', { withCredentials: true });

  dashSource.onmessage = (e) => {
    // TODO: if year changes, send reload signal and update

    const data = JSON.parse(e.data);

    $('#d-baru').html(data.baru);
    $('#d-perhatian').html(data.perhatian);
    $('#d-tindakan').html(data.tindakan);
    $('#d-sedang').html(data.sedang);

    $('#d-hari').html(data.hari);
    $('#d-bulan').html(data.bulan);
    $('#d-minggu').html(data.minggu);
    $('#d-tahun').html(data.tahun);

    $('#d-selesai').html(data.selesai);
    $('#d-batal').html(data.batal);
    $('#d-tinggi-bulan').html(data.tinggiBulan);
    $('#d-tinggi-tahun').html(data.tinggiTahun);

    const peratus = data.kutipan / (data.target || 200) * 100;
    $('#d-kutipan-hari').html(data.kutipan);
    $('#d-peratus').val(parseInt(peratus, 10)).trigger('change');
  };

  dashSource.onmessage = (e) => {
    const data = JSON.parse(e.data);

    $('#d-notify').html(data.);
    $('#d-notify-list').prepend(`
      <a href="javascript:void(0);" class="dropdown-item notify-item active">
          <div class="notify-icon">
              <img src="assets/images/color/red.png" class="img-fluid rounded-circle" alt="" /> </div>
          <p class="notify-details">Ah Long</p>
          <p class="text-muted mb-0 user-msg">
              <small>Sakinah Binti Zali</small>
          </p>
      </a>`);
  };
}
