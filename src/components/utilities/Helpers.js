export const getDate = (date) => {
    let dateObj = new Date(date);
    // date: dateObj.toDateString(),
    // time: formatAMPM(dateObj)
    // console.log(dateObj)
    return `${dateObj.toDateString()} at ${formatAMPM(dateObj)}`
    // return `${dateObj.toLocaleDateString()} at ${formatAMPM(dateObj)}`
}

export function formatAMPM(date) {

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


export const todayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm;} 
        
    let date = yyyy + '-' + mm + '-' + dd;
    return date
}

export const dateAfterTwoWeeks = () => {
    let twoWeeks = 1000 * 60 * 60 * 24 * 13;
    let twoWeeksTime = new Date(new Date().getTime() + twoWeeks);
    let d = twoWeeksTime.getDate();
    let m = twoWeeksTime.getMonth() + 1;
    let y = twoWeeksTime.getFullYear();
    if (d < 10) { d = '0' + d; }
    if (m < 10) { m = '0' + m;}
    let formattedDate = y + '-' + m + '-' + d ;

   return formattedDate
}

export const limiTitle = (title, limit =15) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split('').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0);

        //return the result
        return `${newTitle.join('')}...`;
    }

    return title;
}


export const getDateAfterTwoWeeks = () => {
    let twoWeeks = 1000 * 60 * 60 * 24 * 13;
    let twoWeeksTime = new Date(new Date().getTime() + twoWeeks).toISOString();

   return twoWeeksTime
}

export const loggingOut = () => {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-data')
    localStorage.removeItem('isLoggedIn')
}
/*
const languageList = [
    'Chinese', 'English', 'Spanish', 'Arabic', 'French', 'Persian', 'German', 'Russian', 'Malay', 'Portuguese', 'Italian', 'Turkish', 'Korean', 'Hindi', 'Japanese', 'Vietnamese',
]
const countryList = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua & Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bonaire',
    'Bosnia & Herzegovina',
    'Botswana',
    'Brazil',
    'British Indian Ocean Ter',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Canary Islands',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic','Chad',
    'Channel Islands',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos Island',
    'Colombia',
    'Comoros',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote DIvoire',
    'Croatia','Cuba',
    'Curacao',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands','Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Ter',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Great Britain',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe','Guam',
    'Guatemala',
    'Guinea',
    'Guyana',
    'Haiti',
    'Hawaii',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'Indonesia',
    'India',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea North',
    'Korea South',
    'Kuwait',
    'Kyrgyzstan','Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malaysia',
    'Malawi',
    'Maldives','Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Midway Islands',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Nambia',
    'Nauru',
    'Nepal',
    'Netherland Antilles',
    'Netherlands (Holland, Europe)',
    'Nevis',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria','Niue',
    'Norfolk Island',
    'Norway','Oman',
    'Pakistan',
    'Palau Island',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay','Peru',
    'Philippines',
    'Pitcairn Island',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of Montenegro',
    'Republic of Serbia',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'St Barthelemy',
    'St Eustatius',
    'St Helena',
    'St Kitts-Nevis',
    'St Lucia',
    'St Maarten',
    'St Pierre & Miquelon',
    'St Vincent & Grenadines',
    'Saipan',
    'Samoa',
    'Samoa American',
    'San Marino',
    'Sao Tome & Principe',
    'Saudi Arabia',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tahiti',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad & Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks & Caicos Is',
    'Tuvalu',
    'Uganda',
    'United Kingdom',
    'Ukraine',
    'United Arab Emirates',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City State',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (Brit)',
    'Virgin Islands (USA)',
    'Wake Island',
    'Wallis & Futana Is',
    'Yemen',
    'Zaire',
    'Zambia',
    'Zimbabwe',
]*/