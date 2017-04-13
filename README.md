Lunch-r

Get a group of folks to actually pick a place to eat.


original fetch
`
fetch('/api')
  .then(response => {
    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }
    return response.json();
  })
  .then(json => {
    this.setState({
      message: json.message,
      fetching: false
    });
  }).catch(e => {
    this.setState({
      message: `API call failed: ${e}`,
      fetching: false
    });
  })
`