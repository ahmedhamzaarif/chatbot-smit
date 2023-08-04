import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://open-weather13.p.rapidapi.com/city/landon',
  headers: {
    'X-RapidAPI-Key': '8324a85f5amshf5973a2eabedc96p1743efjsne3a3803f09e4',
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}