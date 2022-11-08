export const timeOptions = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    .map(startNum => {
        let startNumStr = `${startNum}`.length === 1 ? `0${startNum}` : `${startNum}`;
        let endNumStr = `${startNum + 1}`.length === 1 ? `0${startNum + 1}` : `${startNum + 1}`;
        return {
            label: `${startNumStr}:00~${endNumStr}:00`,
            value: startNum,
        };
    });

export const fieldOptions = [
    "东丽场地-1", "东丽场地-2", "东丽场地-3", "东丽场地-4", "东丽场地-5", "东丽场地-6", "东丽场地-7",
    "宁河场地-01", "宁河场地-02", "宁河场地-03", "宁河场地-04", "宁河场地-05", "宁河场地-06",
    "宁河场地-07", "宁河场地-08", "宁河场地-09", "宁河场地-10", "宁河场地-11", "宁河场地-12",
].map(field => {
    return {
        label: field.replace("场地", ""),
        value: field,
    };
});
