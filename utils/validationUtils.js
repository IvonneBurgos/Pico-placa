const {Interval, DateTime} = require('luxon');
const provinceCodes = Object.freeze({
  AZUAY: "A",
  BOLIVAR: "B",
  CANAR: "U",
  CARCHI: "C",
  CHIMBORAZO: "H",
  COTOPAXI: "X",
  ELORO: "O",
  ESMERALDAS: "E",
  GALAPAGOS: "W",
  GUAYAS: "G",
  IMBABURA: "I",
  LOJA: "L",
  LOSRIOS: "R",
  MANABI: "M",
  MORONA: "V",
  NAPO: "N",
  ORELLANA: "Q",
  PASTAZA: "S",
  PICHINCHA: "P",
  SANTAELENA: "Y",
  SANTO_DOMINGO: "J",
  SUCUMBIOS: "K",
  TUNGURAHUA: "T",
  ZAMORA: "Z",
});

const types = Object.freeze({
  COMERCIAL_1: "A",
  COMERCIAL_2: "U",
  COMERCIAL_3: "Z",
  CENTRAL: "E",
  OFICIAL: "X",
});

const restrictedDays = Object.freeze([[],[1,2],[3,4],[5,6],[7,8],[9,0],[]]);

exports.checkFormat = (plate) => {
  const regex = /^[A-Z]{3}[0-9]{3,4}$/i;
  return (validation = regex.test(plate));
};
exports.checkProvince = (char) => {
  return Object.values(provinceCodes).includes(char);
};
exports.checkType = (char) => {
  return Object.values(types).includes(char);
};

exports.checkDate = (dateInput, lastDigit) =>{
  const rawDate = DateTime.fromJSDate(new Date(dateInput));
  const dayofWeek = rawDate.weekday;
  const morningStart = DateTime.local(rawDate.year,rawDate.month,rawDate.day,7,0,0);
  const morningEnd = DateTime.local(rawDate.year,rawDate.month,rawDate.day,9,30,0);
  const afternoonStart = DateTime.local(rawDate.year,rawDate.month,rawDate.day,16,0,0);
  const afternoonEnd = DateTime.local(rawDate.year,rawDate.month,rawDate.day,19,30,0);
  
  let morningInterval = Interval.fromDateTimes(morningStart, morningEnd);
  let afternoonInterval = Interval.fromDateTimes(afternoonStart,afternoonEnd);
    if(restrictedDays[dayofWeek].includes(lastDigit)){
      if(morningInterval.contains(rawDate) || afternoonInterval.contains(rawDate)){
        return false;
      }
    }
    return true;
}
