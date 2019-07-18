if (!!window.EventSource) {
  // const xcsrf = document.head.querySelector("[name~=csrf-token][content]").content;

  const source = new EventSource('/live/dashboard', { withCredentials: true });

  source.onmessage = (e) => {
    console.log(e.data);
  };
}
