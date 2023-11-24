interface Entry {
  profilePicture: string;
  title: string,
  body: string,
  imgUrl: string,
}

const data: Entry[] = [
    {
      profilePicture: require("../../../assets/Ellipse38.jpg"),
      title: "Tanmay Bhat",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
    },
    {
      profilePicture: require("../../../assets/Ellipse38.jpg"),
      title: "Tanmay Bhat",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
    },
    {
      profilePicture: require("../../../assets/Ellipse38.jpg"),
      title: "Tanmay Bhat",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
    },
  ];
  
  export default data;