function getOrdinalSuffix(number) {
    var suffixes = ["th", "st", "nd", "rd"];
    var value = number % 100; // Handle numbers like 11, 12, 13 specially
    var suffix =
        value >= 11 && value <= 13
        ? "th"
        : suffixes[(number % 10)] || "th";

    return `${number}${suffix}`;
}