const fetchContest = (cId) => {
    axios
      .get(`/api/contests/${cId}`)
      .then(function (response) {
        setContest(response.data);
      })
      .catch(function (error) {
        console.log("Fetch Contests Data Failed!");
        console.log(error);
      });
  };


  