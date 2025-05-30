export const formatDate = (date : Date | null) =>{

    // converts the date to "YYYY-MM-DD" format 

    if (date) {
        const day = String(date.getDate()).padStart(2, '0'); // ensure two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // ensure two digits
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;  //format as "YYYY-MM-DD"
    }
}

