// cities in yemen
let citiesList = [
  {
    arabicName: "حضرموت",
    engName: "Hadhramaut",
  },
  {
    arabicName: "عدن",
    engName: "Aden",
  },
  {
    arabicName: "صنعاء",
    engName: "Sana'a",
  },
  {
    arabicName: "صعده",
    engName: "Saada",
  },
  {
    arabicName: "تعز",
    engName: "Taiz",
  },
  {
    arabicName: "المهره",
    engName: "Al Mahrah",
  },
  {
    arabicName: "الجوفه",
    engName: "Al Jawf",
  },
  {
    arabicName: "حجه",
    engName: "Hajjah",
  },
  {
    arabicName: "المحويت",
    engName: "Al Mahwit",
  },
  {
    arabicName: "مأرب",
    engName: "Ma'rib",
  },
  {
    arabicName: "الحديده",
    engName: "Al Hudaydah",
  },
  {
    arabicName: "اب",
    engName: "Ibb",
  },
  {
    arabicName: "البيضاء",
    engName: "Al Bayda",
  },
  {
    arabicName: "شبوه",
    engName: "Shabwah",
  },
  {
    arabicName: "لحج",
    engName: "Lahij",
  },
  {
    arabicName: "ابين",
    engName: "Abyan",
  },
  {
    arabicName: "ذمار",
    engName: "Dhamar",
  },
  {
    arabicName: "ريمه",
    engName: "Raymah",
  },
  {
    arabicName: "سقطرى",
    engName: "Socotra",
  },
];

// fill the combo box with cities
let selectCity = document.getElementById("selectCity");
for (city of citiesList) {
  let option = `
    <option>${city.arabicName}</option>
    `;
  selectCity.innerHTML += option;
}

// make API request to get prayer time information when user select a city
selectCity.addEventListener("change", function () {
 
  let cityName = "";
  for (city of citiesList) {
    if (city.arabicName === this.value) {
      cityName = city.engName;
    }
  }
  getInfo(cityName);
});

// fn to fill ecah card with matching time 
function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time;
  }
//fn to send reuest using axios
function getInfo(cityName) {
  let queryParams = {
    country: "YE",
    city: cityName,
  };

  axios.get("http://api.aladhan.com/v1/timingsByCity", {
      params: queryParams,
    })
    .then(function (response) {

      // disply the city  in header based on combo box value
      document.getElementById("header").innerHTML = selectCity.value;

      // hold the object that store all prayer timimg in allPrayerTime variable
      let allPrayerTime = response.data.data.timings;

      // fill ecah card with matching time from API respone object
      fillTimeForPrayer("fajr-time", allPrayerTime.Fajr);
      fillTimeForPrayer("sunrise-time", allPrayerTime.Sunrise);
      fillTimeForPrayer("dhuhr-time", allPrayerTime.Dhuhr);
      fillTimeForPrayer("asr-time", allPrayerTime.Asr);
      fillTimeForPrayer("sunset-time", allPrayerTime.Sunset);
      fillTimeForPrayer("isha-time", allPrayerTime.Isha);
      
      // drive date from the response
      const normalDate = response.data.data.date.readable; // 16 Oct 2023
      const hijriDate = response.data.data.date.hijri.date; // 01-04-1445
      const weekDay = response.data.data.date.hijri.weekday.ar; // الاثنين

      document.getElementById("date").innerHTML = `${normalDate} | ${weekDay} ${hijriDate} `;
    })
    .catch(function (error) {
      alert(`sorry some error happen=> ${error}`);
    })
    .finally(function () {
        // always executed
        // alert("Create Job")
      });
}
// لجلب مواقيت الصلاه في حضرموت بشكل تلقائي عند تحميل الصفحه 
getInfo('Hadhramaut');