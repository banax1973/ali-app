
//get the short name to be shown at the top of screen
export const GetShortName = (fullName:string): string => { 
  if (fullName!==null && fullName!==undefined && fullName.indexOf(' ')>0)
    return fullName.substring(0, fullName.indexOf(' ')); //extract substring up to the first whitespace
  else
    return fullName
}

// Function Date parser
const  dateObj = (d) : Date => { 
    var parts = d.split(/:|\s/),
        date  = new Date();
    //if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
    date.setHours(+parts.shift());
    date.setMinutes(+parts.shift());
    return date;
}
