const useDate = (date: Date) => {
    const options: any = {
        year: "numeric", month: "long",
        day: "numeric", hour: "2-digit",
        minute: "2-digit"
    };

    return new Date(date).toLocaleDateString(undefined, options);
};

export default useDate;