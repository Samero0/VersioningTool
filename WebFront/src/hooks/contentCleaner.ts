export const cleanContent = (content: string): string => {
    // delete the literals "\t,\s,\n" , "\t\t..." , " \t ", " /t,/s,/n " 
    const noLiterals = content.replace(/(\\[tsn]){2,}|\\[tsn](?=\S)|\\[tsn]|\/[tsn] /g, '');

    // delete unnecessary spaces, tabs, and enters
    const clearContent = noLiterals.replace(/\s{2,}|\\[tsn] /g , ' ').replace(/[\r\n\t]+/g, ' ');

    return clearContent;
};
