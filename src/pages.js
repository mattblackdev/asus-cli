export const login = {
  url: "http://router.asus.com/Main_Login.asp",
  username: "#login_username",
  password: "input[name=login_passwd]",
  submit: "input[type=submit]",
  un: process.env.ASUS_USERNAME,
  pw: process.env.ASUS_PASSWORD,
};

export const wireless = {
  url: "http://router.asus.com/Advanced_WAdvanced_Content.asp",
  band: "#wl_unit_field > td > select",
  band_24g: "0",
  band_5g: "1",
  enable: "#wl_rf_enable > td > input:nth-child(1)",
  disable: "#wl_rf_enable > td > input:nth-child(2)",
  apply: "#apply_btn > input",
};
